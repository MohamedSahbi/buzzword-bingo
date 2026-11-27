// Minimal service worker so browsers treat the site as an installable app.
// It caches nothing: every request goes straight to the network, so players always get the latest game.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
