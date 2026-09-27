(()=>{'use strict';
const SERVICE_PATTERN=/(servicewerte|initial[- ]?pins?|initialwerte)/i;
const originalFetch=window.fetch.bind(window);
window.fetch=async(...args)=>{
  const response=await originalFetch(...args);
  const url=String(args[0]?.url||args[0]||'');
  if(!/search-index\.json(?:\?|$)/i.test(url)||!response.ok)return response;
  try{
    const data=await response.clone().json();
    if(!Array.isArray(data))return response;
    const cleaned=data.filter(item=>!SERVICE_PATTERN.test(JSON.stringify(item)));
    const headers=new Headers(response.headers);headers.delete('content-length');headers.set('content-type','application/json; charset=utf-8');
    return new Response(JSON.stringify(cleaned),{status:response.status,statusText:response.statusText,headers});
  }catch{return response}
};
})();
