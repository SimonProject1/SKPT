(()=>{'use strict';
const VERSION='1.9.3';
const SCRIPT_URL=document.currentScript?.src||'';
const PROJECT_ROOT=SCRIPT_URL?new URL('../',SCRIPT_URL).href:new URL('../',location.href).href;
const asset=path=>new URL(`assets/${path}`,PROJECT_ROOT).href;
function ensureFavicon(){
  const stamp=`?v=${VERSION}`;
  document.querySelectorAll('link[rel~="icon"],link[rel="shortcut icon"],link[rel="apple-touch-icon"]').forEach(link=>link.remove());
  const favicon=document.createElement('link');favicon.rel='icon';favicon.type='image/png';favicon.sizes='64x64';favicon.href=asset('favicon.png')+stamp;
  const apple=document.createElement('link');apple.rel='apple-touch-icon';apple.href=asset('apple-touch-icon.png')+stamp;
  document.head.append(favicon,apple);
}
function moduleName(){return document.body?.dataset?.skModule||document.querySelector('main h1,.page-title h1,h1')?.textContent.trim()||'SK PLT Tools'}
function ensureHeader(){let header=document.querySelector('header.topbar,header.header');if(!header){header=document.createElement('header');header.className='topbar';(document.querySelector('body>.shell,body>.container')||document.body).prepend(header)}header.classList.add('sk-global-header');let logo=header.querySelector('img.logo,.sk-global-logo');if(!logo){logo=document.createElement('img');logo.className='logo';header.prepend(logo)}logo.classList.add('sk-global-logo');logo.src=asset('icon-512.png');logo.alt='SK PLT Tools';logo.removeAttribute('width');logo.removeAttribute('height');let brand=header.querySelector('.brand');if(!brand){brand=document.createElement('div');brand.className='brand';logo.after(brand)}brand.innerHTML=`SK PLT Tools<small>${moduleName()}</small>`;let version=header.querySelector('.version,.badge');if(!version){version=document.createElement('div');version.className='version';brand.after(version)}version.textContent=`Version ${VERSION}`;let home=header.querySelector('a.home');if(!home){home=document.createElement('a');home.className='home';header.append(home)}home.href=PROJECT_ROOT;home.textContent='← Startseite';home.setAttribute('aria-label','Zur Startseite')}
function updateFooter(){document.querySelectorAll('footer.footer').forEach(f=>f.innerHTML=`SK PLT Tools · <span class="stb-version">Version ${VERSION}</span> · Entwickelt von Simon Kiesler`)}
function run(){ensureFavicon();ensureHeader();updateFooter()}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run,{once:true}):run();
})();
