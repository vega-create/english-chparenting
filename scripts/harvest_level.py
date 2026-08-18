#!/usr/bin/env python3
"""課程影片收成（通用版）：下載 VC→STT 驗→存本機→串接→mix_bgm4 公式混音→R2→words.json。用法: l5-harvest.py <vc-json>"""
import json, os, re, subprocess, urllib.request, difflib, sys

SP=os.path.dirname(os.path.abspath(__file__))
HOME=os.path.expanduser('~')
PROJ=HOME+'/english-chparenting'
LV=HOME+'/Desktop/lesson-videos'
KEY=None
for line in open(PROJ+'/.env.local'):
    if line.startswith('ELEVENLABS_API_KEY='): KEY=line.split('=',1)[1].strip()
SRC=open(PROJ+'/src/data/missions.ts').read()
TRACKS=[HOME+'/Desktop/'+n for n in ['小島探險1.mp3','小島探險2.mp3','小島探險3.mp3','小島任務4.mp3','小島任務5.mp3','小島探險7.mp3','小島探險8.mp3']]
LEVEL=int(os.environ.get('AE_LEVEL','6'))
JOBS={(j['m'],j['s']):j['sp'] for j in json.load(open(os.environ.get('AE_JOBS', SP+'/l6-jobs.json')))}
if sys.argv[1].startswith('remix:'):
    vc=[]; missions=[int(x) for x in sys.argv[1][6:].split(',')]
else:
    vc=json.load(open(sys.argv[1]))
    missions=sorted({j['m'] for j in vc})
L=LEVEL

def run(*a,**k): return subprocess.run(a,capture_output=True,text=True,**k)
def dur(f): return float(run('ffprobe','-v','quiet','-show_entries','format=duration','-of','csv=p=0',f).stdout)
def stt(mp3):
    b='----b0undary'; parts=[]
    for n,v in [('model_id','scribe_v1'),('language_code','eng')]:
        parts.append(f'--{b}\r\nContent-Disposition: form-data; name="{n}"\r\n\r\n{v}\r\n'.encode())
    parts.append(f'--{b}\r\nContent-Disposition: form-data; name="file"; filename="a.mp3"\r\nContent-Type: audio/mpeg\r\n\r\n'.encode())
    parts.append(mp3); parts.append(f'\r\n--{b}--\r\n'.encode())
    req=urllib.request.Request('https://api.elevenlabs.io/v1/speech-to-text', data=b''.join(parts),
        headers={'xi-api-key':KEY,'Content-Type':f'multipart/form-data; boundary={b}'})
    return json.loads(urllib.request.urlopen(req,timeout=300).read())
def normtxt(t): return re.sub(r"[^a-z0-9' ]",'',t.lower()).strip()

# 1. 下載＋STT 驗收
flagged=[]
for j in vc:
    d=f"{LV}/L{L}-m{j['m']}"; os.makedirs(d,exist_ok=True)
    tgt=f"{d}/s{j['s']}.mp4"
    ok=False
    for att in range(4):
        r=run('curl','-sS','--retry','3','--retry-delay','2','-o',tgt,j['vcUrl'])
        if r.returncode==0 and os.path.getsize(tgt)>100000: ok=True; break
        import time; time.sleep(3)
    if not ok: print('DL FAIL',j['m'],j['s'],flush=True); continue
    run('ffmpeg','-y','-i',tgt,'-vn','-b:a','96k','/tmp/l5v.mp3')
    got=stt(open('/tmp/l5v.mp3','rb').read()).get('text','')
    want=JOBS[(j['m'],j['s'])]
    r=difflib.SequenceMatcher(None,normtxt(want),normtxt(got)).ratio()
    tag='OK ' if r>0.85 else 'CHECK'
    if r<=0.85: flagged.append((j['m'],j['s'],want,got.strip(),round(r,2)))
    print(f"{tag} m{j['m']}-s{j['s']} {r:.2f}",flush=True)

# 2. 每課：list.txt→串接→混音→R2
def get_script(level, m):
    blk=re.search(r"const L%d_M%d: Mission = \{.*?\n\};"%(level,m), SRC, re.S)
    vs=re.search(r"videoScript:\s*\[(.*?)\n\s*\]", blk.group(0), re.S)
    # 單/雙引號混用都要抓（2026-08-18 教訓：只抓雙引號會掉行，字幕缺句）
    DQ=r'"((?:[^"\\]|\\.)*)"'; SQ=r"'((?:[^'\\]|\\.)*)'"
    pat=r"speaker:\s*'(\w+)',\s*line:\s*(?:%s|%s),\s*lineZh:\s*(?:%s|%s)"%(DQ,SQ,DQ,SQ)
    raw=re.findall(pat, vs.group(1))
    lines=[(sp,(a or b),(c or d)) for sp,a,b,c,d in raw]
    return [(sp, en.replace('\\"','"').replace("\\'","'"), zh.replace('\\"','"').replace("\\'","'")) for sp,en,zh in lines]
