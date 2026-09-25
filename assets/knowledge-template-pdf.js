(()=>{'use strict';
function isKnowledgeIndex(){const path=location.pathname.replace(/\/+$/,'');return path.endsWith('/wissensdatenbank')||path.endsWith('/wissensdatenbank/index.html')}
function update(){
  if(!isKnowledgeIndex())return;
  const links=[...document.querySelectorAll('a[href]')];
  let link=links.find(element=>/Wissensdatenbank_Beitragsvorlage\.(?:docx|pdf)$/i.test(element.getAttribute('href')||''));
  if(!link){
    link=links.find(element=>/vorlage herunterladen|wissensbeitrag vorschlagen/i.test(element.textContent||''));
  }
  if(!link)return;
  link.href='vorlagen/Wissensdatenbank_Beitragsvorlage.pdf';
  link.setAttribute('download','Wissensdatenbank_Beitragsvorlage.pdf');
  const heading=link.querySelector('h1,h2,h3');
  if(heading)heading.textContent='Neuen Wissensbeitrag vorschlagen';
  const description=link.querySelector('p');
  if(description)description.textContent='Editierbare PDF herunterladen, direkt ausfüllen und zusammen mit den Anhängen an Simon Kiesler senden.';
  const open=link.querySelector('.open');
  if(open)open.textContent='Editierbare PDF herunterladen ↓';
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',update,{once:true}):update();
})();
