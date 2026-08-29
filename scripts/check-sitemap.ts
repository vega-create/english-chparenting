/**
 * sitemap 健康檢查：把 sitemap.xml 裡每個網址都打一次，確認不是 404、不是空頁。
 * 之前 sitemap 送了 12 個不存在的島嶼頁給 Google，就是少了這一關。
 *
 * 用法（要先開好 dev server 或 next start）：
 *   npx tsx scripts/check-sitemap.ts [base]        預設 http://localhost:3100
 */
const BASE = process.argv[2] || 'http://localhost:3100';

async function main() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(m => m[1].replace('https://english.chparenting.com', BASE));
  if (!urls.length) { console.error('sitemap 讀不到任何網址'); process.exit(1); }

  const bad: string[] = [];
  let done = 0;
  const LIMIT = 12;                       // 併發上限，別把 dev server 打掛
  const queue = [...urls];

  async function worker() {
    while (queue.length) {
      const u = queue.shift()!;
      try {
        const r = await fetch(u);
        const body = await r.text();
        if (!r.ok) bad.push(`${r.status}  ${u}`);
        else if (body.length < 2000) bad.push(`內容過短(${body.length})  ${u}`);
      } catch (e) {
        bad.push(`連不上  ${u}`);
      }
      if (++done % 50 === 0) console.log(`  ...${done}/${urls.length}`);
    }
  }
  await Promise.all(Array.from({ length: LIMIT }, worker));

  console.log(`\nsitemap 共 ${urls.length} 個網址，有問題 ${bad.length} 個`);
  bad.slice(0, 40).forEach(b => console.log('   ' + b));
  if (bad.length) process.exit(1);
  console.log('全部通過');
}
main();
