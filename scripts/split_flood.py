#!/usr/bin/env python3
"""四合一切格 → 去背 → 256 置中。這版用「從邊界 flood fill」去背。

前兩版各有各的漏洞：
  - rembg + keep_largest_blob：把散開的元素當雜點清掉
    （🎉 只剩拉炮筒、under 的球不見、bigger/smaller 的對比對象被砍掉一半）
  - 純亮度白鍵：物件內部的白色（白盤子、雪人、白雲）也變透明，中間破洞

flood fill 兩者都避開：只有「跟畫布邊界相連的白」才算背景，
物件內部再白也留著，而且散在四處的小元素通通保住。

用法：python3 split_flood.py <四合一png> <slug1> <slug2> <slug3> <slug4> [--out words|scenes]
     slug 以 _ 開頭代表這格不要。
"""
import sys, pathlib
import numpy as np
from PIL import Image
from scipy import ndimage
from split_words import quadrant_crop

DEST = {"words": "/Users/linyangting/english-chparenting/public/words",
        "scenes": "/Users/linyangting/english-chparenting/public/scenes"}


def cutout(sub):
    a = np.array(sub.convert("RGBA")).astype(np.int16)
    # 「接近白」的像素才可能是背景
    whiteish = a[..., :3].min(axis=2) > 235
    # 從四邊往內 flood：只有連到邊界的白才是背景
    seed = np.zeros_like(whiteish)
    seed[0, :] = seed[-1, :] = seed[:, 0] = seed[:, -1] = True
    seed &= whiteish
    bg = ndimage.binary_propagation(seed, mask=whiteish)
    # 邊緣抗鋸齒：離背景一圈的像素給半透明，免得留白邊
    lum = a[..., :3].min(axis=2)
    alpha = np.where(bg, 0, np.clip((248 - lum) / 13 * 255, 0, 255))
    alpha = np.where(~bg & (lum <= 235), 255, alpha)
    a[..., 3] = alpha
    return Image.fromarray(a.astype(np.uint8))


def main():
    args = [x for x in sys.argv[1:] if not x.startswith("--")]
    out = DEST["scenes" if "--out=scenes" in sys.argv or "scenes" in sys.argv[6:7] else "words"]
    src, slugs = pathlib.Path(args[0]), args[1:5]
    im = Image.open(src)
    for slug, (qx, qy) in zip(slugs, [(0, 0), (1, 0), (0, 1), (1, 1)]):
        if slug.startswith("_"):
            continue
        cut = cutout(quadrant_crop(im, qx, qy))
        bbox = cut.getbbox()
        if bbox:
            cut = cut.crop(bbox)
        cut.thumbnail((256, 256), Image.LANCZOS)
        canvas = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
        canvas.alpha_composite(cut, ((256 - cut.width) // 2, (256 - cut.height) // 2))
        canvas.save(pathlib.Path(out) / f"{slug}.png", "PNG", optimize=True)
        print(f"  ✓ {slug}.png ({cut.width}x{cut.height})")


if __name__ == "__main__":
    main()
