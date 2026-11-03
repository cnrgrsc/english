// LinguaMaster Service Worker — "network-first": internet varsa her zaman en güncel sürüm,
// internet yoksa (metro, uçak vb.) son kaydedilen sürüm açılır.
const CACHE_NAME = 'linguamaster-v5';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Yalnızca kendi dosyalarımızı ve CDN (font/tailwind) isteklerini önbelleğe al
  event.respondWith(
    fetch(req)
      .then((response) => {
        if (response && (response.ok || response.type === 'opaque')) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return response;
      })
      .catch(() =>
        caches.match(req).then((cached) => cached || (url.origin === self.location.origin ? caches.match('/index.html') : undefined))
      )
  );
});
