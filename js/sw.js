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
           '/css/style.css'
     ]).catch(error=>{
        console.log("Error retrieving cache");
     });
    }));
  });


  self.addEventListener('fetch', function (event) {
    var requestUrl = new URL(event.request.url);
  
    if (requestUrl.origin === location.origin) {
      if (requestUrl.pathname === '/') {
        event.respondWith(caches.match('/index.html'));
        return;
      }
      if (requestUrl.pathname.contains('restaurant.html')) {
        event.respondWith(caches.match('/restaurant.html'));
        return;
      }
      
    }
  
    event.respondWith(caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }));
  });