const CACHE = 'bayer-plt-tools-v1-0-0-release';
const CORE = [
  './',
  './index.html',
  './assets/styles.css',
  './assets/start-mobile.css',
  './assets/app.js',
  './assets/stabilisierung.css',
  './assets/stabilisierung.js',
  './assets/version-release.js',
  './assets/bayer-logo-web.webp',
  './assets/icon-192.png',
  './assets/icon-512.png'
];
const MODULES = 'analogsignal|pf-rechner|pt-rechner|messstellen-doku|servicewerte|einheitenrechner|wissensdatenbank';

function projectBase(url) {
  const path = new URL(url).pathname;
  const match = path.match(new RegExp('/(' + MODULES + ')/'));
  return match ? path.slice(0, match.index + 1) : (path.endsWith('/') ? path : path.slice(0, path.lastIndexOf('/') + 1));
}

async function enhance(response, request) {
  if (!response || !response.ok || !(response.headers.get('content-type') || '').includes('text/html')) return response;
  let html = await response.text();
  const base = projectBase(request.url);
  html = html.replace(/<script[^>]+version-release\.js[^>]*><\/script>/gi, '');
  html = html.replace('</body>', `<script defer src="${base}assets/version-release.js?v=1.0.0"></script></body>`);
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  headers.set('content-type', 'text/html; charset=utf-8');
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
}

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request, { cache: 'no-store' })
        .then(response => enhance(response, request))
        .catch(() => caches.match(request).then(response => enhance(response, request)))
    );
    return;
  }
  event.respondWith(fetch(request).catch(() => caches.match(request)));
});
