(()=>{'use strict';
const VERSION='1.9.8.5';
function header(){return document.querySelector('.sk-header-normalized,.sk-shell-header,.stb-header,.app-header,.site-header,body > header,header')}
function inner(h){return h?.querySelector(':scope > .sk-header-inner')||h}
function versionNodes(root=document){return [...root.querySelectorAll('.version,.badge,.header-meta strong,.stb-version')].filter(e=>/^Version\s+[0-9]+(?:\.[0-9]+){2,3}$/i.test((e.textContent||'').trim()))}
function normalizeHeader(){
  const h=header(),i=inner(h);if(!h||!i)return;
  const logo=i.querySelector('img');if(!logo)return;
  let logoWrap=logo.closest('.sk-logo-version-stack');
  if(!logoWrap){logoWrap=document.createElement('div');logoWrap.className='sk-logo-version-stack';logo.parentNode.insertBefore(logoWrap,logo);logoWrap.appendChild(logo)}
  versionNodes(i).forEach(node=>{if(!logoWrap.contains(node))node.remove()});
  let v=logoWrap.querySelector('.sk-logo-version');
  if(!v){v=document.createElement('div');v.className='sk-logo-version';logoWrap.appendChild(v)}
  v.textContent=`Version ${VERSION}`;
}
function ensureFooter(){
  let footer=document.querySelector('footer.footer,footer.sk-footer');
  if(!footer){footer=document.createElement('footer');footer.className='footer sk-footer';document.body.appendChild(footer)}
  footer.innerHTML=`SK PLT Tools · <span class="stb-version">Version ${VERSION}</span> · Entwickelt von Simon Kiesler`;
}
function run(){normalizeHeader();ensureFooter()}
function boot(){run();[80,260,700].forEach(ms=>setTimeout(run,ms))}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();
