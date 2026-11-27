// Full screen on phones (Android/desktop; iPhone Safari has no full screen for websites, where 'Add to Home
// Screen' opens the installed app without browser bars instead). Best practice: never lock the orientation when the
// layout supports both, and let the browser handle the system bars ('auto'), so a swipe from the edge reveals them.
export const canFullscreen = () => !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
export const isFullscreen = () => !!(document.fullscreenElement || document.webkitFullscreenElement);
export async function toggleFullscreen() {
  try {
    if (isFullscreen()) { await (document.exitFullscreen || document.webkitExitFullscreen).call(document); return false; }
    const el = document.documentElement;
    await (el.requestFullscreen ? el.requestFullscreen({ navigationUI: 'auto' }) : el.webkitRequestFullscreen());
    return true;
  } catch { return false; }
}
