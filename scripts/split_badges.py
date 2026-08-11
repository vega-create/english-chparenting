#!/usr/bin/env python3
"""把成就徽章的 2x2 田字圖切成單張透明 webp。

跟單字圖同一套 flood-fill 去背：只有「連得到畫面邊界的白」算背景。
徽章中央有大片亮金與白色高光，用門檻法會被挖成空心。

用法：python3 scripts/split_badges.py <g1.png> <g2.png> <g3.png>
"""
import sys, pathlib
import numpy as np
from PIL import Image
from scipy import ndimage

OUT = pathlib.Path(__file__).resolve().parent.parent / "public/images/badges"
SIZE = 384

# 每張田字圖四格由左上順時針對應的檔名（不含 ach- 前綴）
LAYOUT = [
    ["rookie", "starhero", "phonics", "market"],
    ["reader", "speller", "halfway", "collector"],
    ["islands", "graduate", "locked", "chest"],
]


def cutout(sub: Image.Image) -> Image.Image:
    a = np.array(sub.convert("RGBA")).astype(np.int16)
    whiteish = a[..., :3].min(axis=2) > 235
    seed = np.zeros_like(whiteish)
    seed[0, :] = seed[-1, :] = seed[:, 0] = seed[:, -1] = True
    seed &= whiteish
    bg = ndimage.binary_propagation(seed, mask=whiteish)   # 只有連到邊界的白才是背景
    lum = a[..., :3].min(axis=2)
    alpha = np.where(bg, 0, np.clip((248 - lum) / 13 * 255, 0, 255))
    alpha = np.where(~bg & (lum <= 235), 255, alpha)
    a[..., 3] = alpha
    im = Image.fromarray(a.astype(np.uint8))
    bb = im.getbbox()
    return im.crop(bb) if bb else im


def main(paths):
    OUT.mkdir(parents=True, exist_ok=True)
    for grid_path, names in zip(paths, LAYOUT):
        im = Image.open(grid_path).convert("RGBA")
        w, h = im.size
        for i, name in enumerate(names):
            r, c = divmod(i, 2)
            sub = im.crop((c * w // 2, r * h // 2, (c + 1) * w // 2, (r + 1) * h // 2))
            cut = cutout(sub)
            cut.thumbnail((SIZE, SIZE), Image.LANCZOS)
            canvas = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
            canvas.alpha_composite(cut, ((SIZE - cut.width) // 2, (SIZE - cut.height) // 2))
            dest = OUT / f"ach-{name}.webp"
            canvas.save(dest, "WEBP", quality=90, method=6)
            print(f"  ✓ {dest.name}  {dest.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main(sys.argv[1:] or sys.exit("用法：split_badges.py g1.png g2.png g3.png"))
