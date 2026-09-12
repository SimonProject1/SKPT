(()=>{'use strict';
const APP_VERSION='0.7.0';
const DEVELOPER='Simon Kiesler';
const MODULES=['analogsignal','pf-rechner','pt-rechner','messstellen-doku','servicewerte','einheitenrechner','wissensdatenbank'];

function projectBase(){
  const path=location.pathname;
  const hits=MODULES.map(name=>path.indexOf('/'+name+'/')).filter(index=>index>=0);
  if(hits.length)return path.slice(0,Math.min(...hits)+1);
  return path.endsWith('/')?path:path.slice(0,path.lastIndexOf('/')+1);
}

function normalizeLogos(){
  const source=projectBase()+'assets/bayer-logo-web.webp?v=0.7.0';
  document.querySelectorAll('.topbar img,.hero-logo img').forEach(image=>{
    image.src=source;
    image.alt='Bayer Logo';
  });
}

function normalizeNavigation(){
  const isHome=!MODULES.some(name=>location.pathname.includes('/'+name+'/'));
  if(isHome)return;
  const header=document.querySelector('.topbar');
  if(!header)return;
  let nav=header.querySelector('nav');
  if(!nav){nav=document.createElement('nav');header.appendChild(nav)}
  let link=nav.querySelector('a');
  if(!link){link=document.createElement('a');nav.appendChild(link)}
  link.href=projectBase();
  link.className='back stb-home-link';
  link.textContent='← Startseite';
  link.setAttribute('aria-label','Zurück zur Startseite');
}

function normalizeVersion(){
  document.querySelectorAll('.badge,.header-meta strong').forEach(element=>{
    if(/^Version\s+[\d.]+$/i.test(element.textContent.trim()))element.textContent='Version '+APP_VERSION;
  });
}

function normalizeFooter(){
  const footer=document.querySelector('footer.footer');
  if(!footer)return;
  footer.classList.add('stb-footer');
  footer.innerHTML=`Bayer PLT Tools · <span class="stb-version">Version ${APP_VERSION}</span> · Entwickelt von ${DEVELOPER}`;
}

function enableNegativeAnalogInputs(){
  if(!location.pathname.includes('/analogsignal/'))return;
  ['p0','p1','s0','s1','x'].forEach(id=>{
    const input=document.getElementById(id);
    if(!input||input.dataset.signReady==='true')return;
    input.dataset.signReady='true';
    const wrapper=document.createElement('div');wrapper.className='stb-signed-input';
    input.parentNode.insertBefore(wrapper,input);wrapper.appendChild(input);
    const button=document.createElement('button');button.type='button';button.className='stb-sign-button';button.textContent='±';button.setAttribute('aria-label','Vorzeichen wechseln');
    button.onclick=()=>{const value=Number.parseFloat(String(input.value||'').replace(',','.'));input.value=Number.isFinite(value)?String(value===0?0:-value):'-';input.dispatchEvent(new Event('input',{bubbles:true}));input.focus()};
    wrapper.appendChild(button);
  });
}

function run(){normalizeLogos();normalizeNavigation();normalizeVersion();normalizeFooter();enableNegativeAnalogInputs()}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run,{once:true}):run();
})();
