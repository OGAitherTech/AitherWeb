const $=id=>document.getElementById(id);
const defaults=[
 {name:'GitHub',url:'https://github.com',icon:'⌘'},
 {name:'YouTube',url:'https://youtube.com',icon:'▶'},
 {name:'Google',url:'https://google.com',icon:'G'},
 {name:'Wikipedia',url:'https://wikipedia.org',icon:'W'},
 {name:'Reddit',url:'https://reddit.com',icon:'R'},
 {name:'ChatGPT',url:'https://chatgpt.com',icon:'✦'}
];
const get=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}};
let bookmarks=get('aither-bookmarks',defaults), history=get('aither-history',[]), settings=get('aither-settings',{theme:'system',engine:'google',newTab:false});
settings.engine='google';

function engineUrl(q){return `https://www.google.com/search?q=${encodeURIComponent(q)}`}
function addHistory(text,url,type='Visit'){
  history.unshift({text,url,time:Date.now(),type});
  history=history.slice(0,100);
  localStorage.setItem('aither-history',JSON.stringify(history));
}
function navigate(raw){
  const q=raw.trim(); if(!q)return;
  const url=/^(https?:\/\/|[a-z]+:\/\/)/i.test(q)?q:(q.includes('.')&&!q.includes(' ')?'https://'+q:engineUrl(q));
  addHistory(q,url,q===url?'Visit':'Google Search');
  settings.newTab?window.open(url,'_blank','noopener'):location.href=url;
}
function renderQuick(){const grid=$('quickGrid');grid.innerHTML='';bookmarks.slice(0,12).forEach(b=>{const el=document.createElement('button');el.className='quick-card';el.innerHTML=`<span class="site-icon">${b.icon||'•'}</span><span><strong>${escapeHtml(b.name)}</strong><br><small>${new URL(b.url).hostname}</small></span>`;el.onclick=()=>navigate(b.url);grid.appendChild(el)});}
function renderBookmarks(){const box=$('bookmarkList');box.innerHTML='';if(!bookmarks.length){box.innerHTML='<p class="muted">No bookmarks yet. Add one from the Home screen.</p>';return}bookmarks.forEach((b,i)=>{const row=document.createElement('div');row.className='bookmark-row';row.innerHTML=`<span>${b.icon||'•'}</span><a href="${escapeAttr(b.url)}">${escapeHtml(b.name)}</a><small>${escapeHtml(new URL(b.url).hostname)}</small><button aria-label="Remove bookmark">×</button>`;row.querySelector('button').onclick=()=>{bookmarks.splice(i,1);save();renderAll()};box.appendChild(row)});}
function renderHistory(){const box=$('historyList');box.innerHTML='';if(!history.length){box.innerHTML='<p class="muted">No browsing history yet.</p>';return}history.forEach(h=>{const row=document.createElement('div');row.className='history-row';row.innerHTML=`<span>◷</span><span style="flex:1"><strong>${escapeHtml(h.text)}</strong><br><small>${escapeHtml(h.type||'Visit')}</small></span><small>${new Date(h.time).toLocaleString()}</small>`;row.onclick=()=>navigate(h.url);box.appendChild(row)});}
function save(){localStorage.setItem('aither-bookmarks',JSON.stringify(bookmarks));localStorage.setItem('aither-settings',JSON.stringify(settings))}
function renderAll(){renderQuick();renderBookmarks();renderHistory()}
function escapeHtml(s){return String(s).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]))}function escapeAttr(s){return escapeHtml(s)}
function applyTheme(){document.body.classList.toggle('light',settings.theme==='light'||(settings.theme==='system'&&matchMedia('(prefers-color-scheme:light)').matches));$('themeSelect').value=settings.theme;$('engineSelect').value='google';$('newTabToggle').checked=settings.newTab}
function showToast(t){const x=$('toast');x.textContent=t;x.classList.add('show');setTimeout(()=>x.classList.remove('show'),1800)}
function view(name){document.querySelectorAll('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.view===name));['home','bookmarks','history'].forEach(v=>$(`${v}View`).classList.toggle('hidden',v!==name));$('sidebar').classList.remove('open')}

$('searchInput').placeholder='Search with Google';
$('searchForm').onsubmit=e=>{e.preventDefault();navigate($('searchInput').value)};
$('goBtn').onclick=()=>navigate($('addressInput').value);
$('addressInput').onkeydown=e=>{if(e.key==='Enter')navigate(e.target.value)};
$('menuBtn').onclick=()=>$('sidebar').classList.toggle('open');
$('themeBtn').onclick=()=>{settings.theme=document.body.classList.contains('light')?'dark':'light';save();applyTheme()};
document.querySelectorAll('.nav-item[data-view]').forEach(b=>b.onclick=()=>view(b.dataset.view));
$('settingsBtn').onclick=()=>{$('settingsModal').classList.remove('hidden');applyTheme()};
$('closeSettings').onclick=()=>$('settingsModal').classList.add('hidden');
$('settingsModal').onclick=e=>{if(e.target===$('settingsModal'))$('settingsModal').classList.add('hidden')};
$('themeSelect').onchange=e=>{settings.theme=e.target.value;save();applyTheme()};
$('engineSelect').onchange=()=>{settings.engine='google';save();applyTheme();showToast('Google is the search engine')};
$('newTabToggle').onchange=e=>{settings.newTab=e.target.checked;save()};
$('clearHistory').onclick=()=>{history=[];localStorage.setItem('aither-history','[]');renderHistory();showToast('History cleared')};
$('addBookmark').onclick=()=>{const name=prompt('Bookmark name');if(!name)return;const url=prompt('Website URL','https://');if(!url)return;try{const parsed=new URL(url);bookmarks.push({name,url:parsed.href,icon:name[0].toUpperCase()});save();renderAll();showToast('Bookmark added')}catch{showToast('Please enter a valid URL')}};
$('resetApp').onclick=()=>{if(confirm('Reset bookmarks, history, and settings?')){localStorage.clear();location.reload()}};
matchMedia('(prefers-color-scheme:light)').addEventListener('change',()=>{if(settings.theme==='system')applyTheme()});
renderAll();applyTheme();
