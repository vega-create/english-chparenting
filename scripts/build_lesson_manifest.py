#!/usr/bin/env python3
"""從 missions.ts 建某一級的課文音檔 manifest。

用法：python3 scripts/build_lesson_manifest.py <級數> <輸出.json>

⚠️ 字串抓取必須分別處理雙引號/單引號（含跳脫），
   2026-08-17 曾因混用字元類把 It's 截成 It、還互相驗證通過——別再犯。
"""
import re, json, sys, os

L = int(sys.argv[1]); OUT = sys.argv[2]
SRC = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src/data/missions.ts')
s = open(SRC).read()
VOICE = {'vega':'9lHjugDhwqoxA5MhX0az','finn':'nNXPmxHfg9PtGzFxr9Zd','coco':'aFueGIISJUmscc05ZNfD',
         'polly':'BlgEcC0TfWpBak7FmvHW','benny':'9lJhQTNhE6XNSstSyMzH','ruby':'cgSgspJ2msm6clMCkdW9'}
DQ = r'"((?:[^"\\]|\\.)*)"'; SQ = r"'((?:[^'\\]|\\.)*)'"
def unesc(t): return t.replace("\\'", "'").replace('\\"', '"')
def slug(w): return re.sub(r'[^a-z0-9]', '', w.lower())
def qslug(t): return re.sub(r'[^a-z0-9]+', '_', t.lower()).strip('_')
def tts_text(t): return t.replace('___', '...')  # 填空洞用停頓唸

items = []; seen_w = set(); seen_q = set()
for mm in re.finditer(r"const L%d_M(\d+): Mission = \{(.*?)\n\};" % L, s, re.S):
    mid = int(mm.group(1)); blk = mm.group(2)
    for i, m2 in enumerate(re.finditer(r"characterKey:\s*'(\w+)'[^}]*?dialogue:\s*(?:"+DQ+'|'+SQ+r')', blk), 1):
        ck = m2.group(1); txt = unesc(m2.group(2) if m2.group(2) is not None else m2.group(3))
        items.append({'path': f'L{L}/m{mid}/d{i}.mp3', 'text': tts_text(txt), 'voice': VOICE.get(ck, VOICE['vega']), 'stab': 0.6, 'kind': 'dialogue'})
    sm = re.search(r"sentences:\s*\[(.*?)\n\s*\]", blk, re.S)
    if sm:
        i = 0
        for m2 in re.finditer(r'en\s*:\s*(?:'+DQ+'|'+SQ+')', sm.group(1)):
            i += 1
            txt = unesc(m2.group(1) if m2.group(1) is not None else m2.group(2))
            items.append({'path': f'L{L}/m{mid}/s{i}.mp3', 'text': tts_text(txt), 'voice': VOICE['vega'], 'stab': 1, 'kind': 'sentence'})
    tm = re.search(r"talkTimePrompts:\s*\[(.*?)\]", blk, re.S)
    if tm:
        pl = [unesc(a if a else b) for a, b in re.findall(DQ+'|'+SQ, tm.group(1))]
        for i, txt in enumerate([x for x in pl if len(x) >= 3], 1):
            items.append({'path': f'L{L}/m{mid}/t{i}.mp3', 'text': tts_text(txt), 'voice': VOICE['finn'], 'stab': 0.6, 'kind': 'talk'})
    wm = re.search(r"words:\s*\[(.*?)\n\s*\]", blk, re.S)
    if wm:
        for w in re.finditer(r"\{\s*en:\s*'([^']+)'((?:[^}]|\n)*?)\}", wm.group(1)):
            en = w.group(1); rest = w.group(2); sl = slug(en)
            if not sl or sl in seen_w: continue
            seen_w.add(sl)
            exm = re.search(r"exampleSentence:\s*(?:"+DQ+'|'+SQ+')', rest)
            ex = unesc((exm.group(1) if exm and exm.group(1) is not None else (exm.group(2) if exm else '')) or '')
            items.append({'path': f'L{L}/words/{sl}.mp3', 'text': en+'.', 'voice': VOICE['vega'], 'stab': 1, 'kind': 'word'})
            letters = ', '.join(c.upper() for c in en if c.isalpha())
            items.append({'path': f'L{L}/words/{sl}-spell.mp3', 'text': f"{letters}. {en}!", 'voice': VOICE['vega'], 'stab': 1, 'kind': 'spell'})
            if ex: items.append({'path': f'L{L}/words/{sl}-ex.mp3', 'text': ex, 'voice': VOICE['vega'], 'stab': 1, 'kind': 'example'})
    for q in re.findall(r"options:\s*\[([^\]]+)\]", blk):
        for a, b in re.findall(DQ+'|'+SQ, q):
            opt = unesc(a if a else b)
            if not re.fullmatch(r"[A-Za-z' .!?,-]{1,40}", opt): continue
            sl = qslug(opt)
            if not sl or sl in seen_q: continue
            seen_q.add(sl)
            items.append({'path': f'L{L}/quiz/{sl}.mp3', 'text': opt, 'voice': VOICE['vega'], 'stab': 1, 'kind': 'quiz'})
json.dump(items, open(OUT, 'w'), ensure_ascii=False)
print(f'L{L} manifest: {len(items)} items -> {OUT}')
