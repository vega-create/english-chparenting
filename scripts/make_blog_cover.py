#!/usr/bin/env python3
"""部落格封面合成：島嶼圖當背景（裁 1200x675）＋右側角色（去背 PNG）。
用法: python3 scripts/make_blog_cover.py            # 產生 COVERS 裡全部（已存在的跳過）
      python3 scripts/make_blog_cover.py --force    # 全部重做
新文章：在 COVERS 加一列 (slug, 島嶼檔, y 偏移 0~1, [角色檔...]) 再跑一次。"""
import sys, os
from PIL import Image, ImageFilter

PUB = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public")
W, H = 1200, 675

COVERS = [
    ("sound-island-parent-notes",            "island-sound.webp",      0.30, ["coco/coco-sing.png"]),
    ("school-road-parent-notes",             "island-school.webp",     0.32, ["benny/benny-wave.png"]),
    ("kids-forget-english-words-seven-encounters", "island-letter.webp", 0.30, ["finn/finn-think.png"]),
    ("question-tower-parent-notes",          "island-question.webp",   0.22, ["polly/polly-think.png"]),
    ("kid-already-in-english-cram-school-what-to-do-at-home", "island-lighthouse.webp", 0.30, ["vega/vega-talk.png"]),
    ("sight-words-for-kids-first-25",        "island-grammar.webp",    0.30, ["ruby/ruby-star.png"]),
    ("time-travel-path-parent-notes",        "island-time.webp",       0.28, ["finn/finn-point.png"]),
    ("should-parents-correct-kids-english-pronunciation", "island-market.webp", 0.34, ["benny/benny-listen.png"]),
    ("two-kids-different-english-levels-one-parent", "island-coral.webp", 0.32, ["polly/polly-clap.png", "coco/coco-clap.png"]),
    ("how-many-english-words-elementary-students-need", "island-victory.webp", 0.18, ["polly/polly-read.png"]),
    ("winter-break-english-plan-21-days",    "island-challenge.webp",  0.22, ["ruby/ruby-jump.png" if os.path.exists(os.path.join(PUB, "characters/ruby/ruby-jump.png")) else "ruby/ruby-happy.png"]),
    ("future-bridge-parent-notes",           "island-future.webp",     0.30, ["coco/coco-write.png"]),
]

def trim(im):
    box = im.getchannel("A").point(lambda a: 255 if a > 12 else 0).getbbox()
    return im.crop(box) if box else im

def make(slug, island, yoff, chars, force=False):
    out = os.path.join(PUB, "images/blog", f"cover-{slug}.webp")
    if os.path.exists(out) and not force:
        return None
    bg = Image.open(os.path.join(PUB, "images/islands", island)).convert("RGB")
    scale = W * 1.35 / bg.width                      # 放大一點，畫面才有「近景」感
    bg = bg.resize((int(bg.width * scale), int(bg.height * scale)), Image.LANCZOS)
    x0 = (bg.width - W) // 2 - 120                   # 往左取景，右邊留給角色
    y0 = int((bg.height - H) * yoff)
    bg = bg.crop((x0, y0, x0 + W, y0 + H))
    canvas = bg.convert("RGBA")
    n = len(chars)
    ch_h = 600 if n == 1 else 500
    x_right = W - 40
    for c in reversed(chars):
        im = trim(Image.open(os.path.join(PUB, "characters", c)).convert("RGBA"))
        r = ch_h / im.height
        im = im.resize((int(im.width * r), ch_h), Image.LANCZOS)
        # 柔邊陰影
        sh = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
        a = im.getchannel("A").point(lambda v: int(v * 0.35))
        sh.paste(Image.new("RGBA", im.size, (20, 40, 80, 255)), (x_right - im.width + 8, H - ch_h - 10 + 10), a)
        canvas = Image.alpha_composite(canvas, sh.filter(ImageFilter.GaussianBlur(10)))
        canvas.paste(im, (x_right - im.width, H - ch_h - 10), im)
        x_right -= int(im.width * 0.82)
    canvas.convert("RGB").save(out, "WEBP", quality=82, method=6)
    return out

if __name__ == "__main__":
    force = "--force" in sys.argv
    for row in COVERS:
        o = make(*row, force=force)
        print(("✅ " + os.path.basename(o)) if o else f"⏭  {row[0]}（已存在）")
