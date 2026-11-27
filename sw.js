// Service worker: makes the site installable and shows the daily door reminders (Firebase Cloud Messaging push).
// It caches nothing. The site's own pages and scripts are always revalidated with the server, so a new page
// never meets an old module (which left a blank loading screen).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== self.location.origin || !/\.(js|html|json|webmanifest)$|\/$/.test(u.pathname)) return;
  // A navigation request can't be copied with options, so refetch its URL instead.
  e.respondWith((r.mode === 'navigate' ? fetch(r.url, { cache: 'no-cache' }) : fetch(r, { cache: 'no-cache' })).catch(() => fetch(r)));
});
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
