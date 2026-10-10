// FitFlow Service Worker
const CACHE_NAME = 'fitflow-v1';
const BASE_PATH = '/fitness-app';

const ASSETS_TO_CACHE = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/css/styles.css`,
  `${BASE_PATH}/css/components.css`,
  `${BASE_PATH}/js/data.js`,
  `${BASE_PATH}/js/storage.js`,
  `${BASE_PATH}/js/app.js`,
  `${BASE_PATH}/icons/icon-72.png`,
  `${BASE_PATH}/icons/icon-96.png`,
  `${BASE_PATH}/icons/icon-128.png`,
  `${BASE_PATH}/icons/icon-144.png`,
  `${BASE_PATH}/icons/icon-152.png`,
  `${BASE_PATH}/icons/icon-192.png`,
  `${BASE_PATH}/icons/icon-384.png`,
  `${BASE_PATH}/icons/icon-512.png`,
  `${BASE_PATH}/icons/icon-maskable-192.png`,
  `${BASE_PATH}/icons/icon-maskable-512.png`
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching app assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the fetched response
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Return offline fallback for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match(`${BASE_PATH}/index.html`);
            }
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Handle messages from the app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
