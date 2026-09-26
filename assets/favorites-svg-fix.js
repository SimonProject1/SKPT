(()=>{'use strict';
const STAR_PATH='M12 2.75l2.82 5.72 6.31.92-4.57 4.45 1.08 6.29L12 17.16l-5.64 2.97 1.08-6.29-4.57-4.45 6.31-.92L12 2.75z';
function starSvg(active=false){
  return `<svg class="sk-star-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${STAR_PATH}"${active?' class="sk-star-fill"':''}></path></svg>`;
}
function centerStars(){
  document.querySelectorAll('.sk-favorite-button').forEach(button=>{
    const active=button.classList.contains('active')||button.dataset.active==='true';
    const expected=active?'true':'false';
    if(button.dataset.svgActive!==expected){
      button.innerHTML=starSvg(active);
      button.dataset.svgActive=expected;
    }
  });
  document.querySelectorAll('.sk-trigger-star').forEach(star=>{
    if(!star.querySelector('svg'))star.innerHTML=starSvg(true);
  });
  document.querySelectorAll('.sk-favorite-remove').forEach(button=>{
    if(!button.querySelector('svg'))button.innerHTML=starSvg(true);
  });
}
function init(){
  centerStars();
  document.addEventListener('click',event=>{
    if(event.target.closest('.sk-favorite-button,.sk-favorite-remove,.sk-favorites-trigger')){
      requestAnimationFrame(centerStars);
      setTimeout(centerStars,30);
    }
  });
  setTimeout(centerStars,150);
  setTimeout(centerStars,600);
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
})();
