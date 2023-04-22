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

//Push
self.addEventListener("push", (e) => {
  self.addEventListener("message", (e) => {
    self.clients
      .matchAll()
      .then((clients) => clients.map((c) => c.postMessage(e)));
  });
});

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
  await cache.put(request, response);
};

const addToOfflineQueue = (request) => {
  offlineQueue.push(request);
};

const getResource = async (request) => {
  try {
    const responseFromNetwork = await fetch(request);

    putInCache(request, responseFromNetwork.clone());

    return responseFromNetwork;
  } catch (err) {
    const responseFromCache = await caches.match(request.url);

    evaluateRequestForOfflineQueue(request);
    
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
