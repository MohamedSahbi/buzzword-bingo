// Full screen on phones: hides the browser's status and navigation bars (needs a tap; not supported by iPhone Safari,
// where 'Add to Home screen' opens the installed app full screen instead). Games also turn sideways where allowed.
export const canFullscreen = () => !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
export async function toggleFullscreen({ landscape = false } = {}) {
  const el = document.documentElement;
  try {
    if (document.fullscreenElement || document.webkitFullscreenElement) { await (document.exitFullscreen || document.webkitExitFullscreen).call(document); screen.orientation?.unlock?.(); return false; }
    await (el.requestFullscreen ? el.requestFullscreen({ navigationUI: 'hide' }) : el.webkitRequestFullscreen());
    if (landscape) await screen.orientation?.lock?.('landscape').catch(() => {});
    return true;
  } catch { return false; }
}
