const CACHE='sk-plt-tools-v1.4.3-knowledge-air-torque-only';
const CORE=[
  './','./index.html','./manifest.webmanifest',
  './assets/styles.css','./assets/logo-layout.css','./assets/app.js',
  './assets/logo.png','./assets/icon-192.png','./assets/icon-512.png',
  './assets/apple-touch-icon.png','./assets/favicon.png',
  './assets/airttorque-wissen.css',
  './wissensdatenbank/','./wissensdatenbank/index.html',
  './wissensdatenbank/air-torque-antrieb-drehrichtung/',
  './wissensdatenbank/air-torque-antrieb-drehrichtung/index.html',
  './wissensdatenbank/vorlagen/Wissensdatenbank_Beitragsvorlage.docx'
];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{event.respondWith(fetch(event.request,{cache:'no-store'}).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request)))});
