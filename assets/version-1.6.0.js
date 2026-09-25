(()=>{'use strict';
const VERSION='1.6.0';
const APP='SK PLT Tools';
const DEVELOPER='Simon Kiesler';
function update(){
  document.querySelectorAll('.version,.badge,.header-meta strong,.stb-version').forEach(element=>{
    if(/^Version\s+[0-9]+\.[0-9]+\.[0-9]+$/i.test(element.textContent.trim())) element.textContent=`Version ${VERSION}`;
  });
  document.querySelectorAll('footer.footer').forEach(footer=>{
    footer.innerHTML=`${APP} · <span class="stb-version">Version ${VERSION}</span> · Entwickelt von ${DEVELOPER}`;
  });
}
function run(){update();[120,400,1000].forEach(delay=>setTimeout(update,delay))}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run,{once:true}):run();
})();
