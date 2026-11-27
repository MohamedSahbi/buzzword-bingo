// Service worker: makes the site installable and shows the daily door reminders (Firebase Cloud Messaging push).
// It caches nothing: every request goes straight to the network, so players always get the latest game.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
self.addEventListener('push', e => {
  let p = {}; try { p = e.data ? e.data.json() : {}; } catch {}
  const d = p.data || p.notification || p;
  e.waitUntil(self.registration.showNotification(d.title || 'Buzzword Bingo', {
    body: d.body || '', icon: 'icon-192.png', badge: 'icon-192.png', tag: d.tag || 'door', data: { url: d.url || './advent.html' },
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL(e.notification.data?.url || './advent.html', self.location.origin).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    const open = list.find(c => c.url.startsWith(self.location.origin));
    return open ? open.navigate(url).then(c => c.focus()) : self.clients.openWindow(url);
  }));
});
