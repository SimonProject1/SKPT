(()=>{'use strict';
const APP_VERSION='0.6.1',DEVELOPER='Simon Kiesler';
const MODULES=['analogsignal','pf-rechner','pt-rechner','messstellen-doku','servicewerte','einheitenrechner','wissensdatenbank'];
function assetBase(){
  const parts=location.pathname.split('/').filter(Boolean);
  const moduleIndex=parts.findIndex(part=>MODULES.includes(part));
  if(moduleIndex<0)return 'assets/';
  const depth=parts.length-moduleIndex-1-(parts.at(-1)==='index.html'?1:0);
  return '../'.repeat(Math.max(1,depth+1))+'assets/';
}
function normalizeLogo(){const src=assetBase()+'bayer-logo-web.webp';document.querySelectorAll('.topbar img,.hero-logo img').forEach(img=>{img.src=src;img.alt='Bayer Logo'})}
function normalizeFooter(){const f=document.querySelector('footer.footer');if(!f)return;f.classList.add('stb-footer');f.innerHTML=`Bayer PLT Tools · <span class="stb-version">Version ${APP_VERSION}</span> · Entwickelt von ${DEVELOPER}`}
function normalizeVersion(){document.querySelectorAll('.badge,.header-meta strong').forEach(e=>{if(/^Version\s+[\d.]+$/i.test(e.textContent.trim()))e.textContent='Version '+APP_VERSION})}
function run(){normalizeLogo();normalizeVersion();normalizeFooter()}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run,{once:true}):run();
})();
