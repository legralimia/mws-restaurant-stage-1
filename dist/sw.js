(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var staticCacheName = "restaurant1";
self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(staticCacheName).then(function (cache) {
    return cache.addAll(['/', '/index.html', '/restaurant.html', '/data/restaurants.json', '/js/', '/js/main.js', '/js/retaurant_info.js', '/css/styles.css', '/img/']).catch(function (error) {
      console.log("Error retrieving cache");
    });
  }));
});
self.addEventListener('fetch', function (event) {
  event.respondWith(caches.match(event.request).then(function (response) {
    // Cache hit - return response
    if (response) {
      return response;
    }

    if (event.request !== "localhost") {
      event.request.mode = "no-cors";
    }

    var fetchRequest = event.request.clone();
    if (fetchRequest.url.includes("restaurant")) fetchRequest = new Request("restaurant.html");
    return fetch(fetchRequest).then(function (response) {
      // Check if we received a valid response
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }

      var responseToCache = response.clone();
      caches.open(staticCacheName).then(function (cache) {
        cache.put(event.request, responseToCache);
      });
      return response;
    }).catch(function (error) {
      return new Response("App is not connected", {
        status: 404,
        statusText: "not connected"
      });
    });
  }));
});

},{}]},{},[1])

//# sourceMappingURL=sw.js.map
