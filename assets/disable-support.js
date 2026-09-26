(()=>{'use strict';
function removeSupport(){
  document.querySelectorAll('.support,#supportBtn,[data-support],a[href^="mailto:"]').forEach(element=>{
    const text=(element.textContent||'').toLocaleLowerCase('de-DE');
    const href=(element.getAttribute?.('href')||'').toLocaleLowerCase('de-DE');
    if(element.classList?.contains('support')||element.id==='supportBtn'||text.includes('support')||text.includes('feedback')||href.includes('simon.kiesler')){
      (element.closest?.('.support')||element).remove();
    }
  });
}
function run(){removeSupport();setTimeout(removeSupport,100);setTimeout(removeSupport,500)}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run,{once:true}):run();
})();
