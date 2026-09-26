(()=>{'use strict';
const SELECT_ID='skToolSort';
let originalOrder=[];
const norm=value=>String(value||'').trim().toLocaleLowerCase('de-DE').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
function host(){return document.querySelector('.tools,.start-tools')}
function cards(){const grid=host();return grid?[...grid.querySelectorAll(':scope > a.card,:scope > a.tool-card')]:[]}
function category(card){return norm(card.querySelector('.sk-card-category,.eyebrow')?.textContent||'')}
function title(card){return norm(card.querySelector('h1,h2,h3')?.textContent||'')}
function captureOriginal(){const current=cards();current.forEach(card=>{if(!originalOrder.includes(card))originalOrder.push(card)})}
function compareText(a,b,key,direction){const result=key(a).localeCompare(key(b),'de',{sensitivity:'base',numeric:true});if(result!==0)return direction==='asc'?result:-result;return originalOrder.indexOf(a)-originalOrder.indexOf(b)}
function sortCards(mode){const grid=host();if(!grid)return;captureOriginal();let ordered=[...cards()];if(mode==='category-asc')ordered.sort((a,b)=>compareText(a,b,category,'asc')||compareText(a,b,title,'asc'));if(mode==='category-desc')ordered.sort((a,b)=>compareText(a,b,category,'desc')||compareText(a,b,title,'asc'));if(mode==='title-asc')ordered.sort((a,b)=>compareText(a,b,title,'asc'));if(mode==='title-desc')ordered.sort((a,b)=>compareText(a,b,title,'desc'));if(mode==='default')ordered=[...originalOrder].filter(card=>card.isConnected&&card.parentElement===grid);ordered.forEach(card=>grid.append(card));document.dispatchEvent(new CustomEvent('sk:cards-sorted',{detail:{mode}}))}
function addControl(){const panel=document.getElementById('skToolFilter');if(!panel||document.getElementById(SELECT_ID))return;const meta=panel.querySelector('.sk-filter-meta');const row=document.createElement('div');row.className='sk-sort-row';row.innerHTML=`<label class="sk-sort-label" for="${SELECT_ID}">Sortieren nach</label><select id="${SELECT_ID}" class="sk-sort-select"><option value="default">Standardreihenfolge</option><option value="category-asc">Kategorie: A bis Z</option><option value="category-desc">Kategorie: Z bis A</option><option value="title-asc">Titel: A bis Z</option><option value="title-desc">Titel: Z bis A</option></select>`;(meta||panel).before(row);const select=document.getElementById(SELECT_ID);select.addEventListener('change',()=>sortCards(select.value));const reset=document.getElementById('skFilterReset');if(reset)reset.addEventListener('click',()=>{select.value='default';sortCards('default')})}
function refresh(){captureOriginal();addControl();const select=document.getElementById(SELECT_ID);if(select)sortCards(select.value)}
function init(){refresh();document.addEventListener('sk:cards-updated',()=>setTimeout(refresh,0))}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
})();
