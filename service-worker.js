const C='bayer-plt-tools-v0-3-2-logo-nav-fix';
const F=['./','./index.html','./assets/styles.css','./assets/start-mobile.css','./assets/app.js','./assets/bayer-logo.webp','./assets/bayer-logo-web.webp','./assets/icon-192.png','./assets/icon-512.png','./analogsignal/','./analogsignal/index.html','./pf-rechner/','./pf-rechner/index.html','./pt-rechner/','./pt-rechner/index.html','./messstellen-doku/','./messstellen-doku/index.html','./servicewerte/','./servicewerte/index.html'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(C).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request))));
