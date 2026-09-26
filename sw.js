// Infinity Sparkle Studios — app shell service worker
// Bump CACHE_NAME whenever index.html/manifest/icons change so old installs pick up updates.
const CACHE_NAME = 'iss-app-v1';
const APP_SHELL = [
  './index.html',
  './manifest.json',
  './pricing.js',
  './store.js',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

// Network-first for the page and pricing/store scripts (so customers always
// see current prices and products when online), falling back to the cached
// copy offline. Cache-first for icons. studio.html is intentionally NOT
// cached or precached — it's your admin tool, not the customer app shell.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (req.url.includes('studio.html')) return; // let the studio always hit the network

  const isIcon = /icon-(192|512|maskable-512)\.png$/.test(req.url) || /favicon-32\.png$|apple-touch-icon\.png$/.test(req.url);
  if (isIcon) {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req))
    );
    return;
  }

  event.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req).then(cached => cached || caches.match('./index.html')))
  );
});
