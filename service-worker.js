///Update cache names any time any of the cached files change.
const CACHE_NAME = "static-cache-v23";

//Add list of files to cache here.
const FILES_TO_CACHE = [
  "offline.html",
  "style/sass/style.scss",
  "style/css/style.css",
  "js/script.js",
  "medias/images/offline.webp",
];

// INSTALLATION
self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");
  // MISE EN CACHE
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Pre-caching offline page");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

//ACTIVATION
self.addEventListener("activate", (evt) => {
  console.log("[ServiceWorker] Activate");
  //Remove previous cached data from disk.
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
//ACCÈS À UNE RESSOURCE
self.addEventListener("fetch", (evt) => {
  console.log("[ServiceWorker] Fetch", evt.request.url);
  if (evt.request.mode !== "navigate") {
    return;
  }
  evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request.url).then((response) => {
        if (response) {
          return response;
        }
        return fetch(evt.request);
      });
    })
  );
});
