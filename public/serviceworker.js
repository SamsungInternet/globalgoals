// Perform install steps
var CACHE_NAME = 'gg-cache';
var urlsToCache = [
    'css/gg-dark.css',
    'css/gg-light.css',
    'css/gg.css',
    'images/raster/hands-vert.webp',
    'images/raster/goals-vert.jpg',
    'images/raster/video-horz.webp',
    'images/raster/boy-horz.webp',
    'images/raster/goals_header.jpg',
    'images/raster/covid_pandemic.webp',
    'images/raster/wallpaper-quote.webp',
    'assets/goalsDetail.js',
    'js/_gg_ui.js',
    'offline.html'
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

  /* Navigation Request, HTML */
  if(request.headers.get('Accept').includes('text/html')){
      event.respondWith(
        fetch(request)
        .catch( error => {
          //fallback page
          return caches.match('offline.html');
        })
      );
      return;
  }
  /* Request Image */
  if(request.headers.get('Accept').includes('image')){
    event.respondWith(
      caches.match(request)
      .then(function(response){
        return response || fetch(request)
      })      
      .catch( error => {
        if(request.url.includes('/media/posts/covid')){
          return caches.match('/images/raster/covid_pandemic.webp')
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