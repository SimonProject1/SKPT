(()=>{'use strict';
const ICONS={
  analogsignal:`<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 27V5M5 27h22"/><path d="M8 23l6-7 5 2 6-8"/><circle cx="14" cy="16" r="2.1"/><circle cx="25" cy="10" r="2.1"/></svg>`,
  'pf-rechner':`<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 27V5M5 27h22"/><path d="M8 23 23 8"/><path d="M21 18v7M26 18l-5 3.5 5 3.5"/></svg>`,
  'pt-rechner':`<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 20V8a4 4 0 0 1 8 0v12a6 6 0 1 1-8 0Z"/><path d="M11 10v13"/><path d="M19 23c0-4 2.2-6 5-6s5 2 5 6c0 2.5-1 4.2-2.5 5.5M21 28h6"/></svg>`,
  'messstellen-doku':`<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 3h13l5 5v8M18 3v6h6M5 3v26h11"/><path d="M9 12h8M9 17h5"/><rect x="14" y="17" width="15" height="12" rx="2.5"/><circle cx="21.5" cy="23" r="3.2"/><path d="m18 17 1.2-1.7h4.6L25 17"/></svg>`,
  servicewerte:`<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="9" cy="8" r="4"/><path d="m12 11 5 5M16 15 7 24l-3 1 1-3 9-9"/><circle cx="24" cy="23" r="4.5"/><path d="M24 16v2M24 28v2M17 23h2M29 23h2M19.2 18.2l1.5 1.5M27.3 26.3l1.5 1.5M28.8 18.2l-1.5 1.5M20.7 26.3l-1.5 1.5"/></svg>`,
  einheitenrechner:`<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 11h20M21 6l5 5-5 5M26 22H6M11 17l-5 5 5 5"/></svg>`,
  wissensdatenbank:`<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 7a5 5 0 0 1 5-5h8v25H8a5 5 0 0 0-5 5Z"/><path d="M29 7a5 5 0 0 0-5-5h-6v25h4"/><path d="M22 25h3l3-3M22 29h6"/><circle cx="21" cy="25" r="1.4"/><circle cx="29" cy="21" r="1.4"/></svg>`
};
function activate(){
  document.querySelectorAll('a.card,a.tool-card').forEach(card=>{
    const href=(card.getAttribute('href')||'').toLowerCase();
    const key=Object.keys(ICONS).find(name=>href.includes(name));
    const box=card.querySelector('.icon');
    if(!key||!box)return;
    box.innerHTML=ICONS[key];
    box.dataset.skIconV2=key;
  });
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',activate,{once:true}):activate();
})();
