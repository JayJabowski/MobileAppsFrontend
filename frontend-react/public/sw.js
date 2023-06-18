console.log("service worker read");

let cacheVersion = 0;


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

const addResourcesToCache = async (resources) => {
  const cache = await caches.open("" + cacheVersion);
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open("" + cacheVersion);
  await cache.add(request);
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
