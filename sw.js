var currentCacheName = 'cache-v9';

self.addEventListener('install', function(event) {

  event.waitUntil(
    caches.open(currentCacheName).then(function(cache) {
      return cache.addAll([
        '/home',
        '/skeleton',
        'https://fonts.googleapis.com/css?family=Amatic+SC',
        'https://fonts.gstatic.com/s/amaticsc/v8/6UByihrsVPWtZ99tNMIgMBJtnKITppOI_IvcXXDNrsc.woff2',
        'https://fonts.gstatic.com/s/amaticsc/v8/DPPfSFKxRTXvae2bKDzp5FtXRa8TVwTICgirnJhmVJw.woff2',
        'https://fonts.gstatic.com/s/lato/v11/UyBMtLsHKBKXelqf4x7VRQ.woff2',
        'https://fonts.gstatic.com/s/lato/v11/1YwB1sO8YE1Lyjf12WNiUA.woff2',
        'https://fonts.googleapis.com/css?family=Lato',
        '../../node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
        '../../node_modules/bootstrap/dist/css/bootstrap.css',
        '../app/images/bg.jpg',
        '../bundle.js'
      ])
    })
  )
});

self.addEventListener('fetch', function(event) {

  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/home') {
      event.respondWith(caches.match('/home'));
      return;
    }
    if (requestUrl.pathname === '/skeleton') {
      event.respondWith(caches.match('/skeleton'));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );

});


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('cache-') &&
                 cacheName !== currentCacheName
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
