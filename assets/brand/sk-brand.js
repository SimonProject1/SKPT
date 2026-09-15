(()=>{'use strict';const VERSION='1.3.0',NAME='SK PLT Tools',DEVELOPER='Simon Kiesler';
const MODULES=['analogsignal','pf-rechner','pt-rechner','messstellen-doku','servicewerte','einheitenrechner','wissensdatenbank'];
function base(){const p=location.pathname,h=MODULES.map(n=>p.indexOf('/'+n+'/')).filter(i=>i>=0);return h.length?p.slice(0,Math.min(...h)+1):(p.endsWith('/')?p:p.slice(0,p.lastIndexOf('/')+1))}
function apply(root=document){
 root.querySelectorAll?.('.topbar img,.hero-logo img').forEach(img=>{img.src=base()+'assets/brand/sk-plt-logo-512.png?v=1.3.0';img.alt='SK PLT Tools Logo';img.classList.add('sk-brand-logo')});
 root.querySelectorAll?.('.brand').forEach(el=>{for(const n of [...el.childNodes])if(n.nodeType===3&&n.textContent.trim())n.textContent=NAME});
 root.querySelectorAll?.('.badge,.header-meta strong,.stb-version').forEach(el=>{if(/^Version\s+[\d.]+$/i.test(el.textContent.trim()))el.textContent='Version '+VERSION});
 root.querySelectorAll?.('footer.footer').forEach(f=>f.innerHTML=`${NAME} · <span class="stb-version">Version ${VERSION}</span> · Entwickelt von ${DEVELOPER}`);
 document.title=document.title.replace(/Bayer PLT Tools/gi,NAME);
 document.querySelectorAll('meta[name="apple-mobile-web-app-title"]').forEach(m=>m.content=NAME);
}
function run(){apply();new MutationObserver(rs=>rs.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1)apply(n)}))).observe(document.body,{childList:true,subtree:true});setTimeout(()=>apply(),300)}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run,{once:true}):run()})();
