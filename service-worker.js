const CACHE='sk-plt-tools-v1.4.0-logo-final';
const FILES=[
  './','./index.html','./manifest.webmanifest',
  './assets/styles.css','./assets/logo-layout.css','./assets/app.js',
  './assets/logo.png','./assets/logo-horizontal.png',
  './assets/icon-192.png','./assets/icon-512.png',
  './assets/apple-touch-icon.png','./assets/favicon.png',
  './analogsignal/','./pf-rechner/','./pt-rechner/',
  './einheitenrechner/','./messstellen-doku/',
  './servicewerte/','./wissensdatenbank/'
];
self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys()
    .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
    .then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  event.respondWith(fetch(event.request,{cache:'no-store'})
    .then(response=>{
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(event.request,copy));
      return response;
    })
    .catch(()=>caches.match(event.request)));
});
