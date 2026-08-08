/**
 * Service Worker — 讓網站可以「加到主畫面」像 App 一樣開，並在網路不穩時仍能用。
 *
 * 策略（刻意保守，避免小朋友看到舊內容）：
 * - 頁面（HTML）：network-first —— 有網路一律拿最新的，離線才用快取
 * - 靜態資源（圖片/字型/JS/CSS）：cache-first —— 這些檔名有 hash，不會過期
 * - 音檔（R2）：stale-while-revalidate —— 先播快取（不用等），同時背景抓新版，
 *   下次就是新的。（v1 用 cache-first，結果換了音檔使用者永遠聽到舊的）
 * - 不快取：AdSense、任何第三方追蹤
 */
const VERSION = 'v2';   // 改版號會自動清掉舊快取
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

  // 靜態資源（檔名有 hash，不會變）：cache-first
  if (isAsset(url)) {
    e.respondWith(
      caches.match(req).then((hit) =>
        hit || fetch(req).then((res) => {
          if (res.ok || res.type === 'opaque') {
            const copy = res.clone();
            caches.open(ASSET_CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        }).catch(() => hit)
      )
    );
    return;
  }

  // 音檔：stale-while-revalidate
  // 檔名固定但內容會換（修正發音時），所以先播快取讓孩子不用等，
  // 同時背景抓新版存起來，下次播就是新的。
  if (isAudio(url)) {
    e.respondWith(
      caches.open(AUDIO_CACHE).then((cache) =>
        cache.match(req).then((hit) => {
          const fresh = fetch(req).then((res) => {
            if (res.ok) cache.put(req, res.clone()).catch(() => {});
            return res;
          }).catch(() => hit);
          return hit || fresh;
        })
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
