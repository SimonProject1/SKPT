const APP_VERSION='1.4.0';
function $(id){return document.getElementById(id)}
function num(v){return Number.parseFloat(String(v).replace(',','.'))}
function de(v,d=3){return Number.isFinite(v)?v.toLocaleString('de-DE',{minimumFractionDigits:d,maximumFractionDigits:d}):'–'}

function projectBase(){
  const modules=['analogsignal','pf-rechner','pt-rechner','einheitenrechner','messstellen-doku','servicewerte','wissensdatenbank'];
  const path=location.pathname;
  const hits=modules.map(name=>path.indexOf('/'+name+'/')).filter(index=>index>=0);
  return hits.length?path.slice(0,Math.min(...hits)+1):(path.endsWith('/')?path:path.slice(0,path.lastIndexOf('/')+1));
}

function configureLogos(){
  const base=projectBase();
  document.querySelectorAll('.topbar .logo').forEach(image=>{
    image.src=base+'assets/icon-512.png';
    image.alt='SK PLT Tools Icon';
  });
  document.querySelectorAll('.hero > img,.hero-logo img').forEach(image=>{
    image.src=base+'assets/logo.png';
    image.alt='SK PLT Tools Hauptlogo';
  });
}

function signInputs(){
  document.querySelectorAll('input[type=number]').forEach(input=>{
    if(input.dataset.s)return;
    input.dataset.s=1;
    const wrapper=document.createElement('div');
    wrapper.className='number';
    input.parentNode.insertBefore(wrapper,input);
    wrapper.append(input);
    const button=document.createElement('button');
    button.type='button';
    button.className='sign';
    button.textContent='±';
    button.setAttribute('aria-label','Vorzeichen wechseln');
    button.onclick=()=>{
      const value=num(input.value);
      input.value=Number.isFinite(value)?(value===0?0:-value):'-';
      input.dispatchEvent(new Event('input',{bubbles:true}));
      input.dispatchEvent(new Event('change',{bubbles:true}));
    };
    wrapper.append(button);
  });
}

function support(){
  const host=document.querySelector('main');
  if(!host||document.querySelector('.support'))return;
  const section=document.createElement('section');
  section.className='panel support';
  section.innerHTML='<div><b>Fehler gefunden oder eine Idee?</b><div class="muted">Feedback direkt an Simon Kiesler senden.</div></div><button class="primary" id="supportBtn">✉ Support & Feedback</button>';
  host.append(section);
  $('supportBtn').onclick=()=>{
    const name=prompt('Name:')||'';
    const email=prompt('E-Mail-Adresse:')||'';
    const message=prompt('Beschreibung:')||'';
    if(!name||!email||!message)return;
    location.href=`mailto:simon.kiesler@bayer.com?subject=${encodeURIComponent('SK PLT Tools '+APP_VERSION+' - Support')}&body=${encodeURIComponent('Name: '+name+'\nE-Mail: '+email+'\nSeite: '+document.title+'\nVersion: '+APP_VERSION+'\n\n'+message)}`;
  };
}

const CARD_CATEGORIES={
  'analogsignal':'RECHNER',
  'pf-rechner':'RECHNER',
  'pt-rechner':'RECHNER',
  'messstellen-doku':'DOKUMENTATION',
  'servicewerte':'SERVICE',
  'einheitenrechner':'RECHNER',
  'wissensdatenbank':'WISSEN'
};

function activateCleanCards(){
  if(!document.getElementById('sk-clean-card-style')){
    const style=document.createElement('style');
    style.id='sk-clean-card-style';
    style.textContent=`
      .tools{align-items:stretch}
      .tools .card,.start-tools .tool-card{
        position:relative!important;
        overflow:hidden!important;
        padding-top:24px!important;
        border-color:#24485d!important;
        background:linear-gradient(145deg,#0a2639,#071d2d)!important;
        transition:border-color .18s ease,transform .18s ease,background .18s ease!important;
      }
      .tools .card::before,.start-tools .tool-card::before{
        content:'';
        position:absolute;
        left:0;right:0;top:0;
        height:3px;
        background:linear-gradient(90deg,#00b7e8 0%,#42d8bf 52%,#89d329 100%);
        opacity:.88;
      }
      .tools .card:hover,.start-tools .tool-card:hover{
        border-color:#00b7e8!important;
        background:linear-gradient(145deg,#0d2c42,#082131)!important;
        transform:translateY(-2px);
      }
      .tools .card .icon,.start-tools .tool-card .icon{display:none!important}
      .sk-card-category{
        display:block;
        margin:0 0 18px;
        color:#89d329;
        font-size:11px;
        line-height:1;
        font-weight:900;
        letter-spacing:1.6px;
        text-transform:uppercase;
      }
      .tools .card h2,.tools .card h3,.start-tools .tool-card h2,.start-tools .tool-card h3{
        margin-top:0!important;
        font-size:clamp(24px,2vw,31px)!important;
        line-height:1.15!important;
      }
      .tools .card p,.start-tools .tool-card p{margin-top:20px!important}
      .tools .card .open,.start-tools .tool-card .open{margin-top:30px!important}
      @media(max-width:760px){
        .tools .card,.start-tools .tool-card{padding-top:21px!important}
        .sk-card-category{margin-bottom:15px;font-size:10px}
        .tools .card h2,.tools .card h3,.start-tools .tool-card h2,.start-tools .tool-card h3{font-size:25px!important}
      }
    `;
    document.head.append(style);
  }

  document.querySelectorAll('a.card,a.tool-card').forEach(card=>{
    const href=(card.getAttribute('href')||'').toLowerCase();
    const folder=Object.keys(CARD_CATEGORIES).find(name=>href.includes(name));
    if(!folder)return;
    card.querySelector('.icon')?.remove();
    let category=card.querySelector('.sk-card-category');
    if(!category){
      category=document.createElement('div');
      category.className='sk-card-category';
      const heading=card.querySelector('h2,h3');
      heading?card.insertBefore(category,heading):card.prepend(category);
    }
    category.textContent=CARD_CATEGORIES[folder];
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  configureLogos();
  activateCleanCards();
  signInputs();
  support();
  if('serviceWorker' in navigator)navigator.serviceWorker.register(projectBase()+'service-worker.js');
});
