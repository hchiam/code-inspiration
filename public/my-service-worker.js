const SW_VERSION = 'code-inspiration-version_06'; // also can serve as cache name

const appShellURLs = [
  '/libraries/notyf.min.js',
  '/libraries/notyf.min.css',
  '/src/App.css',
  '/src/index.css',
  '/htc.png',
  '/index.html',
  '/manifest.webmanifest',
  '/static/css/main.44be1784.chunk.css',
  '/static/js/2.bdfab1ff.chunk.js',
  '/static/js/main.be5d551c.chunk.js',
];

// when install service worker:
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(SW_VERSION)
    .then((cache) => {
      console.log('Service worker installing.')
      // cache app shell URLs/resources:
      return cache.addAll(appShellURLs);
    })
  );
});

// when activate service worker:
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys() // cache names (caches)
      .then((cacheKeys) => { // cache entries (keys/entries in a single cache)
        const oldKeys = cacheKeys.filter((key) => key.indexOf(SW_VERSION) !== 0);
        // promise to delete all old keys in this cache:
        const promisesToDeleteOldKeys = oldKeys.map((oldKey) => caches.delete(oldKey));
        // don't continue until ALL old keys are deleted:
        return Promise.all(promisesToDeleteOldKeys);
      })
  );
});

// when a resource fetch can be intercepted by service worker:
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const wantAppShellResource = (appShellURLs.indexOf(url.pathname) !== -1);
  const navigatingToPage = (event.request.mode === 'navigate');
  if (wantAppShellResource) {
    event.respondWith(caches.match(event.request)
      .then((response) => {
        if (!response) {
          throw new Error(event.request + ' not found in cache');
        }
        console.log(`Service worker fetching resource even though you might be offline: ${url}`);
        // get resource from cache:
        return response;
      })
      .catch((error) => {
        // fetch resource from network if not in cache:
        fetch(event.request);
      })
    );
  } else if (navigatingToPage) {
    event.respondWith(fetch(event.request)
      .catch((error) => {
        return caches.open(SW_VERSION)
          .then((cache) => {
            console.log(`Service worker fetching page even though you might be offline: ${url}`);
            // get page from cache:
            return cache.match('index.html');
          });
      })
    );
  }
});
