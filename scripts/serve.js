// Simple static file server for local preview
// Usage: DIR=docs PORT=8000 node scripts/serve.js

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const rootDir = path.resolve(process.env.DIR || 'out');
const port = Number(process.env.PORT || 8000);

// MIME types mapping
const MIME_TYPES = {
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
  '.txt': 'text/plain; charset=utf-8'
};

// Security: Prevent directory traversal attacks
function isPathSafe(pathname) {
  return !pathname.includes('..') && !pathname.includes('\0');
}

// Get file path and handle directory indexing
function getFilePath(requestedPath) {
  let filePath = path.join(rootDir, requestedPath);
  
  // Security check
  if (!isPathSafe(requestedPath)) {
    return { error: 'Bad request', code: 400 };
  }

  try {
    const stats = fs.existsSync(filePath) && fs.statSync(filePath);
    
    // Handle directories
    if (stats && stats.isDirectory()) {
      // Redirect to trailing slash if missing
      if (!requestedPath.endsWith('/')) {
        return { redirect: requestedPath + '/' };
      }
      
      // Try index.html first
      const indexPath = path.join(filePath, 'index.html');
      if (fs.existsSync(indexPath)) {
        return { filePath: indexPath };
      }
    }
    
    // Handle files
    if (stats && stats.isFile()) {
      return { filePath };
    }
    
    // Default fallback for root or missing extensions
    if (!path.extname(requestedPath)) {
      const defaultIndex = path.join(rootDir, 'index.html');
      if (fs.existsSync(defaultIndex)) {
        return { filePath: defaultIndex };
      }
    }
    
    return { error: 'Not Found', code: 404 };
  } catch (error) {
    return { error: 'Server Error', code: 500 };
  }
}

// Create HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url || '/', true);
  let pathname = decodeURIComponent(parsedUrl.pathname || '/');

  // Get file path
  const result = getFilePath(pathname);
  
  // Handle redirects
  if (result.redirect) {
    res.writeHead(301, { Location: result.redirect });
    return res.end();
  }
  
  // Handle errors
  if (result.error) {
    res.writeHead(result.code, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end(result.error);
  }

  // Read and serve file
  fs.readFile(result.filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('File not found');
    }

    // Set content type
    const ext = path.extname(result.filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    res.writeHead(200, { 
      'Content-Type': contentType,
      'Cache-Control': 'no-cache' // Disable caching for development
    });
    res.end(data);
  });
});

// Start server
server.listen(port, () => {
  console.log(`🚀 Serving ${rootDir} at http://localhost:${port}`);
  console.log(`📁 Press Ctrl+C to stop`);
});