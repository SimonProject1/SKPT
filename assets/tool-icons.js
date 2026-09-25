(()=>{'use strict';
const ICONS={
  'analogsignal':'analog',
  'pf-rechner':'pf',
  'pt-rechner':'pt',
  'messstellen-doku':'documentation',
  'servicewerte':'service',
  'einheitenrechner':'units',
  'wissensdatenbank':'knowledge'
};
const SVG={
analog:'<path d="M4 19V5M4 19h16"/><path d="m6.5 16 4.5-4.5 3 1.5 4-5"/><circle cx="11" cy="11.5" r="1.6"/><circle cx="18" cy="8" r="1.6"/>',
pf:'<path d="M4 19V5M4 19h16"/><path d="m6.5 16 4-4 3 1.5 4.5-6"/><circle cx="10.5" cy="12" r="1.4"/><path d="M16.5 12v5M19.5 12l-3 2.6 3 2.4"/>',
pt:'<path d="M7 14.7V5a3 3 0 0 1 6 0v9.7a5 5 0 1 1-6 0Z"/><path d="M10 7v9"/><path d="M16.5 17.5c0-2.2 1.3-3.5 3-3.5s3 1.3 3 3.5c0 1.7-.8 2.8-1.8 3.5M18.3 21h3.5"/>',
documentation:'<path d="M5 3h9l4 4v5M14 3v5h5"/><path d="M5 3v18h7"/><path d="M8 9h5M8 13h3"/><rect x="11" y="13" width="10" height="8" rx="2"/><circle cx="16" cy="17" r="2.2"/><path d="m14 13 .8-1h2.4l.8 1"/>',
service:'<circle cx="8" cy="7" r="3"/><path d="m10 9 4 4M13 12l-6.5 6.5L4 20l1.5-2.5L12 11"/><circle cx="18" cy="17" r="3.4"/><path d="M18 11.8v1.8M18 20.4v1.8M12.8 17h1.8M21.4 17h1.8M14.3 13.3l1.3 1.3M20.4 19.4l1.3 1.3M21.7 13.3l-1.3 1.3M15.6 19.4l-1.3 1.3"/>',
units:'<path d="M4 8h14M15 5l3 3-3 3M20 16H6M9 13l-3 3 3 3"/>',
knowledge:'<path d="M3 5.5A3.5 3.5 0 0 1 6.5 2H11v17H6.5A3.5 3.5 0 0 0 3 22Z"/><path d="M21 5.5A3.5 3.5 0 0 0 17.5 2H13v17h3"/><path d="M16 18h2.5l2-2M16 21h4.5"/><circle cx="15" cy="18" r="1"/><circle cx="21" cy="15" r="1"/>'};
function apply(){document.querySelectorAll('a.tool-card,a.card').forEach(card=>{const href=(card.getAttribute('href')||'').toLowerCase();const key=Object.keys(ICONS).find(folder=>href.includes(folder));const box=card.querySelector('.icon');if(!key||!box)return;const name=ICONS[key];box.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${SVG[name]}</svg>`;box.dataset.skIcon=name})}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',apply,{once:true}):apply();
})();
