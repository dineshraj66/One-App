const CACHE_NAME = 'life-dashboard-v1';
const ASSETS_TO_CACHE = [
    './dashboard.html',
    './manifest.json',
    'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js',
    'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js',
    'https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js',
    'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&family=IBM+Plex+Mono:wght@400;600&display=swap'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE).catch(() => {
                // If assets fail to cache, continue anyway
                return Promise.resolve();
            });
        })
    );
    self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            );
        })
    );
    self.clients.claim();
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    // For navigation requests, try network first
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Cache successful responses
                    if (response.ok) {
                        const cache = caches.open(CACHE_NAME);
                        cache.then((c) => c.put(event.request, response.clone()));
                    }
                    return response;
                })
                .catch(() => {
                    // Fall back to cache for offline
                    return caches.match(event.request);
                })
        );
    }
    // For other requests, use cache-first strategy
    else {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return (
                    response ||
                    fetch(event.request).then((response) => {
                        // Cache successful responses
                        if (response.ok && event.request.method === 'GET') {
                            const cache = caches.open(CACHE_NAME);
                            cache.then((c) => c.put(event.request, response.clone()));
                        }
                        return response;
                    })
                );
            })
        );
    }
});
