(()=>{'use strict';
const VERSION='1.8.5';
const ROOT_MARKERS=['analogsignal','pf-rechner','pt-rechner','einheitenrechner','messstellen-doku','servicewerte','wissensdatenbank','plausibilitaetspruefung-vde0100-600'];
function rootPath(){
  const path=location.pathname;
  const marker=ROOT_MARKERS.map(name=>({name,index:path.indexOf('/'+name+'/')})).find(item=>item.index>=0);
  return marker?path.slice(0,marker.index+1):(path.endsWith('/')?path:path.slice(0,path.lastIndexOf('/')+1));
}
function absolute(relative){return new URL(relative,new URL(rootPath(),location.origin)).href}
function moduleName(){
  const bodyName=document.body?.dataset?.skModule;
  if(bodyName)return bodyName;
  const heading=document.querySelector('main h1,.page-title h1,h1');
  return heading?.textContent.trim()||'SK PLT Tools';
}
function applyLogo(){
  const source=absolute('assets/icon-512.png');
  document.querySelectorAll('.topbar img.logo,.header img.logo,img.module-logo,[data-sk-logo]').forEach(image=>{
    image.src=source;
    image.alt='SK PLT Tools';
    image.classList.add('sk-global-logo');
    image.removeAttribute('width');
    image.removeAttribute('height');
  });
}
function ensureHeader(){
  let header=document.querySelector('header.topbar,header.header');
  if(!header){
    header=document.createElement('header');
    header.className='topbar sk-global-header';
    const anchor=document.querySelector('body>.shell,body>.container,body');
    anchor.prepend(header);
  }
  header.classList.add('sk-global-header');
  let logo=header.querySelector('img.logo,.sk-global-logo');
  if(!logo){logo=document.createElement('img');logo.className='logo sk-global-logo';header.prepend(logo)}
  logo.src=absolute('assets/icon-512.png');logo.alt='SK PLT Tools';
  let brand=header.querySelector('.brand');
  if(!brand){brand=document.createElement('div');brand.className='brand';logo.after(brand)}
  brand.innerHTML=`SK PLT Tools<small>${moduleName()}</small>`;
  let version=header.querySelector('.version,.badge');
  if(!version){version=document.createElement('div');version.className='version';brand.after(version)}
  version.textContent=`Version ${VERSION}`;
  let home=header.querySelector('a.home,a[href="../"],a[href="./"]');
  if(!home){home=document.createElement('a');home.className='home';header.append(home)}
  home.href=absolute('');home.textContent='← Startseite';
}
function footer(){
  document.querySelectorAll('footer.footer').forEach(item=>item.innerHTML=`SK PLT Tools · <span class="stb-version">Version ${VERSION}</span> · Entwickelt von Simon Kiesler`)
}
function run(){ensureHeader();applyLogo();footer()}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run,{once:true}):run();
})();
