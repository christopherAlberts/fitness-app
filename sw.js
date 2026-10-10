// Fitness App Service Worker
const CACHE_NAME = 'fitness-app-v2';
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
  // App icons
  `${BASE_PATH}/icons/icon-72.png`,
  `${BASE_PATH}/icons/icon-96.png`,
  `${BASE_PATH}/icons/icon-128.png`,
  `${BASE_PATH}/icons/icon-144.png`,
  `${BASE_PATH}/icons/icon-152.png`,
  `${BASE_PATH}/icons/icon-192.png`,
  `${BASE_PATH}/icons/icon-384.png`,
  `${BASE_PATH}/icons/icon-512.png`,
  `${BASE_PATH}/icons/icon-maskable-192.png`,
  `${BASE_PATH}/icons/icon-maskable-512.png`,
  // Exercise illustrations
  `${BASE_PATH}/images/exercises/pushup.svg`,
  `${BASE_PATH}/images/exercises/bench_press.svg`,
  `${BASE_PATH}/images/exercises/dumbbell_row.svg`,
  `${BASE_PATH}/images/exercises/overhead_press.svg`,
  `${BASE_PATH}/images/exercises/pull_up.svg`,
  `${BASE_PATH}/images/exercises/bicep_curl.svg`,
  `${BASE_PATH}/images/exercises/tricep_dip.svg`,
  `${BASE_PATH}/images/exercises/plank.svg`,
  `${BASE_PATH}/images/exercises/squat.svg`,
  `${BASE_PATH}/images/exercises/deadlift.svg`,
  `${BASE_PATH}/images/exercises/lunge.svg`,
  `${BASE_PATH}/images/exercises/romanian_deadlift.svg`,
  `${BASE_PATH}/images/exercises/leg_press.svg`,
  `${BASE_PATH}/images/exercises/calf_raise.svg`,
  `${BASE_PATH}/images/exercises/glute_bridge.svg`,
  `${BASE_PATH}/images/exercises/dead_bug.svg`,
  `${BASE_PATH}/images/exercises/russian_twist.svg`,
  `${BASE_PATH}/images/exercises/mountain_climber.svg`,
  `${BASE_PATH}/images/exercises/burpee.svg`,
  `${BASE_PATH}/images/exercises/hip_flexor_stretch.svg`,
  `${BASE_PATH}/images/exercises/pigeon_pose.svg`,
  `${BASE_PATH}/images/exercises/hamstring_stretch.svg`,
  `${BASE_PATH}/images/exercises/quad_stretch.svg`,
  `${BASE_PATH}/images/exercises/calf_stretch.svg`,
  `${BASE_PATH}/images/exercises/shoulder_stretch.svg`,
  `${BASE_PATH}/images/exercises/chest_stretch.svg`,
  `${BASE_PATH}/images/exercises/cat_cow.svg`,
  `${BASE_PATH}/images/exercises/ankle_circles.svg`,
  `${BASE_PATH}/images/exercises/world_greatest_stretch.svg`,
  `${BASE_PATH}/images/exercises/leg_swing.svg`,
  // Program header images
  `${BASE_PATH}/images/programs/running.svg`,
  `${BASE_PATH}/images/programs/trail.svg`,
  `${BASE_PATH}/images/programs/weights.svg`,
  `${BASE_PATH}/images/programs/mobility.svg`
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
  if (event.request.method !== 'GET') {
    return;
  }

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
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
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
