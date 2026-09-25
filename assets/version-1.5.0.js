(()=>{'use strict';
const VERSION='1.5.0';
const APP_NAME='SK PLT Tools';
const DEVELOPER='Simon Kiesler';
function update(){
  document.querySelectorAll('.version,.badge,.header-meta strong,.stb-version').forEach(element=>{
    const text=element.textContent.trim();
    if(/^Version\s+[0-9]+\.[0-9]+\.[0-9]+$/i.test(text)&&text!==`Version ${VERSION}`){
      element.textContent=`Version ${VERSION}`;
    }
  });
  document.querySelectorAll('footer.footer').forEach(footer=>{
    const wanted=`${APP_NAME} · Version ${VERSION} · Entwickelt von ${DEVELOPER}`;
    if(footer.textContent.trim()!==wanted){
      footer.innerHTML=`${APP_NAME} · <span class="stb-version">Version ${VERSION}</span> · Entwickelt von ${DEVELOPER}`;
    }
  });
  document.querySelectorAll('[data-app-version]').forEach(element=>element.dataset.appVersion=VERSION);
}
function run(){update();[120,400,1000,2200].forEach(delay=>setTimeout(update,delay))}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run,{once:true}):run();
})();
