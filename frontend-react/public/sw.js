console.log("service worker read");

let cacheVersion = 0;
let token = ""

//SW installation
self.addEventListener("install", (e) => {
  e.waitUntil(addResourcesToCache(["/", "/index.html"]));
});

//Caching
self.addEventListener('fetch', e => {
    //get photos from cache
    if(e.request.url.startsWith("https://www2.hs-esslingen.de/~melcher/map/chat/api/index.php/?request=fetchphoto")){
        e.respondWith(
          getResourceCacheFirst(e.request)
      )
      }
      else
      {
        e.respondWith(
            getResourceNetworkFirst(e.request)
        )
      }
})

const addResourcesToCache = async (resources) => {
  const cache = await caches.open("" + cacheVersion);
  await cache.addAll(resources);
};

const putInCache = async (request) => {
  const cache = await caches.open("" + cacheVersion);
  await cache.add(request);
};

const getResourceNetworkFirst = async (request) => {
  try {
    const responseFromNetwork = await fetch(request, {cache: "reload"});

    if(request.method != "POST"){
      putInCache(request);
    }

    if(!responseFromNetwork){

      const responseFromCache = await caches.match(request.url);
    
      return responseFromCache || new Response("Network Error", {
          status: 408,
          headers: { "Content-Type": "text/plain" }
        });

    }


    return responseFromNetwork;
  } catch (err) {
  }
};

//tWRayrjo

const getResourceCacheFirst = async (request) => {

  const responseFromCache = await caches.match(request.url);

  if(!responseFromCache){
    const responseFromNetwork = await fetch(request, {cache: "reload"})

    if(request.method != "POST"){
      putInCache(request);
    }
      
    return responseFromNetwork 
        || new Response("Network Error", {
            status: 408,
            headers: { "Content-Type": "text/plain" }
            }) 
    } 
  return responseFromCache;
};
