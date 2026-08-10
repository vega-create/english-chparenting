#!/usr/bin/env python3
"""星期與月份的單字圖：日曆上把第幾格點亮。

日曆上直接寫出數字，把該格點亮：Monday＝一週的第 1 格，July＝一年的第 7 格。

跟數字圖同一個理由用程式畫而不是 AI 生：要數格子、要寫對數字的東西 AI 一定出錯，
而且這十四張必須長得一模一樣、只差點亮哪一格，孩子才看得出是在比位置。
"""
import math, pathlib
from PIL import Image, ImageDraw, ImageFont


def bold(size):
    for p in ("/System/Library/Fonts/Supplemental/Arial Rounded Bold.ttf",
              "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
              "/System/Library/Fonts/Helvetica.ttc"):
        try:
            return ImageFont.truetype(p, size)
        except OSError:
            continue
    return ImageFont.load_default()

OUT = pathlib.Path("/Users/linyangting/english-chparenting/public/words")
S = 512                                  # 先畫大張再縮，邊才漂亮
INK = (94, 62, 40, 255)                  # 厚描邊的深棕
PAPER = (255, 252, 244, 255)
HEADER = (232, 86, 74, 255)              # 紅色封頭
CELL = (238, 230, 214, 255)              # 沒點亮的格子
HILITE = (255, 193, 45, 255)             # 點亮的格子
HILITE_EDGE = (226, 145, 20, 255)


def rr(d, box, r, fill, outline=None, w=0):
    d.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=w)


def star(d, cx, cy, r, fill, outline):
    pts = []
    for i in range(10):
        a = -math.pi / 2 + i * math.pi / 5
        rad = r if i % 2 == 0 else r * 0.45
        pts.append((cx + rad * math.cos(a), cy + rad * math.sin(a)))
    d.polygon(pts, fill=fill, outline=outline)


def calendar(cols, rows, index):
    """畫一張日曆，第 index 格（1 起算）點亮。

    畫布跟著格數變形——七格排一排如果硬塞正方形，格子會瘦成一條、數字小到看不見。
    """
    cell = 96
    total = cols * rows
    # 七格排成一排會變成又寬又扁，縮進 256 的卡片裡數字就看不見了 → 排成 4+3
    layout = [4, 3] if total == 7 else [cols] * rows
    cols, rows = max(layout), len(layout)
    W = int(cols * cell + 152)
    H = int(rows * cell + 244)
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)

    pad, top = 40, 96
    S_ = W                                   # 圓環要用寬度定位
    page = (pad, top, W - pad, H - 48)
    rr(d, page, 34, PAPER, INK, 9)                       # 紙
    rr(d, (pad, top, W - pad, top + 78), 34, HEADER)     # 紅封頭
    d.rectangle((pad, top + 44, W - pad, top + 78), fill=HEADER)
    rr(d, page, 34, None, INK, 9)

    for x in (W * 0.34, W * 0.66):                       # 兩個圓環
        d.rounded_rectangle((x - 13, top - 34, x + 13, top + 34), radius=13,
                            fill=(140, 150, 160, 255), outline=INK, width=8)

    gx0, gy0 = pad + 36, top + 108
    gx1, gy1 = W - pad - 36, H - 84
    cw = (gx1 - gx0) / cols
    ch = (gy1 - gy0) / rows
    gap = min(cw, ch) * 0.16
    i = -1
    for r_, n_in_row in enumerate(layout):
        x0 = gx0 + (cols - n_in_row) * cw / 2          # 不滿一排的置中
        for c in range(n_in_row):
            i += 1
            box = (x0 + c * cw + gap, gy0 + r_ * ch + gap,
                   x0 + (c + 1) * cw - gap, gy0 + (r_ + 1) * ch - gap)
            on = (i + 1) == index
            rr(d, box, max(6, int(min(cw, ch) * 0.18)),
               HILITE if on else CELL, HILITE_EDGE if on else INK, 6 if on else 4)
            # 格子裡寫數字：Monday 是第 1 格，孩子看得到「1」而不是只看得到位置
            f = bold(int(min(box[2] - box[0], box[3] - box[1]) * 0.62))
            d.text(((box[0] + box[2]) / 2, (box[1] + box[3]) / 2 + 1), str(i + 1),
                   font=f, anchor="mm", fill=(255, 255, 255, 255) if on else INK,
                   stroke_width=4 if on else 0, stroke_fill=HILITE_EDGE)

    im = im.crop(im.getbbox())
    im.thumbnail((256, 256), Image.LANCZOS)
    out = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
    out.alpha_composite(im, ((256 - im.width) // 2, (256 - im.height) // 2))
    return out


DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
MONTHS = ['january', 'february', 'march', 'april', 'may', 'june',
          'july', 'august', 'september', 'october', 'november', 'december']
NEED_MONTHS = ['january', 'april', 'may', 'june', 'july', 'october', 'december']

if __name__ == "__main__":
    for i, name in enumerate(DAYS, 1):
        calendar(7, 1, i).save(OUT / f"{name}.png", "PNG", optimize=True)
        print(f"  ✓ {name}.png  （一週第 {i} 格）")
    for name in NEED_MONTHS:
        i = MONTHS.index(name) + 1
        calendar(4, 3, i).save(OUT / f"{name}.png", "PNG", optimize=True)
        print(f"  ✓ {name}.png  （一年第 {i} 格）")
