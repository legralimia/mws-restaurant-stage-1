var staticCacheName="restaurant1"

self.addEventListener('install', function (event) {
    event.waitUntil(caches.open(staticCacheName).then(cache=> {
      return cache.addAll([
          '/', 
          '/index.html',
          '/restaurant.html',          
          '/data/restaurants.json',
          '/js/',
          '/js/main.js',
          '/js/dbhelper.js',
          '/js/retaurant_info.js',
          '/js/register.js',
           '/css/styles.css',
           '/img/'
     ]).catch(error=>{
        console.log("Error retrieving cache");
     });
    }));
  });


  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          if(event.request!=="localhost"){
            event.request.mode="no-cors";
          }
         
          var fetchRequest = event.request.clone();
          if(fetchRequest.url.includes("restaurant"))
          fetchRequest=new Request("restaurant.html");
  
          return fetch(fetchRequest).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              
              var responseToCache = response.clone();
  
              caches.open(staticCacheName)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          ).catch(function(error){
            return new Response("App is not connected",{status:404,statusText:"not connected"})
          });
        })
      );
  });
