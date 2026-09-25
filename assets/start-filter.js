(()=>{'use strict';
const FILTERS=['ALLE','RECHNER','SERVICE','DOKUMENTATION','WISSEN'];
function isStartPage(){
  const path=location.pathname.replace(/\/+$/,'');
  return !/(\/analogsignal|\/pf-rechner|\/pt-rechner|\/einheitenrechner|\/messstellen-doku|\/servicewerte|\/wissensdatenbank)(\/|$)/.test(path);
}
function normalize(value){
  return String(value||'').toLocaleLowerCase('de-DE').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9+]+/g,' ').trim();
}
function cards(){return [...document.querySelectorAll('.tools a.card,.start-tools a.tool-card')];}
function category(card){return (card.querySelector('.sk-card-category')?.textContent||'').trim().toUpperCase();}
function applyFilter(){
  const query=normalize(document.getElementById('skToolSearch')?.value||'');
  const active=document.querySelector('.sk-filter-button.active')?.dataset.filter||'ALLE';
  let visible=0;
  cards().forEach(card=>{
    const haystack=normalize(`${category(card)} ${card.querySelector('h1,h2,h3')?.textContent||''} ${card.querySelector('p')?.textContent||''}`);
    const matchesCategory=active==='ALLE'||category(card)===active;
    const matchesText=!query||query.split(/\s+/).every(term=>haystack.includes(term));
    const show=matchesCategory&&matchesText;
    card.hidden=!show;
    card.classList.toggle('sk-filter-hidden',!show);
    if(show)visible++;
  });
  const empty=document.getElementById('skFilterEmpty');
  if(empty)empty.hidden=visible!==0;
  const result=document.getElementById('skFilterResult');
  if(result)result.textContent=`${visible} ${visible===1?'Werkzeug':'Werkzeuge'} angezeigt`;
}
function resetFilter(){
  const search=document.getElementById('skToolSearch');
  if(search)search.value='';
  document.querySelectorAll('.sk-filter-button').forEach(button=>button.classList.toggle('active',button.dataset.filter==='ALLE'));
  applyFilter();
}
function init(){
  if(!isStartPage()||document.getElementById('skToolFilter'))return;
  const list=document.querySelector('.tools,.start-tools');
  if(!list)return;
  const section=document.createElement('section');
  section.id='skToolFilter';
  section.className='sk-tool-filter panel';
  section.innerHTML=`<div class="sk-filter-heading"><div><div class="eyebrow">WERKZEUGE FILTERN</div><h2>Was suchst du?</h2></div><button id="skFilterReset" class="sk-filter-reset" type="button">Zurücksetzen</button></div><label class="sk-filter-search"><span>Werkzeug suchen</span><input id="skToolSearch" type="search" placeholder="z. B. Analog, Pt100, PIN oder Wissen" autocomplete="off"></label><div class="sk-filter-buttons" role="group" aria-label="Werkzeuge nach Kategorie filtern">${FILTERS.map(name=>`<button class="sk-filter-button${name==='ALLE'?' active':''}" type="button" data-filter="${name}">${name[0]+name.slice(1).toLocaleLowerCase('de-DE')}</button>`).join('')}</div><div class="sk-filter-meta"><span id="skFilterResult"></span></div><div id="skFilterEmpty" class="sk-filter-empty" hidden><strong>Keine passenden Werkzeuge gefunden.</strong><span>Ändere den Suchbegriff oder setze den Filter zurück.</span></div>`;
  list.parentNode.insertBefore(section,list);
  section.querySelectorAll('.sk-filter-button').forEach(button=>button.addEventListener('click',()=>{
    section.querySelectorAll('.sk-filter-button').forEach(item=>item.classList.remove('active'));
    button.classList.add('active');
    applyFilter();
  }));
  document.getElementById('skToolSearch').addEventListener('input',applyFilter);
  document.getElementById('skFilterReset').addEventListener('click',resetFilter);
  applyFilter();
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
})();
