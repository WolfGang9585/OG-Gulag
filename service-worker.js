const CACHE="thegulag-v1";
const ASSETS=["/front-end.html","/manifest.json","/icon-192.png","/icon-512.png","/store.html","/topup.html","/favicon-32.png","/favicon-16.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))))});
self.addEventListener("fetch",e=>{ if(e.request.method!=="GET") return; e.respondWith(caches.match(e.request).then(h=>h||fetch(e.request))); });