def norm(t): return re.sub(r"[^a-z0-9']",'',t.lower())
def align(lines, sw):
    disp=[]
    for li,(sp,en,zh) in enumerate(lines):
        for tk in re.findall(r"\S+", en):
            n=norm(tk)
            if n: disp.append([li,tk,n])
    a=[d[2] for d in disp]; b=[norm(w['text']) for w in sw]
    smx=difflib.SequenceMatcher(None,a,b,autojunk=False)
    times=[None]*len(disp)
    for op,i1,i2,j1,j2 in smx.get_opcodes():
        if op=='equal':
            for k in range(i2-i1):
                w=sw[j1+k]; times[i1+k]=(w['start'],w['end'])
        elif op=='replace' and j2>j1 and i2>i1:
            t0=sw[j1]['start']; t1=sw[j2-1]['end']; n=i2-i1
            for k in range(n): times[i1+k]=(t0+(t1-t0)*k/n, t0+(t1-t0)*(k+1)/n)
    for i,t in enumerate(times):
        if t is None:
            prev=next((times[jx] for jx in range(i-1,-1,-1) if times[jx]),(0,0))
            nxt=next((times[jx] for jx in range(i+1,len(times)) if times[jx]),(prev[1],prev[1]+0.3))
            times[i]=(prev[1],min(nxt[0],prev[1]+0.5) if nxt[0]>prev[1] else prev[1]+0.3)
    out={'lines':[]}
    for li,(sp,en,zh) in enumerate(lines):
        ws=[{'w':dd[1],'s':round(times[i][0],2),'e':round(times[i][1],2)} for i,dd in enumerate(disp) if dd[0]==li]
        out['lines'].append({'speaker':sp,'zh':zh,'words':ws})
    matched=sum(1 for op,i1,i2,j1,j2 in smx.get_opcodes() if op=='equal' for _ in range(i2-i1))
    return out, matched, len(disp)

for M in missions:
    d=f'{LV}/L{L}-m{M}'
    import glob
    ss=sorted([int(re.match(r's(\d+)\.mp4',os.path.basename(f)).group(1)) for f in glob.glob(f'{d}/s[0-9]*.mp4') if re.match(r's\d+\.mp4',os.path.basename(f))])
    open(f'{d}/list.txt','w').write('\n'.join(f"file 's{s}.mp4'" for s in ss)+'\n')
    r=run('ffmpeg','-y','-f','concat','-safe','0','-i',f'{d}/list.txt','-c:v','libx264','-crf','18','-preset','medium','-pix_fmt','yuv420p','-r','24','-c:a','aac','-b:a','128k',f'{d}/m{M}.mp4',cwd=d)
    if r.returncode: print('CONCAT FAIL',M,r.stderr[-300:],flush=True); continue
    IDX=((L-1)*20+(M-1))%len(TRACKS)
    MUSIC=TRACKS[IDX]
    td=dur(MUSIC); vd=dur(f'{d}/m{M}.mp4')
    FADE=max(0,vd-2)
    OFF=round((L*53+M*37)%max(1,int(td-75)),1)
    out=f'/tmp/l5h-{M}.mp4'
    r=run('ffmpeg','-y','-i',f'{d}/m{M}.mp4','-stream_loop','-1','-ss',str(OFF),'-i',MUSIC,
        '-filter_complex',f'[1:a]volume=0.12,afade=t=in:st=0:d=1.2,afade=t=out:st={FADE}:d=2[m];[0:a][m]amix=inputs=2:duration=first:dropout_transition=0:normalize=0[a]',
        '-map','0:v','-map','[a]','-c:v','copy','-c:a','aac','-b:a','128k',out)
    if r.returncode: print('MIX FAIL',M,flush=True); continue
    r=run('npx','wrangler','r2','object','put',f'adventure-audio/videos/L{L}/m{M}.mp4','--file',out,'--remote',cwd=PROJ)
    ok='Upload complete' in (r.stdout+r.stderr)
    print(f'{"OK" if ok else "UPFAIL"} L{L}/m{M} track{IDX+1} off={OFF} dur={vd:.1f}',flush=True)
    # words.json
    mp3=f'/tmp/l5h-{M}.mp3'
    run('ffmpeg','-y','-i',out,'-vn','-b:a','96k',mp3)
    dd=stt(open(mp3,'rb').read())
    sw=[w for w in dd.get('words',[]) if w.get('type')=='word']
    lines=get_script(L,M)
    o,matched,total=align(lines,sw)
    jf=f'/tmp/l5h-{M}.words.json'
    json.dump(o,open(jf,'w'),ensure_ascii=False)
    r=run('npx','wrangler','r2','object','put',f'adventure-audio/videos/L{L}/m{M}.words.json','--file',jf,'--remote',cwd=PROJ)
    ok='Upload complete' in (r.stdout+r.stderr)
    print(f'WORDS {"OK" if ok else "FAIL"} L{L}/m{M} match={matched}/{total}',flush=True)
if flagged:
    print('FLAGGED:',flush=True)
    for f in flagged: print('  ',f,flush=True)
print('L5-HARVEST-DONE',flush=True)
