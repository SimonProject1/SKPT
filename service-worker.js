const CACHE='sk-plt-tools-v1.4.2-icons-v2';
const CORE=['./','./index.html','./manifest.webmanifest','./assets/styles.css','./assets/app.js','./assets/tool-icons-v2.css','./assets/tool-icons-v2.js','./assets/logo.png','./assets/icon-192.png','./assets/icon-512.png','./assets/apple-touch-icon.png','./assets/favicon.png'];
async function enhance(response){
  if(!response||!response.ok||!(response.headers.get('content-type')||'').includes('text/html'))return response;
  let html=await response.text();
  html=html.replace(/<link[^>]+tool-icons(?:-v2)?\.css[^>]*>/gi,'')
           .replace(/<script[^>]+tool-icons(?:-v2)?\.js[^>]*><\/script>/gi,'');
  const inject='<link rel="stylesheet" href="assets/tool-icons-v2.css?v=1.4.2"><script defer src="assets/tool-icons-v2.js?v=1.4.2"></script>';
  html=html.replace('</head>',inject+'</head>');
  const headers=new Headers(response.headers);headers.delete('content-length');headers.set('content-type','text/html; charset=utf-8');headers.set('cache-control','no-store');
  return new Response(html,{status:response.status,statusText:response.statusText,headers});
}
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.mode==='navigate'){
    event.respondWith(fetch(request,{cache:'no-store'}).then(enhance).catch(()=>caches.match(request).then(enhance)));
    return;
  }
  event.respondWith(fetch(request,{cache:'no-store'}).catch(()=>caches.match(request)));
});
