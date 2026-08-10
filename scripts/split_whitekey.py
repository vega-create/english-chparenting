#!/usr/bin/env python3
"""白底去背（不靠 rembg）。

rembg 是顯著性模型，會把細碎、分散的元素當背景丟掉——
🎉 的紙花和 🌧️ 的雨滴就是這樣不見的。
這些圖本來就是純白底，直接用亮度去背反而乾淨也不漏東西。
"""
import sys, pathlib
import numpy as np
from PIL import Image
from split_words import quadrant_crop

OUT = pathlib.Path("/Users/linyangting/english-chparenting/public/scenes")
src = pathlib.Path(sys.argv[1]); slugs = sys.argv[2:6]
im = Image.open(src)
for slug, (qx, qy) in zip(slugs, [(0,0),(1,0),(0,1),(1,1)]):
    if slug.startswith('_'):
        continue
    sub = quadrant_crop(im, qx, qy).convert("RGBA")
    a = np.array(sub).astype(np.float32)
    # 越白越透明，248 以上全透明，230 以下全不透明，中間漸變（保留抗鋸齒邊）
    lum = a[..., :3].min(axis=2)
    alpha = np.clip((248 - lum) / 18, 0, 1) * 255
    a[..., 3] = alpha
    cut = Image.fromarray(a.astype(np.uint8))
    bbox = cut.getbbox()
    if bbox: cut = cut.crop(bbox)
    cut.thumbnail((256, 256), Image.LANCZOS)
    canvas = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
    canvas.alpha_composite(cut, ((256 - cut.width)//2, (256 - cut.height)//2))
    canvas.save(OUT / f"{slug}.png", "PNG", optimize=True)
    print(f"  ✓ {slug}.png ({cut.width}x{cut.height})")
