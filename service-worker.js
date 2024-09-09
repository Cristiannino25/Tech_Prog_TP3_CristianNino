const CACHE_NAME = "static-cache-v30";

const FILES_TO_CACHE = [
  "/offline.html",
  "/style/css/style.css",
  "/js/script.js",
  "/js/install.js",
  "/medias/images/offline.webp",
  "https://cdn.tailwindcss.com",
];

// Installation du service worker
self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Pre-caching offline page and other assets");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activation du service worker
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

// Gestion des requêtes
self.addEventListener("fetch", (evt) => {
  console.log("[ServiceWorker] Fetch", evt.request.url);

  // Gestion des requêtes pour les pages HTML (naviguer)
  if (evt.request.mode === "navigate") {
    evt.respondWith(
      fetch(evt.request).catch(() => {
        return caches.match("/offline.html");
      })
    );
  } else {
    // Pour les autres requêtes (CSS, JS, images, etc.)
    evt.respondWith(
      caches
        .match(evt.request)
        .then((response) => {
          return (
            response ||
            fetch(evt.request).then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                let responseClone = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(evt.request, responseClone);
                });
              }
              return networkResponse;
            })
          );
        })
        .catch(() => {
          if (evt.request.mode === "navigate") {
            return caches.match("/offline.html");
          }
        })
    );
  }
});
