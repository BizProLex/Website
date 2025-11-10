// Simple static file server for local preview
// Usage: DIR=docs PORT=8000 node scripts/serve.js

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const rootDir = path.resolve(process.env.DIR || 'docs');
const port = Number(process.env.PORT || 8000);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.txt': 'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url || '/');
  let pathname = decodeURIComponent(parsed.pathname || '/');

  // Prevent path traversal
  if (pathname.includes('..')) {
    res.writeHead(400);
    return res.end('Bad request');
  }

  // Map directory requests to index.html
  let filePath = path.join(rootDir, pathname);
  try {
    const stat = fs.existsSync(filePath) && fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (!pathname.endsWith('/')) {
        res.writeHead(301, { Location: pathname + '/' });
        return res.end();
      }
      filePath = path.join(filePath, 'index.html');
    }
  } catch (_) {}

  // Default to index.html at root
  if (!path.extname(filePath)) {
    filePath = path.join(rootDir, 'index.html');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not Found');
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Serving ${rootDir} at http://localhost:${port}`);
});

