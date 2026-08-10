#!/usr/bin/env python3
"""
數字單字圖：用程式排列，數量保證正確。

AI 生圖數不準——叫它畫 7 顆積木會給 6 顆，11~19 全變成分不出來的金字塔。
教數字的課上這種圖是直接誤導，所以改成「一顆積木 sprite × N」自己排。

sprite 取自 two.png 的黃色積木（已去背），每顆用 HSV 轉色做出彩色感。
"""
import sys, pathlib, colorsys
import numpy as np
from PIL import Image

S = pathlib.Path(__file__).parent
OUT = pathlib.Path("/Users/linyangting/english-chparenting/public/words")
CUBE = Image.open(S / "cube.png").convert("RGBA")

# 原始 sprite 是黃色（hue≈45°）。要換色就轉這個角度差。
BASE_HUE = 45 / 360
PALETTE = [0, 210, 120, 280, 30, 340, 180, 60, 260, 150]   # 依序循環的色相（度）


def tint(im, hue_deg):
    """把 sprite 轉成指定色相，保留原本的明暗與光澤"""
    a = np.array(im).astype(np.float32) / 255
    rgb, al = a[..., :3], a[..., 3]
    mx, mn = rgb.max(2), rgb.min(2)
    v = mx
    s = np.where(mx == 0, 0, (mx - mn) / np.where(mx == 0, 1, mx))
    h = np.full_like(v, hue_deg / 360)
    # HSV → RGB（向量化）
    i = int(np.floor(h.flat[0] * 6)) % 6          # 整張圖同一個色相，算一次就好
    f = h * 6 - np.floor(h * 6)
    p, q, t = v * (1 - s), v * (1 - f * s), v * (1 - (1 - f) * s)
    order = [(v, t, p), (q, v, p), (p, v, t), (p, q, v), (t, p, v), (v, p, q)][i]
    out = np.stack(order, -1)
    # 描邊（很暗的像素）不上色，維持厚描邊的輪廓
    dark = (v < 0.25)[..., None]
    out = np.where(dark, rgb, out)
    return Image.fromarray((np.dstack([out, al]) * 255).astype(np.uint8))


def layout(n):
    """回傳每一列幾顆。堆成接近正方形，最下面那列最長，看起來穩。"""
    # 小數量排成一長條的話，縮到 256 會變成細細一行看不清楚
    if n <= 3:
        return [n]
    if n == 4:
        return [2, 2]
    if n == 5:
        return [3, 2]
    if n == 6:
        return [3, 3]
    rows = int(np.ceil(np.sqrt(n / 1.4)))
    per = int(np.ceil(n / rows))
    out, left = [], n
    for _ in range(rows):
        k = min(per, left)
        out.append(k)
        left -= k
    return [r for r in out if r]


def render(n, slug):
    rows = layout(n)
    cw = CUBE.width
    # 積木互相疊一點，比較像堆起來的
    step_x, step_y = int(cw * 0.86), int(CUBE.height * 0.78)
    W = max(rows) * step_x + cw // 4
    H = len(rows) * step_y + CUBE.height // 3
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    k = 0
    for ri, cnt in enumerate(rows):
        x0 = (W - cnt * step_x) // 2
        for ci in range(cnt):
            sp = tint(CUBE, PALETTE[k % len(PALETTE)])
            canvas.alpha_composite(sp, (x0 + ci * step_x, ri * step_y))
            k += 1
    canvas = canvas.crop(canvas.getbbox())
    canvas.thumbnail((256, 256), Image.LANCZOS)
    final = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
    final.alpha_composite(canvas, ((256 - canvas.width) // 2, (256 - canvas.height) // 2))
    final.save(OUT / f"{slug}.png", "PNG", optimize=True)
    print(f"  ✓ {slug}.png  ({n} 顆，{rows}）")


NUMS = {'one':1,'two':2,'four':4,'five':5,'seven':7,'eight':8,'nine':9,
        'eleven':11,'twelve':12,'thirteen':13,'fourteen':14,'fifteen':15,
        'sixteen':16,'seventeen':17,'eighteen':18,'nineteen':19,'twenty':20}

if __name__ == "__main__":
    want = sys.argv[1:] or list(NUMS)
    for w in want:
        render(NUMS[w], w)
