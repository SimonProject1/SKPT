const C='bayer-plt-tools-v6-pf-footer';
const F=['./','./index.html','./assets/styles.css','./assets/app.js','./assets/bayer-logo.webp','./assets/icon-192.png','./assets/icon-512.png','./analogsignal/','./analogsignal/index.html','./pf-rechner/','./pf-rechner/index.html','./pt-rechner/','./pt-rechner/index.html','./messstellen-doku/','./messstellen-doku/index.html'];
const FOOTER='<style id="developer-footer-style">footer.footer::after{content:" · Entwickelt von Simon Kiesler"}</style>';
async function withFooter(response){
 if(!response||!response.ok)return response;
 const type=response.headers.get('content-type')||'';
 if(!type.includes('text/html'))return response;
 let html=await response.text();
 if(!html.includes('developer-footer-style')&&!html.includes('Entwickelt von Simon Kiesler'))html=html.replace('</head>',FOOTER+'</head>');
 return new Response(html,{status:response.status,statusText:response.statusText,headers:response.headers});
}
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(C).then(cache=>cache.addAll(F)))});
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==C).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.mode==='navigate')event.respondWith(fetch(event.request).then(withFooter).catch(()=>caches.match(event.request).then(withFooter)));
 else event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(C).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request)));
});
