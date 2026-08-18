const CC={finn:'37717084',coco:'37717085',polly:'37717087',benny:'37717090',ruby:'37717092',vega:'37717095'};
const REF={finn:37712931,coco:37712934,benny:37712936,polly:37856886,ruby:37901595,vega:37902733};
if (window.__pump) clearInterval(window.__pump);
window.__pumpLog=[];
const Q=window.__batchL3a;
window.__pump=setInterval(async ()=>{
  try{
    for (const j of Q){
      if (!j.imgUuid){
        const body=new URLSearchParams({prompt:j.img, type:'3d', mediaId:CC[j.k], aspect:'16:9', generatorName:'create_from_prompt'});
        const r=await fetch('/ai/api/generate_image_consistent_character',{method:'POST',credentials:'include',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body.toString()});
        const d=await r.json().catch(()=>({}));
        if (d.uuid){ j.imgUuid=d.uuid; window.__pumpLog.push('img '+j.m+'-'+j.s); }
        break;
      }
    }
    for (const j of Q){
      if (j.imgUuid && !j.imgReady){
        const r=await fetch('https://s3.renderplatform.com/user-assets/preview/'+j.imgUuid+'.jpg',{method:'HEAD'}).catch(()=>null);
        if (r && r.ok) j.imgReady=true;
      }
    }
    const lib=await fetch('/api/library/get_media/4?categoryId=262639',{credentials:'include'}).then(r=>r.json());
    const all=lib.results||[];
    const byUuid={}; for (const m of all) if (m.uuid) byUuid[m.uuid]=m;
    for (const j of Q){
      if (!j.imgReady) continue;
      if (!j.vidUuid){
        const body=new URLSearchParams({type:'3d', imagePrompt:j.img, prompt:j.act, uuid:j.imgUuid, mediaId:'0', audioMediaId:'0', isShared:'0', aspect:'16:9', enhanceHumanFace:'0', isTalkingVideoFromText:'1', isNarrationVideo:'0', enhanceVideoPrompt:'1', videoOnly:'0', speed:'', generatorName:'create_from_prompt', faceImageMediaId:'0', faceSwap:'0', mode:'', speech1:j.sp, speech2:''});
        const r=await fetch('/ai/api/image2video',{method:'POST',credentials:'include',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body.toString()});
        const d=await r.json().catch(()=>({}));
        if (d.uuid){ j.vidUuid=d.uuid; window.__pumpLog.push('vid '+j.m+'-'+j.s); }
        break;
      }
      if (j.vidUuid && !j.vidId && byUuid[j.vidUuid] && !byUuid[j.vidUuid].isPending){
        j.vidId=byUuid[j.vidUuid].id; j.vidName=byUuid[j.vidUuid].name; j.vidDur=byUuid[j.vidUuid].duration;
      }
      if (j.vidId && !j.vcSubmitted){
        const body=new URLSearchParams({referenceAudioId:String(REF[j.k]), sourceAudioId:String(j.vidId), startTime:'0', endTime:'0'});
        const r=await fetch('/ai/api/create_audio_voice_change',{method:'POST',credentials:'include',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body.toString()});
        const d=await r.json().catch(()=>({}));
        if (d.success){ j.vcSubmitted=true; window.__pumpLog.push('vc '+j.m+'-'+j.s); }
        break;
      }
      if (j.vcSubmitted && !j.vcUrl){
        const cand=all.filter(m=>m.id>j.vidId && !m.isPending && m.name===j.vidName && Math.abs(m.duration-j.vidDur)<60 && !Q.some(o=>o.vcId===m.id));
        if (cand.length){ j.vcId=cand[0].id; j.vcUrl=cand[0].mediaPath; window.__pumpLog.push('done '+j.m+'-'+j.s); }
      }
    }
  }catch(e){ window.__pumpLog.push('err '+String(e).slice(0,40)); }
}, 30000);
'pump running: L3a M1-M3, 12 jobs'