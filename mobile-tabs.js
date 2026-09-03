/* Aither Web mobile tab overview */
(()=>{
  const isMobile=()=>matchMedia('(max-width:700px)').matches;
  const getTabs=()=>[...document.querySelectorAll('#chromeTabs .tab')];
  const sheet=document.createElement('div');
  sheet.className='mobile-tabs-sheet mobile-tab-switcher-hidden';
  sheet.setAttribute('role','dialog');
  sheet.setAttribute('aria-modal','true');
  sheet.setAttribute('aria-label','Open tabs');
  sheet.innerHTML=`<div class="mobile-tabs-backdrop"></div><div class="mobile-tabs-panel"><header class="mobile-tabs-head"><div><span class="mobile-tabs-kicker">AITHER WEB</span><h2>Tabs <span class="mobile-tabs-count"></span></h2></div><button class="mobile-tabs-close" type="button" aria-label="Done">Done</button></header><div class="mobile-tabs-grid"></div><button class="mobile-tabs-new" type="button"><span>+</span><strong>New Tab</strong></button></div>`;

  const button=document.createElement('button');
  button.id='mobileTabButton';
  button.type='button';
  button.setAttribute('aria-label','Show open tabs');
  button.innerHTML='<span class="mobile-tab-count">1</span>';

  const css=document.createElement('style');
  css.textContent=`
.mobile-tab-switcher-hidden{display:none!important}
#mobileTabButton{display:none;position:relative;flex:0 0 36px;width:36px;height:36px;border:1px solid #5f6368;border-radius:10px;background:#303134;color:#e8eaed;align-items:center;justify-content:center;font-size:12px;font-weight:700;touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform .16s ease,background .16s ease}
#mobileTabButton::before,#mobileTabButton::after{content:"";position:absolute;width:14px;height:12px;border:1.5px solid #bdc1c6;border-radius:3px;transform:translate(0,-1px)}
#mobileTabButton::before{transform:translate(-2px,-2px)}#mobileTabButton::after{transform:translate(2px,2px);background:#303134}
#mobileTabButton:active{transform:scale(.92)}#mobileTabButton .mobile-tab-count{position:relative;z-index:2;line-height:1;color:#fff}
.mobile-tabs-sheet{position:fixed;inset:0;z-index:100;overflow:hidden;background:#0f1012;color:#e8eaed;font-family:inherit}
.mobile-tabs-backdrop{position:absolute;inset:0;background:radial-gradient(circle at 50% 0,#2b3038 0,transparent 48%),#0f1012}
.mobile-tabs-panel{position:relative;height:100%;overflow:auto;padding:calc(10px + env(safe-area-inset-top)) 14px calc(16px + env(safe-area-inset-bottom));overscroll-behavior:contain}
.mobile-tabs-head{position:sticky;top:0;z-index:3;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 0 16px;background:linear-gradient(#0f1012 72%,transparent);backdrop-filter:blur(10px)}
.mobile-tabs-kicker{display:block;color:#8ab4f8;font-size:9px;font-weight:800;letter-spacing:.18em;margin-bottom:3px}.mobile-tabs-head h2{margin:0;font-size:28px;letter-spacing:-.03em}.mobile-tabs-count{color:#9aa0a6;font-size:13px;font-weight:500;margin-left:4px}
.mobile-tabs-close{min-height:40px;padding:0 15px;border:1px solid #4b4f55;border-radius:20px;background:#292c31;color:#fff;font-size:14px;font-weight:650;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
.mobile-tabs-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;padding-bottom:4px}
.mobile-tab-card{position:relative;display:flex;flex-direction:column;min-width:0;min-height:176px;border:1px solid #34383e;border-radius:18px;background:linear-gradient(160deg,#25282d,#1b1d20);color:#e8eaed;overflow:hidden;text-align:left;padding:0;box-shadow:0 10px 28px #0005;touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}
.mobile-tab-card:active{transform:scale(.975)}.mobile-tab-card.active{border-color:#8ab4f8;box-shadow:0 0 0 2px #8ab4f822,0 12px 30px #0006}
.mobile-tab-preview{position:relative;height:103px;flex:0 0 103px;display:grid;place-items:center;background:linear-gradient(145deg,#30343b,#17191c);overflow:hidden}
.mobile-tab-preview::before{content:"";position:absolute;width:120px;height:120px;border-radius:50%;background:#8ab4f814;filter:blur(2px);transform:translate(35px,-30px)}
.mobile-tab-preview-icon{position:relative;z-index:1;width:48px;height:48px;border-radius:14px;display:grid;place-items:center;background:#292d33;border:1px solid #4a5058;color:#8ab4f8;font-size:21px;font-weight:800;box-shadow:0 8px 18px #0005}
.mobile-tab-active{position:absolute;top:9px;left:9px;z-index:2;padding:4px 7px;border-radius:8px;background:#8ab4f8;color:#202124;font-size:9px;font-weight:800;letter-spacing:.06em;text-transform:uppercase}
.mobile-tab-info{display:flex;align-items:center;gap:8px;min-width:0;padding:11px 11px 12px}.mobile-tab-favicon{width:25px;height:25px;flex:0 0 25px;border-radius:8px;display:grid;place-items:center;background:#30343a;color:#bdc1c6;font-size:11px;font-weight:800}.mobile-tab-copy{min-width:0;display:grid;gap:3px}.mobile-tab-title{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:13px;font-weight:650}.mobile-tab-host{display:block;color:#9aa0a6;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mobile-tab-x{position:absolute;right:8px;top:8px;z-index:3;width:30px;height:30px;border:1px solid #4b4f55;border-radius:50%;background:#202328e8;color:#fff;font-size:17px;line-height:1;touch-action:manipulation}.mobile-tab-x:active{transform:scale(.9)}
.mobile-tabs-new{width:100%;min-height:52px;margin:14px 0 3px;border:1px solid #4b4f55;border-radius:15px;background:#292c31;color:#fff;display:flex;align-items:center;justify-content:center;gap:8px;font-size:14px;touch-action:manipulation}.mobile-tabs-new span{font-size:23px;line-height:1;font-weight:300}.mobile-tabs-new:active{transform:scale(.985);background:#33373d}
@media(max-width:700px){#mobileTabButton{display:flex}.chrome-tabs{display:none}}
@media(min-width:701px){#mobileTabButton{display:none!important}}
@media(max-width:380px){.mobile-tabs-grid{gap:10px}.mobile-tab-card{min-height:162px}.mobile-tab-preview{height:92px;flex-basis:92px}.mobile-tab-title{font-size:12px}}
body.light .mobile-tabs-sheet{background:#f5f6f8;color:#202124}.light .mobile-tabs-backdrop{background:radial-gradient(circle at 50% 0,#e1e8f4 0,transparent 52%),#f5f6f8}.light .mobile-tabs-head{background:linear-gradient(#f5f6f8 72%,transparent)}.light .mobile-tabs-close,.light .mobile-tabs-new{background:#fff;color:#202124;border-color:#d5d9df}.light .mobile-tab-card{background:linear-gradient(160deg,#fff,#f1f3f6);border-color:#d9dde3;color:#202124;box-shadow:0 8px 22px #0001}.light .mobile-tab-preview{background:linear-gradient(145deg,#eef1f5,#fff)}.light .mobile-tab-preview-icon,.light .mobile-tab-favicon{background:#f1f3f4;border-color:#dadce0}.light .mobile-tab-host{color:#5f6368}.light .mobile-tab-x{background:#fff;color:#202124;border-color:#dadce0}
@media(prefers-reduced-motion:reduce){.mobile-tab-card,#mobileTabButton,.mobile-tabs-new{transition:none}}
`;
  document.head.appendChild(css);
  document.body.appendChild(sheet);

  const grid=sheet.querySelector('.mobile-tabs-grid');
  const count=sheet.querySelector('.mobile-tabs-count');
  const toolbar=document.querySelector('.toolbar');
  const star=document.getElementById('star');
  if(toolbar)toolbar.insertBefore(button,star||null);

  const title=t=>t.querySelector('span:nth-child(2)')?.textContent?.trim()||'Aither Web';
  const getHost=t=>{const page=document.getElementById(t.id+'Page')||document.getElementById(t.id==='aitherTab'?'homePage':'');return page?.querySelector('.webview-toolbar span')?.textContent?.trim()||'Aither Web'};

  function refresh(){
    if(!isMobile())return;
    const all=getTabs();
    button.querySelector('.mobile-tab-count').textContent=all.length;
    count.textContent=`· ${all.length} ${all.length===1?'tab':'tabs'}`;
    grid.replaceChildren();
    all.forEach(t=>{
      const isHome=t.id==='aitherTab';
      const name=title(t);
      const host=getHost(t);
      const card=document.createElement('article');
      card.className='mobile-tab-card'+(t.classList.contains('active')?' active':'');
      card.setAttribute('role','button');card.setAttribute('tabindex','0');
      const preview=document.createElement('div');preview.className='mobile-tab-preview';
      if(t.classList.contains('active')){const badge=document.createElement('span');badge.className='mobile-tab-active';badge.textContent='Active';preview.appendChild(badge)}
      const icon=document.createElement('div');icon.className='mobile-tab-preview-icon';icon.textContent=isHome?'A':'▣';preview.appendChild(icon);card.appendChild(preview);
      const info=document.createElement('div');info.className='mobile-tab-info';
      const fav=document.createElement('span');fav.className='mobile-tab-favicon';fav.textContent=(host.replace(/^www\./,'')[0]||'A').toUpperCase();
      const copy=document.createElement('div');copy.className='mobile-tab-copy';
      const ttl=document.createElement('span');ttl.className='mobile-tab-title';ttl.textContent=name;
      const h=document.createElement('span');h.className='mobile-tab-host';h.textContent=host;
      copy.append(ttl,h);info.append(fav,copy);card.appendChild(info);
      if(!isHome){const close=document.createElement('button');close.className='mobile-tab-x';close.type='button';close.setAttribute('aria-label',`Close ${name}`);close.textContent='×';close.addEventListener('click',e=>{e.stopPropagation();t.querySelector('.tab-x')?.click();setTimeout(refresh,40)});card.appendChild(close)}
      const select=()=>{t.click();close()};
      card.addEventListener('click',e=>{if(e.target.closest('.mobile-tab-x'))return;select()});
      card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select()}});
      grid.appendChild(card);
    });
  }

  function open(){if(!isMobile())return;refresh();sheet.classList.remove('mobile-tab-switcher-hidden');document.body.style.overflow='hidden';sheet.querySelector('.mobile-tabs-close').focus()}
  function close(){sheet.classList.add('mobile-tab-switcher-hidden');document.body.style.overflow='';if(isMobile())button.focus()}

  button.addEventListener('click',open);
  sheet.querySelector('.mobile-tabs-close').addEventListener('click',close);
  sheet.querySelector('.mobile-tabs-new').addEventListener('click',()=>{document.getElementById('newTab')?.click();close()});
  sheet.querySelector('.mobile-tabs-backdrop').addEventListener('click',close);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!sheet.classList.contains('mobile-tab-switcher-hidden'))close()});
  const chromeTabs=document.getElementById('chromeTabs');
  if(chromeTabs)new MutationObserver(()=>{if(!sheet.classList.contains('mobile-tab-switcher-hidden'))refresh()}).observe(chromeTabs,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
  addEventListener('resize',()=>{if(!isMobile())close();else refresh()});
  refresh();
})();