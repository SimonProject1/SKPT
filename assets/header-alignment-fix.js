(()=>{'use strict';
function findHeader(){
  const selectors=['.sk-shell-header','.stb-header','.app-header','.site-header','body > header','header'];
  for(const selector of selectors){const header=document.querySelector(selector);if(header)return header}
  return null;
}
function apply(){
  const header=findHeader();if(!header)return;
  header.classList.add('sk-header-normalized');
  let inner=header.querySelector(':scope > .sk-header-inner');
  if(!inner){
    inner=document.createElement('div');inner.className='sk-header-inner';
    while(header.firstChild)inner.appendChild(header.firstChild);
    header.appendChild(inner);
  }
  const children=[...inner.children];
  const home=children.find(el=>el.matches?.('a,button')&&/startseite/i.test(el.textContent||''));
  if(home)home.classList.add('sk-header-home');
  const logo=inner.querySelector('img');if(logo)logo.classList.add('sk-header-logo');
}
function boot(){apply();setTimeout(apply,80);setTimeout(apply,350)}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();
