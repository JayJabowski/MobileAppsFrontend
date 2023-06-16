console.log("service worker read");

let cacheVersion = 0;
let offlineQueue = []

//SW installation
self.addEventListener("install", (e) => {
  e.waitUntil(addResourcesToCache(["/", "/index.html"]));
});

//Caching
self.addEventListener('fetch', e => {
      e.respondWith(
          getResource(e.request)
      )
})

//Sync -- not working rn
self.addEventListener("online", (e) => {
  //or use online?
  console.log("back online!");
  console.dir(e);
});


const addResourcesToCache = async (resources) => {
  const cache = await caches.open("" + cacheVersion);
  await cache.addAll(resources);
};

const putInCache = async (request) => {
  try{
    if(request.method == "GET"){
      const cache = await caches.open("" + cacheVersion);
      await cache.add(request);
    }
  }catch(err){
    console.dir({request, err});
  }
};


const addToOfflineQueue = (request) => {
  offlineQueue.push(request);
};

const getResource = async (request) => {
  try {
    const responseFromNetwork = await fetch(request);

    putInCache(request);
    
    return responseFromNetwork;
  } catch (err) {
    console.dir(err);
    const responseFromCache = await caches.match(request.url);

    //evaluateRequestForOfflineQueue(request);
    console.log("Getting From Cache because: "+err);
    return responseFromCache || new Response("Network Error", {
        status: 408,
        headers: { "Content-Type": "text/plain" }
      });
  }
};

const evaluateRequestForOfflineQueue = (request) => {
  if (verifySendMessageRequest(request.url)) {
    addToOfflineQueue(request); 
  }
};

const verifySendMessageRequest = (url) => {
  let urlArray = url.split("?");
  let requestPairArray = urlArray[1].split("&");
  let requestType = requestPairArray[0];

  return requestType === "request=sendmessage";
};
