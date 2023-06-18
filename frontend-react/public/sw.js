console.log("service worker read");

let cacheVersion = 0;
let offlineQueue = []

//SW installation
self.addEventListener("install", (e) => {
  e.waitUntil(addResourcesToCache(["/", "/index.html"]));
});

//Caching
self.addEventListener('fetch', e => {
    if(!navigator.onLine){
        
    }
    e.respondWith(
        getResource(e.request)
    )
})

//Sync -- not working rn
self.addEventListener("online", (e) => {
    //or use online?
    
    console.dir(e);

     while(offlineQueue.length){
        const request = offlineQueue.pop();
        const response = fetch(request);
     }
    }
    )


const addResourcesToCache = async (resources) => {
  const cache = await caches.open("" + cacheVersion);
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open("" + cacheVersion);
  await cache.add(request);
};

const addToOfflineQueue = (request) => {
  offlineQueue.push(request);
};

const getResource = async (request) => {
  try {
    const responseFromNetwork = await fetch(request, {cache: "reload"});

    if(request.method != "POST"){
      putInCache(request, responseFromNetwork.clone());
    }

    return responseFromNetwork;
  } catch (err) {
    const responseFromCache = await caches.match(request.url);
    
    return responseFromCache || new Response("Network Error", {
        status: 408,
        headers: { "Content-Type": "text/plain" }
      });
  }
};


/*
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
    fetch(request, {cache: "reload"}).then(response => {

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
        .then(matching => matching)
    );

const addToCache = (request) =>
  caches
    .open(cacheVersion)
    .then(cache =>
      cache.add(request)
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

*/
