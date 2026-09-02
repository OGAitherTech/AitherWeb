/* Aither Web downloads UI v16.5 */
(()=>{
 'use strict';
 const KEY='aither-downloads';
 const read=()=>{try{const v=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(v)?v:[]}catch{return[]}};
 const write=v=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch{}};
 const style=document.createElement('style');
 style.textContent=`
 .downloads-panel{position:fixed;z-index:90;right:10px;top:calc(100px + env(safe-area-inset-top));width:min(440px,calc(100vw - 20px));max-height:min(72dvh,650px);overflow:auto;background:#292a2d;border:1px solid #5f6368;border-radius:14px;box-shadow:0 18px 50px #000b;padding:14px;color:#e8eaed}
 .downloads-panel[hidden]{display:none!important}.downloads-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.downloads-head h2{font-size:18px;margin:0}.downloads-close{border:0;background:transparent;color:#bdc1c6;font-size:22px;width:40px;height:40px;border-radius:50%}.downloads-close:hover{background:#3c4043}
 .download-item{display:grid;grid-template-columns:38px minmax(0,1fr) auto;gap:10px;align-items:center;padding:11px 4px;border-bottom:1px solid #3c4043}.download-icon{width:38px;height:38px;border-radius:9px;display:grid;place-items:center;background:#303134;color:#8ab4f8;font-weight:700}.download-name{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.download-url{font-size:11px;color:#9aa0a6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:3px}.download-actions{display:flex;gap:5px}.download-actions button,.download-toolbar button{border:1px solid #5f6368;background:#303134;color:#e8eaed;border-radius:8px;min-width:40px;min-height:36px;padding:7px 9px}.download-empty{padding:30px 12px;text-align:center;color:#9aa0a6}.download-toolbar{display:flex;gap:7px;margin-top:10px}.download-toolbar button{flex:1}
 @media(max-width:700px){.downloads-panel{inset:0;width:auto;max-height:none;border:0;border-radius:0;padding:calc(12px + env(safe-area-inset-top)) 12px calc(12px + env(safe-area-inset-bottom));background:#202124}.download-item{padding:13px 2px}.download-actions button{min-width:42px;min-height:42px}}
 body.light .downloads-panel{background:#fff;border-color:#dadce0;color:#202124}body.light .download-item{border-color:#dadce0}body.light .download-icon,body.light .download-toolbar button,body.light .download-actions button{background:#f1f3f4;color:#202124;border-color:#dadce0}
 `;
 document.head.appendChild(style);
 const toolbar=document.querySelector('.toolbar');
 if(!toolbar)return;
 let button=document.getElementById('downloadsButton');
 if(!button){button=document.createElement('button');button.className='chrome-btn';button.id='downloadsButton';button.type='button';button.setAttribute('aria-label','Downloads');button.title='Downloads';button.textContent='↓';toolbar.insertBefore(button,document.getElementById('star')||null)}
 const panel=document.createElement('section');
 panel.className='downloads-panel';panel.hidden=true;panel.setAttribute('aria-label','Downloads');
 panel.innerHTML='<div class="downloads-head"><h2>Downloads</h2><button class="downloads-close" type="button" aria-label="Close downloads">×</button></div><div class="downloads-list"></div><div class="download-toolbar"><button type="button" data-clear>Clear downloads</button></div>';
 document.body.appendChild(panel);
 const list=panel.querySelector('.downloads-list');
 const escText=v=>String(v??'');
 function render(){
   const data=read();list.replaceChildren();
   if(!data.length){const e=document.createElement('div');e.className='download-empty';e.textContent='No downloads yet.';list.appendChild(e);return}
   data.forEach((d,i)=>{
     const row=document.createElement('div');row.className='download-item';
     const icon=document.createElement('div');icon.className='download-icon';icon.textContent='↓';
     const info=document.createElement('div');
     const name=document.createElement('div');name.className='download-name';name.textContent=escText(d.name||'Downloaded file');
     const url=document.createElement('div');url.className='download-url';url.textContent=escText(d.url);info.append(name,url);
     const actions=document.createElement('div');actions.className='download-actions';
     const open=document.createElement('button');open.type='button';open.textContent='Open';open.onclick=()=>{try{window.open(d.url,'_blank','noopener,noreferrer')}catch{location.href=d.url}};
     const remove=document.createElement('button');remove.type='button';remove.textContent='×';remove.setAttribute('aria-label','Remove download');remove.onclick=()=>{const x=read();x.splice(i,1);write(x);render()};
     actions.append(open,remove);row.append(icon,info,actions);list.appendChild(row);
   });
 }
 function add(url,name){
   try{const u=new URL(url,location.href);if(!/^https?:$/i.test(u.protocol))return;const clean=u.href;const x=read().filter(d=>d.url!==clean);x.unshift({url:clean,name:name||u.hostname,date:Date.now()});write(x.slice(0,50));render()}catch{}
 }
 function toggle(){panel.hidden=!panel.hidden;if(!panel.hidden){render();panel.querySelector('.downloads-close').focus()}}
 button.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();toggle()});
 panel.querySelector('.downloads-close').addEventListener('click',()=>{panel.hidden=true});
 panel.querySelector('[data-clear]').addEventListener('click',()=>{write([]);render()});
 document.addEventListener('click',e=>{if(!panel.hidden&&!panel.contains(e.target)&&e.target!==button)panel.hidden=true});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)panel.hidden=true});
 window.aitherAddDownload=add;
 // Track links that explicitly represent downloads. The browser still controls the actual file save.
 document.addEventListener('click',e=>{
   const a=e.target.closest?.('a[href]');if(!a||e.defaultPrevented)return;
   const href=a.href||'';const downloadAttr=a.hasAttribute('download');
   const fileLike=/\.(?:zip|pdf|png|jpe?g|gif|webp|svg|mp3|wav|mp4|webm|txt|csv|json|xml|docx?|xlsx?|pptx?|apk|exe|dmg)(?:[?#].*)?$/i.test(href);
   if(downloadAttr||fileLike){add(href,a.getAttribute('download')||a.textContent.trim()||'Downloaded file')}
 });
 render();
})();
