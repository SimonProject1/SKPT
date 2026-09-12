const CACHE='bayer-plt-tools-v0-4-stabilisiert';
const CORE=['./','./index.html','./assets/styles.css','./assets/start-mobile.css','./assets/app.js','./assets/stabilisierung.css','./assets/stabilisierung.js','./assets/bayer-logo.webp','./assets/bayer-logo-web.webp','./assets/icon-192.png','./assets/icon-512.png','./analogsignal/','./analogsignal/index.html','./pf-rechner/','./pf-rechner/index.html','./pt-rechner/','./pt-rechner/index.html','./messstellen-doku/','./messstellen-doku/index.html','./servicewerte/','./servicewerte/index.html'];
const INJECT='<link rel="stylesheet" href="__BASE__assets/stabilisierung.css"><script defer src="__BASE__assets/stabilisierung.js"></script>';
function baseFor(url){const path=new URL(url).pathname;return /\/(analogsignal|pf-rechner|pt-rechner|messstellen-doku|servicewerte)\//.test(path)?'../':'./'}
async function inject(response,request){
 if(!response||!response.ok)return response;
 const type=response.headers.get('content-type')||'';
 if(!type.includes('text/html'))return response;
 let html=await response.text();
 if(!html.includes('stabilisierung.js'))html=html.replace('</head>',INJECT.replaceAll('__BASE__',baseFor(request.url))+'</head>');
 const headers=new Headers(response.headers);headers.delete('content-length');headers.set('content-type','text/html; charset=utf-8');
 return new Response(html,{status:response.status,statusText:response.statusText,headers});
}
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)))});
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.mode==='navigate'){
   event.respondWith(fetch(request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));return inject(response,request)}).catch(()=>caches.match(request).then(response=>inject(response,request))));
   return;
 }
 event.respondWith(fetch(request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));return response}).catch(()=>caches.match(request)));
});
