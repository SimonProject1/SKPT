(()=>{'use strict';
const STATE_KEY='skNavigationTreeStateV1';
const SCRIPT_URL=document.currentScript?.src||'';
const ROOT=SCRIPT_URL?new URL('../',SCRIPT_URL):new URL('../',location.href);
const STAR_PATH='M4 4h4v4H4V4zm0 12h4v4H4v-4zm12-6h4v4h-4v-4zM8 6h5v6h3v2h-5V8H8V6zm0 12h5v-5h3v-2h-5v5H8v2z';
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
function loadState(){try{return JSON.parse(localStorage.getItem(STATE_KEY)||'{}')}catch{return {}}}
function saveState(state){try{localStorage.setItem(STATE_KEY,JSON.stringify(state))}catch{}}
function normalizedPage(url){const u=new URL(url,ROOT);return u.pathname.replace(/index\.html$/,'').replace(/\/+$/,'/')}
function active(url){return normalizedPage(url)===location.pathname.replace(/index\.html$/,'').replace(/\/+$/,'/')}
function itemHtml(item,depth=0,path='item'){
  const children=Array.isArray(item.children)&&item.children.length;
  const target=item.type==='file'?' download':'';
  const row=item.url?`<a class="sk-tree-link${active(item.url)?' active':''}" href="${new URL(item.url,ROOT).href}"${target}><span>${esc(item.title)}</span></a>`:`<span class="sk-tree-label">${esc(item.title)}</span>`;
  if(!children)return `<li class="sk-tree-item depth-${depth}">${row}</li>`;
  const id=`node-${path.replace(/[^a-z0-9_-]/gi,'-')}`;
  return `<li class="sk-tree-item depth-${depth} has-children"><button class="sk-tree-node-toggle" type="button" data-node="${id}" aria-expanded="true"><span class="sk-tree-chevron">⌄</span>${row}</button><ul id="${id}" class="sk-tree-children">${item.children.map((child,index)=>itemHtml(child,depth+1,`${path}-${index}`)).join('')}</ul></li>`;
}
function groupHtml(group,state){const open=state[group.id]!==false;return `<section class="sk-tree-group"><button class="sk-tree-group-toggle" type="button" data-group="${group.id}" aria-expanded="${open}"><span class="sk-tree-chevron">${open?'⌄':'›'}</span><span>${esc(group.title)}</span></button><ul class="sk-tree-list" ${open?'':'hidden'}>${group.items.map((item,index)=>itemHtml(item,0,`${group.id}-${index}`)).join('')}</ul></section>`}
async function init(){
  if(document.querySelector('.sk-tree-trigger'))return;
  let data;try{const response=await fetch(new URL('assets/navigation-tree.json?v=1.9.5',ROOT),{cache:'no-store'});data=await response.json()}catch(error){console.warn('Navigationsbaum konnte nicht geladen werden.',error);return}
  const state=loadState();
  const trigger=document.createElement('button');trigger.type='button';trigger.className='sk-tree-trigger';trigger.setAttribute('aria-label','Seitennavigation öffnen');trigger.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${STAR_PATH}"></path></svg>`;
  const backdrop=document.createElement('div');backdrop.className='sk-tree-backdrop';
  const drawer=document.createElement('aside');drawer.className='sk-tree-drawer';drawer.setAttribute('aria-hidden','true');drawer.innerHTML=`<div class="sk-tree-head"><div><div class="sk-tree-kicker">SEITENSTRUKTUR</div><h2>${esc(data.title||'Alle Seiten')}</h2></div><button class="sk-tree-close" type="button" aria-label="Navigation schließen">×</button></div><a class="sk-tree-home${active('')?' active':''}" href="${ROOT.href}">Startseite</a><nav class="sk-tree-content">${data.groups.map(group=>groupHtml(group,state)).join('')}</nav>`;
  const open=()=>{drawer.classList.add('open');backdrop.classList.add('open');drawer.setAttribute('aria-hidden','false');document.body.classList.add('sk-tree-open')};
  const close=()=>{drawer.classList.remove('open');backdrop.classList.remove('open');drawer.setAttribute('aria-hidden','true');document.body.classList.remove('sk-tree-open')};
  trigger.onclick=open;backdrop.onclick=close;drawer.querySelector('.sk-tree-close').onclick=close;
  drawer.addEventListener('click',event=>{
    const group=event.target.closest('.sk-tree-group-toggle');if(group){const list=group.nextElementSibling,openNow=group.getAttribute('aria-expanded')!=='true';group.setAttribute('aria-expanded',String(openNow));group.querySelector('.sk-tree-chevron').textContent=openNow?'⌄':'›';list.hidden=!openNow;state[group.dataset.group]=openNow;saveState(state);return}
    const node=event.target.closest('.sk-tree-node-toggle');if(node){if(event.target.closest('a'))return;const children=drawer.querySelector(`#${CSS.escape(node.dataset.node)}`),openNow=node.getAttribute('aria-expanded')!=='true';node.setAttribute('aria-expanded',String(openNow));node.querySelector('.sk-tree-chevron').textContent=openNow?'⌄':'›';children.hidden=!openNow}
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape')close()});
  document.body.append(trigger,backdrop,drawer);
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
})();
