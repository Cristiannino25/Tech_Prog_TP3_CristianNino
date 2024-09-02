///Update cache names any time any of the cached files change.
const CACHE_NAME = "static-cache-v26";

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
  //Gestion de l'évènement fetch
  if (evt.request.mode !== "navigate") {
    // Not a page navigation, bail.
    return;
  }
  evt.respondWith(
    fetch(evt.request) // on tente de récupérer la ressource
      .catch(() => {
        return caches
          .open(CACHE_NAME) // si échec , on renvoie la page offlione
          .then((cache) => {
            return cache.match("offline.html ");
          });
      })
  );
});
