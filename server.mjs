import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

http.createServer((req, res) => {
  const reqUrl = decodeURIComponent((req.url || '/').split('?')[0]);
  let filePath = path.join(__dirname, reqUrl === '/' ? 'index.html' : reqUrl);

  // Klasör dışına çıkmayı engelle
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end();
    return;
  }

  if (!fs.existsSync(filePath) && fs.existsSync(path.join(__dirname, 'public', reqUrl))) {
    filePath = path.join(__dirname, 'public', reqUrl);
  }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(__dirname, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, {
    'Content-Type': MIME_TYPES[ext] || 'text/plain; charset=utf-8',
    // Geliştirme sırasında tarayıcı her zaman en güncel dosyayı alsın
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  });
  fs.createReadStream(filePath).pipe(res);
}).listen(PORT, () => {
  console.log(`\n🚀 LinguaMaster çalışıyor: http://localhost:${PORT}\n`);
});
