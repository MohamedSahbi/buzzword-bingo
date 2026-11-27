// Daily door reminders without email or accounts: an anonymous Firebase Cloud Messaging token per device,
// stored with the player's calendar and language. A scheduled GitHub job sends one reminder when a door opens.
// iPhone: web push works only for apps added to the home screen (iOS 16.4+), so those players get install steps first.
export const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
export const isInstalled = () => matchMedia('(display-mode: standalone), (display-mode: fullscreen)').matches || navigator.standalone === true;
export const needsInstall = () => isIOS() && !isInstalled();
export const pushSupported = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
export const isSubscribed = () => localStorage.getItem('bingoPush') === 'on' && typeof Notification !== 'undefined' && Notification.permission === 'granted';
export const isBlocked = () => typeof Notification !== 'undefined' && Notification.permission === 'denied';

export async function subscribe({ app, D, db, uid, vapidKey, prefs }) {
  if ((await Notification.requestPermission()) !== 'granted') return false;
  const M = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging.js');
  const reg = await navigator.serviceWorker.register('sw.js');
  const token = await M.getToken(M.getMessaging(app), { vapidKey, serviceWorkerRegistration: reg });
  if (!token) return false;
  await D.set(D.ref(db, `push/${uid}`), { token, ...prefs, at: Date.now() });
  localStorage.setItem('bingoPush', 'on');
  return true;
}
// Keep the reminder in the player's current calendar and language.
export async function updatePrefs({ D, db, uid, prefs }) {
  if (!isSubscribed()) return;
  try { await D.update(D.ref(db, `push/${uid}`), prefs); } catch {}
}
