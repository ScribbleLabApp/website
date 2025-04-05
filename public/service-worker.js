/// <reference lib="webworker" />
var _cache_name = 'cache-v1';
var _allowed_hostname = 'res.cloudinary.com';
var _allowed_path_prefix = '/dtslvnhlo/';
/**
 * Service Worker installation event.
 * This event is triggered when the service worker is installed.
 * It opens a cache and logs the initialization.
 *
 * @param {ExtendableEvent} event - The install event.
 */
self.addEventListener('install', function (event) {
    console.log('[Service Worker] Install event detected.');
    event.waitUntil(caches.open(_cache_name).then(function (cache) {
        console.log("[Service Worker] Cache initialized: ".concat(_cache_name));
    }));
});
/**
 * Service Worker fetch event.
 * Handles caching and network requests for your specific Cloudinary resources.
 * Validates both the hostname and path prefix to ensure the request is for your database.
 *
 * @param {FetchEvent} event - The fetch event.
 */
self.addEventListener('fetch', function (event) {
    var request = event.request;
    var url = new URL(request.url);
    if (url.hostname === _allowed_hostname && url.pathname.startsWith(_allowed_path_prefix)) {
        event.respondWith(caches.match(request).then(function (cachedResponse) {
            if (cachedResponse) {
                console.log("[Service Worker] Serving from cache: ".concat(request.url));
                return cachedResponse;
            }
            return fetch(request)
                .then(function (networkResponse) {
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }
                console.log("[Service Worker] Fetching and caching: ".concat(request.url));
                var responseClone = networkResponse.clone();
                caches.open(_cache_name).then(function (cache) {
                    cache.put(request, responseClone);
                });
                return networkResponse;
            })
                .catch(function (error) {
                console.error("[Service Worker] Fetch failed: ".concat(request.url), error);
                throw error;
            });
        }));
    }
    else {
        console.warn("[Service Worker] Ignored non-matching request: ".concat(request.url));
    }
});