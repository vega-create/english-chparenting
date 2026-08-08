/**
 * Service Worker — 讓網站可以「加到主畫面」像 App 一樣開，並在網路不穩時仍能用。
 *
 * 策略（刻意保守，避免小朋友看到舊內容）：
 * - 頁面（HTML）：network-first —— 有網路一律拿最新的，離線才用快取
 * - 靜態資源（圖片/字型/JS/CSS）：cache-first —— 這些檔名有 hash，不會過期
 * - 音檔（R2）：cache-first —— 同一課重複播不用重抓，省流量
 * - 不快取：AdSense、任何第三方追蹤
 */
const VERSION = 'v1';
const PAGE_CACHE = `pages-${VERSION}`;
const ASSET_CACHE = `assets-${VERSION}`;
const AUDIO_CACHE = `audio-${VERSION}`;
const OFFLINE_URL = '/home';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(PAGE_CACHE).then((c) => c.addAll([OFFLINE_URL])).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => !k.endsWith(VERSION)).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

function isAudio(url) {
  return url.pathname.endsWith('.mp3') || url.hostname.includes('r2.dev');
}
function isAsset(url) {
  return url.pathname.startsWith('/_next/static/') ||
         /\.(webp|png|jpg|jpeg|svg|woff2?|css|js)$/.test(url.pathname);
}
function skip(url) {
  return url.hostname.includes('googlesyndication') ||
         url.hostname.includes('googletagmanager') ||
         url.hostname.includes('google-analytics') ||
         url.hostname.includes('doubleclick');
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (skip(url)) return;

  // 音檔與靜態資源：先看快取
  if (isAudio(url) || isAsset(url)) {
    const cacheName = isAudio(url) ? AUDIO_CACHE : ASSET_CACHE;
    e.respondWith(
      caches.match(req).then((hit) =>
        hit || fetch(req).then((res) => {
          if (res.ok || res.type === 'opaque') {
            const copy = res.clone();
            caches.open(cacheName).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        }).catch(() => hit)
      )
    );
    return;
  }

  // 頁面：先連網，失敗才用快取
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(PAGE_CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() =>
        caches.match(req).then((hit) => hit || caches.match(OFFLINE_URL))
      )
    );
  }
});
