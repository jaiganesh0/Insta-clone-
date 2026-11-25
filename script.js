// Instagram clone - vanilla JS (front-end only; posts live in memory until refresh)
const G = ['linear-gradient(135deg,#ff9a5a,#d6246e)', 'linear-gradient(135deg,#17a8cf,#27358f)', 'linear-gradient(135deg,#8fd694,#1f6b3a)', 'linear-gradient(135deg,#f6d365,#fda085)', 'linear-gradient(135deg,#a18cd1,#fbc2eb)'];
const posts = [
 { u: 'travel.diaries', cap: 'Chasing sunrises.', img: G[0], likes: 128, liked: false, c: [['mira', 'Stunning!']] },
 { u: 'foodie.corner', cap: 'Sunday brunch done right.', img: G[3], likes: 86, liked: false, c: [] },
 { u: 'code.with.sam', cap: 'Shipped my first project today.', img: G[1], likes: 203, liked: false, c: [['dev_anna', 'Congrats!'], ['kiran', 'Well done']] },
 { u: 'green.life', cap: 'Into the woods.', img: G[2], likes: 54, liked: false, c: [] }];
const $ = id => document.getElementById(id), esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const col = u => G[u.length % G.length];
$('stories').innerHTML = ['your.story', ...new Set(posts.map(p => p.u))].map(u => `<div class="story"><div class="ring"><span style="background:${col(u)}">${u[0].toUpperCase()}</span></div>${esc(u.slice(0, 9))}</div>`).join('');
function render() {
  $('feed').innerHTML = posts.map((p, i) => `<article class="post"><div class="ph"><span class="av" style="background:${col(p.u)}">${esc(p.u[0].toUpperCase())}</span><b>${esc(p.u)}</b></div>
   <div class="img" data-i="${i}" style="background-image:${p.img.startsWith('data:') ? `url(${p.img})` : p.img}" role="img" aria-label="Photo by ${esc(p.u)}. Double click to like.">${p.img.startsWith('data:') ? '' : esc(p.u[0].toUpperCase())}<span class="heart" aria-hidden="true">♥</span></div>
   <div class="pb"><div class="acts"><button class="like ${p.liked ? 'on' : ''}" data-i="${i}" aria-pressed="${p.liked}" aria-label="Like">${p.liked ? '♥' : '♡'}</button></div>
   <p><b>${p.likes} likes</b></p><p><b>${esc(p.u)}</b> ${esc(p.cap)}</p>${p.c.map(c => `<p class="cm"><b>${esc(c[0])}</b> ${esc(c[1])}</p>`).join('')}</div>
   <div class="cf"><input class="cin" data-i="${i}" placeholder="Add a comment" aria-label="Add a comment"><button class="cpost" data-i="${i}">Post</button></div></article>`).join('');
}
const toggle = i => { const p = posts[i]; p.liked = !p.liked; p.likes += p.liked ? 1 : -1; render(); };
$('feed').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const i = +b.dataset.i;
  if (b.classList.contains('like')) toggle(i);
  if (b.classList.contains('cpost')) { const inp = b.parentElement.querySelector('.cin'), t = inp.value.trim(); if (t) { posts[i].c.push(['you', t]); render(); } } });
$('feed').addEventListener('dblclick', e => { const im = e.target.closest('.img'); if (!im) return; const i = +im.dataset.i; if (!posts[i].liked) toggle(i); const h = $('feed').querySelectorAll('.heart')[i]; h.classList.add('pop'); setTimeout(() => h.classList.remove('pop'), 600); });
$('new').addEventListener('submit', e => { e.preventDefault(); const f = $('photo').files[0]; if (!f) return; const r = new FileReader();
  r.onload = () => { posts.unshift({ u: 'you', cap: $('cap').value || '', img: r.result, likes: 0, liked: false, c: [] }); $('new').reset(); render(); }; r.readAsDataURL(f); });
render();
