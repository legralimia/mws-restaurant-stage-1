var staticCacheName="restaurant1"

self.addEventListener('install', function (event) {
    event.waitUntil(caches.open(staticCacheName).then(cache=> {
      return cache.addAll([
          '/', 
          '/index.html',
          '/index.html?restaurant=1',
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


  self.addEventListener('fetch', function (event) {
    var requestUrl = new URL(event.request.url);
  
    /*if (requestUrl.origin === location.origin) {
      if (requestUrl.pathname === '/') {
        event.respondWith(caches.match('/index.html').then(function(response){
          return response ||fetch(event.request).then(function(result){
            return result;
          }).catch(function(error)
        {
          var error=error;
        });
        }));
        return;
      }
      if (requestUrl.pathname.includes('restaurant')) {
        event.respondWith(caches.match('/index.html?restaurant=1'));
       // return;
      }
      
    }*/
  
    event.respondWith(caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
      }));

  });