const CACHE_NAME = "static-cache-v29";

const FILES_TO_CACHE = "offline.html";

const urlTochache = [FILES_TO_CACHE, "style/css/style.css"];

self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Pre-caching offline page");
      return cache.addAll(urlTochache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  console.log("[ServiceWorker] Activate");
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
  console.log("[ServiceWorker] Fetch", evt.request.url);

  if (evt.request.mode === "navigate") {
    evt.respondWith(
      fetch(evt.request).catch(() => {
        return caches.match("offline.html");
      })
    );
  }
});
