import { useState } from 'react';
import Section from '@/components/Section';

export default function Contact() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      setLoading(true);
      setStatus(null);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus({ ok: true, message: 'Message sent. We will get back to you shortly.' });
      e.currentTarget.reset();
    } catch (err) {
      setStatus({ ok: false, message: 'Something went wrong. Please try again later.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Section title="Contact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4 text-black/90">
            <p><strong>M:</strong> +971 567449815</p>
            <p><strong>E:</strong> <a className="text-black underline" href="mailto:sujata.duge@bizprolex.com">sujata.duge@bizprolex.com</a></p>
            <p><strong>Web:</strong> <a className="text-black underline" href="https://bizprolex.com" target="_blank" rel="noreferrer">https://bizprolex.com</a></p>
            <p><strong>LinkedIn:</strong> <a className="text-black underline" href="https://www.linkedin.com/in/sujataduge/" target="_blank" rel="noreferrer">linkedin.com/in/sujataduge</a></p>
          </div>

          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
            {/* Honeypot */}
            <input type="text" name="company" className="hidden" tabIndex="-1" autoComplete="off" aria-hidden="true" />
            <div>
              <label className="block text-sm font-medium text-black mb-1">Name</label>
              <input name="name" required className="w-full rounded-md border border-black/20 bg-white px-3 py-2 focus-visible:ring-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Email</label>
              <input type="email" name="email" required className="w-full rounded-md border border-black/20 bg-white px-3 py-2 focus-visible:ring-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Message</label>
              <textarea name="message" rows="5" required className="w-full rounded-md border border-black/20 bg-white px-3 py-2 focus-visible:ring-black" />
            </div>
            <div className="flex items-center gap-3">
              <button disabled={loading} className="rounded-md bg-black px-5 py-2.5 text-white hover:bg-black/90 disabled:opacity-60">
                {loading ? 'Sending…' : 'Send Message'}
              </button>
              {status && (
                <p className={`text-sm ${status.ok ? 'text-green-700' : 'text-red-700'}`}>{status.message}</p>
              )}
            </div>
          </form>
        </div>
      </Section>
    </>
  );
}
