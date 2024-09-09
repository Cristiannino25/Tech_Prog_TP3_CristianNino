const CACHE_NAME = "static-cache-v32";

const FILES_TO_CACHE = [
  "offline.html",
  "style/css/style.css",
  "js/script.js",
  "js/install.js",
  "medias/images/offline.webp",
  "https://cdn.tailwindcss.com",
];

self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Pre-caching offline page");
      return cache.addAll(FILES_TO_CACHE);
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
