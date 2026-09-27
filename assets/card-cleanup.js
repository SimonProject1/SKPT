(()=>{'use strict';
const SERVICE_PATTERN=/(servicewerte|initial[- ]?pins?|initialwerte)/i;
function hrefOf(element){return element?.getAttribute?.('href')||''}
function isServiceCard(card){return SERVICE_PATTERN.test(`${hrefOf(card)} ${card.textContent||''}`)}
function cleanCards(){
  document.querySelectorAll('a.card,a.tool-card').forEach(card=>{
    if(isServiceCard(card)){card.remove();return}
    card.querySelectorAll('.open,.card-action,.tool-action,[data-card-action]').forEach(action=>action.remove());
  });
}
function cleanFilters(){
  document.querySelectorAll('#skToolFilter button,.sk-filter-buttons button,[data-category],[data-filter]').forEach(button=>{
    const value=`${button.textContent||''} ${button.dataset.category||''} ${button.dataset.filter||''}`;
    if(/service/i.test(value))button.remove();
  });
}
function cleanServiceLinks(){
  document.querySelectorAll('a[href*="servicewerte"],a[href*="initial-pin"],a[href*="initialpin"]').forEach(link=>{
    if(link.closest('.sk-favorites-drawer'))return;
    link.remove();
  });
}
function purgeFavorite(){
  const key='skPltToolsFavoritesV2';
  try{
    const items=JSON.parse(localStorage.getItem(key)||'[]');
    if(!Array.isArray(items))return;
    const cleaned=items.filter(item=>!SERVICE_PATTERN.test(`${item?.url||''} ${item?.title||''} ${item?.description||''} ${item?.category||''}`));
    if(cleaned.length!==items.length)localStorage.setItem(key,JSON.stringify(cleaned));
  }catch(error){console.warn('Veralteter Service-Favorit konnte nicht bereinigt werden.',error)}
}
function run(){purgeFavorite();cleanCards();cleanFilters();cleanServiceLinks();document.dispatchEvent(new CustomEvent('sk:cards-updated',{detail:{source:'card-cleanup',version:'1.9.4'}}))}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run,{once:true}):run();
})();
