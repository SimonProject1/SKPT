(() => {
  'use strict';
  const APP_VERSION = '0.4';
  const DEVELOPER = 'Simon Kiesler';
  const path = location.pathname.replace(/\/+$/, '/');
  const isHome = !/(analogsignal|pf-rechner|pt-rechner|messstellen-doku|servicewerte)\//.test(path);

  function normalizeNavigation(){
    const header=document.querySelector('.topbar');
    if(!header||isHome)return;
    let nav=header.querySelector('nav');
    if(!nav){nav=document.createElement('nav');header.appendChild(nav)}
    let back=nav.querySelector('a[href="../"],a.back,.stb-home-link');
    if(!back){back=document.createElement('a');nav.appendChild(back)}
    back.href='../';
    back.className='back stb-home-link';
    back.textContent='← Startseite';
    back.setAttribute('aria-label','Zurück zur Startseite');
  }

  function normalizeWebLogo(){
    const logoPath=isHome?'assets/bayer-logo-web.webp':'../assets/bayer-logo-web.webp';
    document.querySelectorAll('.topbar img').forEach(img=>{
      img.src=logoPath;
      img.alt='Bayer Logo';
    });
    if(isHome){
      document.querySelectorAll('.hero-logo img').forEach(img=>{
        img.src=logoPath;
        img.alt='Bayer Logo';
      });
    }
  }

  function normalizeVersion(){
    document.querySelectorAll('.badge').forEach(el=>{
      if(/^Version\s+[\d.]+$/i.test(el.textContent.trim())) el.textContent=`Version ${APP_VERSION}`;
    });
    document.querySelectorAll('.header-meta strong').forEach(el=>{
      if(/^Version\s+/i.test(el.textContent.trim())) el.textContent=`Version ${APP_VERSION}`;
    });
    const title=document.querySelector('.brand small');
    if(title) title.setAttribute('data-app-version',APP_VERSION);
  }

  function normalizeFooter(){
    let footer=document.querySelector('footer.footer');
    if(!footer){footer=document.createElement('footer');footer.className='footer';document.querySelector('.shell')?.appendChild(footer)}
    if(!footer)return;
    footer.classList.add('stb-footer');
    footer.innerHTML=`<span>Bayer PLT Tools</span><span class="stb-separator">·</span><span class="stb-version">Version ${APP_VERSION}</span><span class="stb-separator">·</span><span>Entwickelt von ${DEVELOPER}</span>`;
  }

  function run(){normalizeWebLogo();normalizeNavigation();normalizeVersion();normalizeFooter()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();
