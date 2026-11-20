const V='hisab-v7';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png']).catch(()=>{})))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// network first, cache fallback. API calls (sync) are never intercepted or cached.
self.addEventListener('fetch',e=>{const r=e.request; const u=new URL(r.url);
 if(r.method!=='GET'||u.origin!==location.origin||u.pathname.indexOf('/api/')===0) return;
 e.respondWith(fetch(r).then(res=>{const cp=res.clone(); caches.open(V).then(c=>c.put(r,cp)).catch(()=>{}); return res;}).catch(()=>caches.match(r).then(x=>x||caches.match('./index.html'))));});
