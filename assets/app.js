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
  document.querySelectorAll('.hero > img, .hero-logo img').forEach(image=>{
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

document.addEventListener('DOMContentLoaded',()=>{
  configureLogos();
  signInputs();
  support();
  if('serviceWorker' in navigator)navigator.serviceWorker.register(projectBase()+'service-worker.js');
});
