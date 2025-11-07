// Production-grade contact endpoint with validation, honeypot, and provider fallback

const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10); // 1 min
const MAX_REQ = parseInt(process.env.RATE_LIMIT_MAX || '8', 10); // 8 requests/min/IP
const buckets = new Map(); // ip -> { count, windowStart }

function clientIP(req) {
  const xf = req.headers['x-forwarded-for'];
  if (typeof xf === 'string' && xf.length) return xf.split(',')[0].trim();
  const xr = req.headers['x-real-ip'];
  if (typeof xr === 'string' && xr.length) return xr.trim();
  return req.socket?.remoteAddress || '0.0.0.0';
}

function hitRateLimit(ip) {
  const now = Date.now();
  const item = buckets.get(ip) || { count: 0, windowStart: now };
  if (now - item.windowStart > WINDOW_MS) {
    item.count = 0;
    item.windowStart = now;
  }
  item.count += 1;
  buckets.set(ip, item);
  return item.count > MAX_REQ;
}

function isEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s || ''));
}

function sanitizeText(s, { trim = true, max = 5000 } = {}) {
  let v = typeof s === 'string' ? s : '';
  if (trim) v = v.trim();
  if (v.length > max) v = v.slice(0, max);
  return v;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendWithResend({ from, to, subject, text, html }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: 'RESEND_API_KEY not set' };
  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, text, html }),
  });
  if (!resp.ok) {
    const t = await resp.text().catch(() => '');
    return { ok: false, error: `Resend ${resp.status}: ${t}` };
  }
  return { ok: true };
}

async function sendWithSendGrid({ from, to, subject, text, html }) {
  const key = process.env.SENDGRID_API_KEY;
  if (!key) return { ok: false, error: 'SENDGRID_API_KEY not set' };
  const payload = {
    personalizations: [{ to: to.map((e) => ({ email: e })) }],
    from: { email: from },
    subject,
    content: [
      { type: 'text/plain', value: text },
      { type: 'text/html', value: html },
    ],
  };
  const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const t = await resp.text().catch(() => '');
    return { ok: false, error: `SendGrid ${resp.status}: ${t}` };
  }
  return { ok: true };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Optional origin allow-list to prevent cross-site abuse
  if (process.env.ALLOWED_ORIGIN && req.headers.origin && req.headers.origin !== process.env.ALLOWED_ORIGIN) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const ip = clientIP(req);
  if (hitRateLimit(ip)) return res.status(429).json({ error: 'Too many requests' });

  const { name, email, message, company } = req.body || {};

  // Honeypot — if filled, silently accept to avoid probing
  if (company && String(company).trim()) return res.status(200).json({ ok: true });

  const clean = {
    name: sanitizeText(name, { max: 100 }),
    email: sanitizeText(email, { max: 254 }),
    message: sanitizeText(message, { max: 5000 }),
  };

  const errors = [];
  if (!clean.name || clean.name.length < 2) errors.push('Invalid name');
  if (!isEmail(clean.email)) errors.push('Invalid email');
  if (!clean.message || clean.message.length < 5) errors.push('Invalid message');
  if (errors.length) return res.status(400).json({ error: 'Validation failed', details: errors });

  const toRaw = process.env.CONTACT_TO_EMAIL || 'sujata.duge@bizprolex.com,kerem@bizprolex.com';
  const to = toRaw.split(',').map((s) => s.trim()).filter(Boolean);
  const from = process.env.CONTACT_FROM_EMAIL || (process.env.RESEND_API_KEY ? 'onboarding@resend.dev' : 'no-reply@bizprolex.com');
  if (!to.length) return res.status(503).json({ error: 'Contact email not configured' });

  const subject = `New contact from ${clean.name}`;
  const text = `Name: ${clean.name}\nEmail: ${clean.email}\nIP: ${ip}\n\nMessage:\n${clean.message}`;
  const html = `
    <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 8px 0;font-size:18px">New contact</h2>
      <p><strong>Name:</strong> ${escapeHtml(clean.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(clean.email)}</p>
      <p><strong>IP:</strong> ${escapeHtml(ip)}</p>
      <div style="margin-top:12px;white-space:pre-wrap"><strong>Message:</strong><br/>${escapeHtml(clean.message)}</div>
    </div>
  `;

  // Try Resend, then SendGrid
  let result = await sendWithResend({ from, to, subject, text, html });
  if (!result.ok) result = await sendWithSendGrid({ from, to, subject, text, html });

  if (!result.ok) {
    // eslint-disable-next-line no-console
    console.error('Contact send failed:', result.error);
    return res.status(502).json({ error: 'Failed to send message' });
  }
  return res.status(200).json({ ok: true });
}
