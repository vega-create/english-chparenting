#!/usr/bin/env python3
"""課文音檔批次生成：manifest → ElevenLabs TTS → Scribe STT 驗證 → 報告。

用法：python3 scripts/gen_lesson_audio.py /tmp/l1-audio-manifest.json ~/Desktop/lesson-audio
產出：<outdir>/<path>.mp3 ＋ <outdir>/report.json（pass/fail 與轉錄結果）

英文內容 STT 可信；中文旁白不要用這支（中文一律要 Vega 耳朵驗收，見 vega-voice.md）。
"""
import json, os, re, sys, time
from concurrent.futures import ThreadPoolExecutor
import urllib.request

MANIFEST = sys.argv[1]
OUTDIR = os.path.expanduser(sys.argv[2])

# 讀 key（.env.local）
KEY = None
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env.local')
for line in open(env_path):
    if line.startswith('ELEVENLABS_API_KEY='):
        KEY = line.split('=', 1)[1].strip()
assert KEY, 'ELEVENLABS_API_KEY not found'

def tts(item):
    body = json.dumps({
        'text': item['text'],
        'model_id': 'eleven_multilingual_v2',
        'voice_settings': {'stability': item['stab'], 'similarity_boost': 0.85, 'speed': 0.95},
    }).encode()
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{item['voice']}",
        data=body, headers={'xi-api-key': KEY, 'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=120) as r:
        return r.read()

def stt(mp3_bytes):
    boundary = '----b0undary'
    parts = []
    for name, val in [('model_id', 'scribe_v1'), ('language_code', 'eng')]:
        parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="{name}"\r\n\r\n{val}\r\n'.encode())
    parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="file"; filename="a.mp3"\r\nContent-Type: audio/mpeg\r\n\r\n'.encode())
    parts.append(mp3_bytes)
    parts.append(f'\r\n--{boundary}--\r\n'.encode())
    req = urllib.request.Request('https://api.elevenlabs.io/v1/speech-to-text',
        data=b''.join(parts),
        headers={'xi-api-key': KEY, 'Content-Type': f'multipart/form-data; boundary={boundary}'})
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.loads(r.read()).get('text', '')

def norm(s):
    return re.sub(r'[^a-z0-9 ]', '', s.lower()).strip()

def check(item, transcript):
    want, got = norm(item['text']), norm(transcript)
    if item['kind'] == 'spell':
        # 拼字檔：字母會被轉成各種樣子，只驗最後的完整單字有出現
        word = norm(item['text'].split('.')[-1])
        return word in got
    aw, gw = want.split(), got.split()
    if not aw:
        return True
    hit = sum(1 for w in aw if w in gw)
    return hit / len(aw) >= 0.8

def process(item):
    dst = os.path.join(OUTDIR, item['path'])
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    if os.path.exists(dst):
        return {**item, 'status': 'exists'}
    last = {}
    for attempt in (1, 2):
        try:
            audio = tts(item)
            transcript = stt(audio)
            ok = check(item, transcript)
            last = {**item, 'transcript': transcript, 'attempt': attempt}
            if ok:
                open(dst, 'wb').write(audio)
                return {**last, 'status': 'pass'}
        except Exception as e:
            last = {**item, 'error': str(e)[:200], 'attempt': attempt}
            time.sleep(3)
    # 兩次都沒過：仍存檔（用 .flagged.mp3），人工聽
    if 'error' not in last:
        open(dst.replace('.mp3', '.flagged.mp3'), 'wb').write(audio)
    return {**last, 'status': 'flagged'}

items = json.load(open(MANIFEST))
os.makedirs(OUTDIR, exist_ok=True)
results = []
t0 = time.time()
with ThreadPoolExecutor(max_workers=3) as ex:
    for i, r in enumerate(ex.map(process, items)):
        results.append(r)
        if (i + 1) % 20 == 0:
            done = sum(1 for x in results if x['status'] in ('pass', 'exists'))
            print(f"{i+1}/{len(items)} pass={done} elapsed={int(time.time()-t0)}s", flush=True)

report = {
    'total': len(results),
    'pass': sum(1 for r in results if r['status'] == 'pass'),
    'exists': sum(1 for r in results if r['status'] == 'exists'),
    'flagged': [r for r in results if r['status'] == 'flagged'],
}
json.dump(report, open(os.path.join(OUTDIR, 'report.json'), 'w'), ensure_ascii=False, indent=1)
print('DONE', report['pass'], 'pass /', report['total'], ' flagged:', len(report['flagged']))
