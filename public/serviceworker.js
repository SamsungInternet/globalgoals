// Perform install steps
var CACHE_NAME = 'gg-cache';
var urlsToCache = [
    'css/gg-dark.css',
    'css/gg-light.css',
    'css/gg.css',
    'images/raster/hands-vert.jpg',
    'images/raster/goals-vert.jpg',
    'images/raster/video-horz.jpg',
    'images/raster/boy-horz.jpg',
    'images/raster/goals_header.jpg',
    'images/raster/covid_pandemic.jpg',
    'images/raster/wallpaper-quote.png',
    'assets/goalsDetail.js',
    'js/_gg_ui.js',
];

self.addEventListener('install', function(event) {
// Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
        return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event){
  const request = event.request;
  /* Request Image */
  if(request.headers.get('Accept').includes('image')){
    event.respondWith(
      caches.match(request)
      .then(function(response){
        return response || fetch(request)
      })      
      .catch( error => {
        if(request.url.includes('/media/posts/covid')){
          return caches.match('/images/raster/covid_pandemic.jpg')
        }
        if(request.url.includes('/media/wallpapers')){
          return caches.match('/images/raster/wallpaper-quote.png')
        }  

        return caches.match('/images/raster/goals_header.jpg')
      })
    );
    return;
  }

  //Everything else
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request)
        
      }   
    )
  )
})


self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['gg-cache'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});