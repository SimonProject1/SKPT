(()=>{'use strict';
const PAGE=/\/wissensdatenbank\/(?:index\.html)?$/;
const TARGET='siemens-sitrans-p320-sil-verriegelung/';
function findHost(){
  const air=[...document.querySelectorAll('a[href]')].find(a=>/air-?torque.*drehrichtung/i.test(a.getAttribute('href')||''));
  if(air?.parentElement)return {host:air.parentElement,template:air};
  const selectors=['#list','#knowledge-list','#knowledge-grid','.device-grid','.guide-grid','.knowledge-grid','.cards','.tools','.start-tools'];
  for(const selector of selectors){const host=document.querySelector(selector);if(host)return {host,template:host.querySelector('a[href]')}}
  return null;
}
function makeCard(template){
  const a=document.createElement('a');
  a.className=template?.className||'card';
  a.href=TARGET;
  a.dataset.category='wissen';
  a.dataset.search='Siemens Sitrans P320 SIL Verriegelung SIMATIC PDM Schreibschutz 2457 PIN';
  a.innerHTML='<div class="sk-card-category">SIEMENS</div><h2>Sitrans P320</h2><p>SIL-Verriegelung mit SIMATIC PDM, Schreibschutz und Initial-PIN 2457.</p>';
  return a;
}
function add(){
  if(!PAGE.test(location.pathname))return;
  if(document.querySelector('a[href*="siemens-sitrans-p320-sil-verriegelung"]'))return;
  const found=findHost();if(!found){console.warn('Siemens-Wissenskachel: Zielbereich nicht gefunden.');return}
  found.host.appendChild(makeCard(found.template));
  document.dispatchEvent(new CustomEvent('sk:cards-updated',{detail:{source:'siemens-sitrans',version:'1.9.8.1'}}));
}
function boot(){add();setTimeout(add,150);setTimeout(add,600)}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();
