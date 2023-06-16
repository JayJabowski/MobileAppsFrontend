console.log("service worker read");

let cacheVersion = 0;
let offlineQueue = []

//SW installation
self.addEventListener('install', e =>
  e.waitUntil(
    caches.open(cacheVersion)
    .then(cache => {
      return cache.addAll([ '/', 'index.html']);
    })
  )
);

//Sync -- not working rn
self.addEventListener("online", (e) => {
  //or use online?
  console.log("back online!");
  console.dir(e);
});

// fetch from network
const getFromNetwork = (request, timeout) =>

  new Promise((resolve, reject) => {

    //save id of timeout
    const timeoutId = setTimeout(reject, timeout);
    fetch(request, {cache: "no-store"}).then(response => {

      //remove timeout if request was successful
      clearTimeout(timeoutId);

      resolve(response);
      addToCache(request);
    }, reject);
  });

// fetch the resource from the browser cache
const getLocally = (request) =>
  caches
    .open(cacheVersion)
    .then(cache =>
      cache
        .match(request)
    );

const addToCache = (request) =>
  caches
    .open(cacheVersion)
    .then(cache =>
      fetch(request).then(response => cache.put(request, response))
    );

self.addEventListener('fetch', e => {
  e.respondWith(
    getFromNetwork(e.request, 10000).catch((err) => {
      console.dir(err);
      getLocally(e.request);
    })
  );
  e.waitUntil(addToCache(e.request));
});


