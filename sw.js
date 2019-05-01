let cacheVersion = 'nrestaurants-static-v3';

// Save all the files into the cache on every Service Worker install
self.addEventListener('install', function(event){
const urlsToCache = [
  '/',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
  'index.html',
  'restaurant.html',
  'data/restaurants.json',
  'css/styles.css'
];
event.waitUntil(
    caches.open(cacheVersion).then(function(cache) {
    return cache.addAll(urlsToCache);
    }).catch(function(){
      console.log('Something went wrong');
    }));
});

// Remove unused caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('nrestaurants-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// On every fetch respond with the cached information
self.addEventListener('fetch', function(event){
  event.respondWith(
    caches.match(event.request).then(function(response){
      if(response) return response;
      return fetch(event.request);
    })
  );
});