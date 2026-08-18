#!/usr/bin/env python3
"""被抓音檔自動修復：借用→誤報放行→重試到 STT 全對（短字用英文句鎖語言剪接）。
用法：fix_flagged_audio.py <report.json> <level> <outdir>
定版戰法（2026-08-18，L4 健檢戰役總結）：
- 同音字（buy/bye、too/two、write/right、tea/T）＝誤報，直接放行
- 縮寫（Where's vs Where is）與 -ed 掉尾：重試最多 6 次，直到轉錄逐字吻合
- 超短字：前置英文句鎖語言，逐字時間戳剪出目標字（頭 -0.04s、尾 +0.4s、前後墊靜音）
- 拼字檔：Let's spell the word X! ... A! B! C! ... x. 同法剪接，壞 take 自動淘汰
"""
import json, os, re, subprocess, sys, urllib.request

REPORT, LEVEL, OUTDIR = sys.argv[1], int(sys.argv[2]), os.path.expanduser(sys.argv[3])
KEY=None
env=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'.env.local')
for line in open(env):
    if line.startswith('ELEVENLABS_API_KEY='): KEY=line.split('=',1)[1].strip()
V='9lHjugDhwqoxA5MhX0az'
VOICE={'vega':V,'finn':'nNXPmxHfg9PtGzFxr9Zd','coco':'aFueGIISJUmscc05ZNfD',
       'polly':'BlgEcC0TfWpBak7FmvHW','benny':'9lJhQTNhE6XNSstSyMzH','ruby':'cgSgspJ2msm6clMCkdW9'}
HOMOPHONES={'buy':'bye','too':'two','to':'two','tea':'t','write':'right','sells':'cells','no':'know','sea':'see','ate':'eight','one':'won','won':'one'}

def tts(text,voice=V,speed=0.9,stab=1.0):
    body=json.dumps({'text':text,'model_id':'eleven_multilingual_v2',
        'voice_settings':{'stability':stab,'similarity_boost':0.85,'speed':speed}}).encode()
    req=urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{voice}',
        data=body, headers={'xi-api-key':KEY,'Content-Type':'application/json'})
    return urllib.request.urlopen(req,timeout=120).read()
def stt_words(mp3):
    b='----b0undary'; parts=[]
    for n,v in [('model_id','scribe_v1'),('language_code','eng')]:
        parts.append(f'--{b}\r\nContent-Disposition: form-data; name="{n}"\r\n\r\n{v}\r\n'.encode())
    parts.append(f'--{b}\r\nContent-Disposition: form-data; name="file"; filename="a.mp3"\r\nContent-Type: audio/mpeg\r\n\r\n'.encode())
    parts.append(mp3); parts.append(f'\r\n--{b}--\r\n'.encode())
    req=urllib.request.Request('https://api.elevenlabs.io/v1/speech-to-text', data=b''.join(parts),
        headers={'xi-api-key':KEY,'Content-Type':f'multipart/form-data; boundary={b}'})
    return json.loads(urllib.request.urlopen(req,timeout=120).read())
def norm(t): return re.sub(r"[^a-z0-9' ]",' ',t.lower()).split()
def n1(t): return re.sub(r'[^a-z]','',t.lower())

def words_match(want,got):
    aw,gw=norm(want),norm(got)
    if not aw: return True
    pool=list(gw); hit=0
    for w in aw:
        cands=[w]+([HOMOPHONES[w]] if w in HOMOPHONES else [])+[k for k,v in HOMOPHONES.items() if v==w]
        found=None
        for c in cands:
            if c in pool: found=c; break
        if found: hit+=1; pool.remove(found)
    return hit==len(aw) and len(gw)<=len(aw)+1

def cut(raw,start,end,dst):
    fn='/tmp/fixcut.mp3'; open(fn,'wb').write(raw)
    subprocess.run(['ffmpeg','-y','-i',fn,'-ss',str(max(0,start)),'-to',str(end),
        '-af','adelay=250:all=1,apad=pad_dur=0.5','-b:a','128k',dst],capture_output=True)

def is_spell(text): return bool(re.match(r'^([A-Z], )+[A-Z]\. \w+!$', text.strip()))
def voice_for(path):
    part=path.split('/')[1]
    if part=='words' or part=='quiz': return VOICE['polly'] if part=='words' else V
    return V

def fix_short(path,word,voice):
    dst=os.path.join(OUTDIR,path)
    for att in range(6):
        raw=tts(f'Now, listen to the word. ... {word}.',voice)
        d=stt_words(raw)
        ws=[x for x in d.get('words',[]) if x.get('type')=='word']
        toks=[n1(x['text']) for x in ws]
        tgt=n1(word); alt=HOMOPHONES.get(tgt,tgt)
        hits=[i for i,t in enumerate(toks) if t in (tgt,alt)]
        hits=[i for i in hits if i>=4]  # 前導句有 5 個字
        if not hits: continue
        i=hits[-1]
        cut(raw,ws[i]['start']-0.04,ws[i]['end']+0.35,dst)
        return f'short ok (att {att+1})'
    return 'FAIL short'

def fix_spell(path,text,voice):
    m=re.match(r'^((?:[A-Z], )+[A-Z])\. (\w+)!$', text.strip())
    letters=[x.strip() for x in m.group(1).split(',')]; word=m.group(2)
    dst=os.path.join(OUTDIR,path)
    sent=f"Let's spell the word {word}! ... {'! '.join(letters)}! ... {word}."
    for att in range(8):
        raw=tts(sent,voice)
        d=stt_words(raw)
        ws=[x for x in d.get('words',[]) if x.get('type')=='word']
        toks=[n1(x['text']) for x in ws]
        try: wi=toks.index(n1(word))
        except ValueError: continue
        tail=''.join(toks[wi+1:])
        if not tail or set(tail)-set(n1(word)) or not tail.endswith(n1(word)): continue
        cut(raw,ws[wi+1]['start']-0.04,ws[-1]['end']+0.4,dst)
        return f'spell ok (att {att+1})'
    return 'FAIL spell'

def fix_sentence(path,text,voice):
    dst=os.path.join(OUTDIR,path)
    for att in range(6):
        raw=tts(text,voice,0.95)
        got=stt_words(raw).get('text','')
        if words_match(text,got):
            open(dst,'wb').write(raw)
            return f'sentence ok (att {att+1})'
    return f'FAIL sentence (last: {got[:40]})'

report=json.load(open(REPORT))
fl=report['flagged']
results=[]
for f in fl:
    path,text,got=f['path'],f['text'],f.get('transcript','')
    # 中文混合檔跳過（要 Vega 耳朵）
    if re.search(r'[一-鿿]',text):
        results.append((path,'SKIP zh (待聽)')); continue
    # 誤報放行：轉錄按同音字表逐字吻合
    if words_match(text,got):
        results.append((path,'accept (homophone/format)')); continue
    voice=voice_for(path) if '/' in path else V
    clean=text.strip().rstrip('.!?')
    if is_spell(text):
        results.append((path,fix_spell(path,text,voice)))
    elif len(norm(clean))==1:
        results.append((path,fix_short(path,clean,voice)))
    else:
        results.append((path,fix_sentence(path,text,voice)))
    print(results[-1], flush=True)
print('='*30)
ok=sum(1 for _,r in results if 'ok' in r or 'accept' in r)
print(f'fixed/accepted {ok}/{len(results)}')
for p,r in results:
    if 'FAIL' in r or 'SKIP' in r: print(' ',p,r)
