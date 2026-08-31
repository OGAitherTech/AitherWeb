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
let bookmarks=get('aither-bookmarks',defaults), history=get('aither-history',[]), settings=get('aither-settings',{theme:'system',engine:'duckduckgo',newTab:false});

function engineUrl(q){const e=settings.engine;return e==='google'?`https://www.google.com/search?q=${encodeURIComponent(q)}`:e==='bing'?`https://www.bing.com/search?q=${encodeURIComponent(q)}`:`https://duckduckgo.com/?q=${encodeURIComponent(q)}`}
function navigate(raw){let q=raw.trim();if(!q)return;let url=/^(https?:\/\/|[a-z]+:\/\/)/i.test(q)?q:(q.includes('.')&&!q.includes(' ')?'https://'+q:engineUrl(q));history.unshift({text:q,url,time:Date.now()});history=history.slice(0,40);localStorage.setItem('aither-history',JSON.stringify(history));settings.newTab?window.open(url,'_blank','noopener'):location.href=url}
function renderQuick(){const grid=$('quickGrid');grid.innerHTML='';bookmarks.slice(0,12).forEach((b,i)=>{const el=document.createElement('button');el.className='quick-card';el.innerHTML=`<span class="site-icon">${b.icon||'•'}</span><span><strong>${escapeHtml(b.name)}</strong><br><small>${new URL(b.url).hostname}</small></span>`;el.onclick=()=>navigate(b.url);grid.appendChild(el)});}
function renderBookmarks(){const box=$('bookmarkList');box.innerHTML='';if(!bookmarks.length){box.innerHTML='<p class="muted">No bookmarks yet. Add one from the Home screen.</p>';return}bookmarks.forEach((b,i)=>{const row=document.createElement('div');row.className='bookmark-row';row.innerHTML=`<span>${b.icon||'•'}</span><a href="${escapeAttr(b.url)}">${escapeHtml(b.name)}</a><small>${escapeHtml(new URL(b.url).hostname)}</small><button aria-label="Remove bookmark">×</button>`;row.querySelector('button').onclick=()=>{bookmarks.splice(i,1);save();renderAll()};box.appendChild(row)});}
function renderHistory(){const box=$('historyList');box.innerHTML='';if(!history.length){box.innerHTML='<p class="muted">Nothing here yet.</p>';return}history.forEach(h=>{const row=document.createElement('div');row.className='history-row';row.innerHTML=`<span>◷</span><span style="flex:1">${escapeHtml(h.text)}</span><small>${new Date(h.time).toLocaleString()}</small>`;row.onclick=()=>navigate(h.url);box.appendChild(row)});}
function save(){localStorage.setItem('aither-bookmarks',JSON.stringify(bookmarks));localStorage.setItem('aither-settings',JSON.stringify(settings))}
function renderAll(){renderQuick();renderBookmarks();renderHistory()}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}function escapeAttr(s){return escapeHtml(s)}
function applyTheme(){document.body.classList.toggle('light',settings.theme==='light'||(settings.theme==='system'&&matchMedia('(prefers-color-scheme:light)').matches));$('themeSelect').value=settings.theme;$('engineSelect').value=settings.engine;$('newTabToggle').checked=settings.newTab}
function showToast(t){const x=$('toast');x.textContent=t;x.classList.add('show');setTimeout(()=>x.classList.remove('show'),1800)}
function view(name){document.querySelectorAll('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.view===name));['home','bookmarks','history'].forEach(v=>$(`${v}View`).classList.toggle('hidden',v!==name));$('sidebar').classList.remove('open')}

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
$('engineSelect').onchange=e=>{settings.engine=e.target.value;save();showToast('Search engine updated')};
$('newTabToggle').onchange=e=>{settings.newTab=e.target.checked;save()};
$('clearHistory').onclick=()=>{history=[];localStorage.setItem('aither-history','[]');renderHistory();showToast('History cleared')};
$('addBookmark').onclick=()=>{const name=prompt('Bookmark name');if(!name)return;const url=prompt('Website URL','https://');if(!url)return;try{const parsed=new URL(url);bookmarks.push({name,url:parsed.href,icon:name[0].toUpperCase()});save();renderAll();showToast('Bookmark added')}catch{showToast('Please enter a valid URL')}};
$('resetApp').onclick=()=>{if(confirm('Reset bookmarks, history, and settings?')){localStorage.clear();location.reload()}};
matchMedia('(prefers-color-scheme:light)').addEventListener('change',()=>{if(settings.theme==='system')applyTheme()});
renderAll();applyTheme();
