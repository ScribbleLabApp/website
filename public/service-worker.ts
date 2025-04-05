/// <reference lib="webworker" />

const _cache_name = 'cache-v1';
const _allowed_hostname = 'res.cloudinary.com';
const _allowed_path_prefix = '/dtslvnhlo/';

/**
 * Service Worker installation event.
 * This event is triggered when the service worker is installed.
 * It opens a cache and logs the initialization.
 * 
 * @param {ExtendableEvent} event - The install event.
 */
(self as unknown as ServiceWorkerGlobalScope).addEventListener('install', (event: ExtendableEvent) => {
    console.log('[Service Worker] Install event detected.');
    event.waitUntil(
        caches.open(_cache_name).then((cache) => {
            console.log(`[Service Worker] Cache initialized: ${_cache_name}`);
        })
    );
});

/**
 * Service Worker fetch event.
 * Handles caching and network requests for your specific Cloudinary resources.
 * Validates both the hostname and path prefix to ensure the request is for your database.
 * 
 * @param {FetchEvent} event - The fetch event.
 */
(self as unknown as ServiceWorkerGlobalScope).addEventListener('fetch', (event: FetchEvent) => {
    const request = event.request;

    const url = new URL(request.url);

    if (url.hostname === _allowed_hostname && url.pathname.startsWith(_allowed_path_prefix)) {
        event.respondWith(
            caches.match(request).then((cachedResponse) => {
                if (cachedResponse) {
                    console.log(`[Service Worker] Serving from cache: ${request.url}`);
                    return cachedResponse;
                }

                return fetch(request)
                    .then((networkResponse) => {
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }

                        console.log(`[Service Worker] Fetching and caching: ${request.url}`);
                        const responseClone = networkResponse.clone();
                        caches.open(_cache_name).then((cache) => {
                            cache.put(request, responseClone);
                        });
                        return networkResponse;
                    })
                    .catch((error) => {
                        console.error(`[Service Worker] Fetch failed: ${request.url}`, error);
                        throw error;
                    });
            })
        );
    } else {
        console.warn(`[Service Worker] Ignored non-matching request: ${request.url}`);
    }
});