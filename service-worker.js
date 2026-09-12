const CACHE='bayer-plt-tools-v0-7-0-logo-fix';
const MODULES='analogsignal|pf-rechner|pt-rechner|messstellen-doku|servicewerte|einheitenrechner|wissensdatenbank';
const CORE=['./','./index.html','./assets/styles.css','./assets/start-mobile.css','./assets/app.js','./assets/stabilisierung.css','./assets/stabilisierung.js','./assets/bayer-logo.webp','./assets/bayer-logo-web.webp','./assets/icon-192.png','./assets/icon-512.png'];
function projectBase(url){const path=new URL(url).pathname;const match=path.match(new RegExp('/('+MODULES+')/'));return match?path.slice(0,match.index+1):(path.endsWith('/')?path:path.slice(0,path.lastIndexOf('/')+1))}
async function enhance(response,request){
 if(!response||!response.ok)return response;
 if(!(response.headers.get('content-type')||'').includes('text/html'))return response;
 let html=await response.text();
 const base=projectBase(request.url);
 const injection=`<link rel="stylesheet" href="${base}assets/stabilisierung.css?v=0.7.0"><script defer src="${base}assets/stabilisierung.js?v=0.7.0"></script>`;
 html=html.replace(/<link[^>]+stabilisierung\.css[^>]*>/gi,'').replace(/<script[^>]+stabilisierung\.js[^>]*><\/script>/gi,'');
 html=html.replace('</head>',injection+'</head>');
 const headers=new Headers(response.headers);headers.delete('content-length');headers.set('content-type','text/html; charset=utf-8');
 return new Response(html,{status:response.status,statusText:response.statusText,headers});
}
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)))});
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.mode==='navigate'){
   event.respondWith(fetch(request,{cache:'no-store'}).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));return enhance(response,request)}).catch(()=>caches.match(request).then(response=>enhance(response,request))));
   return;
 }
 event.respondWith(fetch(request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));return response}).catch(()=>caches.match(request)));
});
