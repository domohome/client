var cacheName = 'domotic';
var filesToCache = [
	'/',
	'/js/sw.js',
	'/js/ratchet.min.js',
	'/js/ratchet.js',
	'/js/domohome.js',
	'/index.html',
	'/home/clim.html',
	'/css/ratchet-theme-android.css',
	'/css/ratchet-theme-android.min.css',
	'/css/ratchet-theme-ios.css',
	'/css/ratchet-theme-ios.min.css',
	'/css/ratchet.css',
	'/css/ratchet.min.css',
	'/fonts/ratchicons.eot',
	'/fonts/ratchicons.svg',
	'/fonts/ratchicons.ttf',
	'/fonts/ratchicons.woff'];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    e.waitUntil(
          caches.open(cacheName).then(function(cache) {
	          return cache.addAll(filesToCache);
	        })
        );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
    e.respondWith(
          caches.match(e.request).then(function(response) {
	          return response || fetch(e.request);
	        })
        );
});
