// Share buttons for results: the phone's own share sheet (when the browser offers it), then direct links to the
// big networks, then copy. Nothing is sent anywhere until the player taps a button; no trackers or SDKs are loaded.
const enc = encodeURIComponent;
const TARGETS = [
  ['whatsapp', 'WhatsApp', '#25d366', (t, u) => `https://wa.me/?text=${enc(`${t}\n${u}`)}`],
  ['linkedin', 'LinkedIn', '#0a66c2', (t, u) => `https://www.linkedin.com/sharing/share-offsite/?url=${enc(u)}`],
  ['x', 'X', '#000000', (t, u) => `https://twitter.com/intent/tweet?text=${enc(t)}&url=${enc(u)}`],
  ['facebook', 'Facebook', '#1877f2', (t, u) => `https://www.facebook.com/sharer/sharer.php?u=${enc(u)}`],
  ['telegram', 'Telegram', '#229ed9', (t, u) => `https://t.me/share/url?url=${enc(u)}&text=${enc(t)}`],
];

let styled = false;
function style() {
  if (styled) return; styled = true;
  const s = document.createElement('style');
  s.textContent = `.sharebar{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 4px}
  .sharebar a,.sharebar button{display:inline-flex;align-items:center;gap:6px;border:0;border-radius:999px;padding:7px 12px;font:inherit;font-size:13px;font-weight:800;cursor:pointer;text-decoration:none;color:#fff;line-height:1.2}
  .sharebar .native{background:#132433}.sharebar .copy{background:#e9eef3;color:#132433}
  .sharebar a:focus-visible,.sharebar button:focus-visible{outline:3px solid #f2b84b;outline-offset:2px}`;
  document.head.appendChild(s);
}

// el: container; text: the result (no link); url: page to link to; labels: { share, copy, copied }
export function shareBar(el, { text, url, labels }) {
  style();
  const canNative = typeof navigator.share === 'function';
  el.innerHTML = `<div class="sharebar" role="group" aria-label="${labels.share}">
    ${canNative ? `<button type="button" class="native" data-act="native">📤 ${labels.share}</button>` : ''}
    ${TARGETS.map(([id, name, color, link]) => `<a href="${link(text, url)}" target="_blank" rel="noopener noreferrer" style="background:${color}" data-net="${id}">${name}</a>`).join('')}
    <button type="button" class="copy" data-act="copy">📋 ${labels.copy}</button></div>`;
  const native = el.querySelector('[data-act=native]');
  if (native) native.onclick = async () => { try { await navigator.share({ text, url }); } catch {} };
  const copy = el.querySelector('[data-act=copy]');
  copy.onclick = async () => { try { await navigator.clipboard.writeText(`${text}\n${url}`); copy.textContent = '✓ ' + labels.copied; } catch {} };
}
