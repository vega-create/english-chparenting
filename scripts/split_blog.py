#!/usr/bin/env python3
"""切開部落格用的 2x2 生成圖，輸出到 public/images/blog。

兩種切法：
  books  —— 白底商品圖，要去背（flood-fill，只有連到邊界的白算背景）
  covers —— 完整場景，不去背，直接裁掉四周白縫再壓成 16:9

用法：python3 scripts/split_blog.py <hero.png> <books1.png> <books2.png> <covers1.png> <covers2.png> <shelf.png>
"""
import sys, pathlib
import numpy as np
from PIL import Image
from scipy import ndimage

OUT = pathlib.Path(__file__).resolve().parent.parent / "public/images/blog"

BOOKS = [
    ["book-phonics", "book-vocabulary", "book-speaking", "book-reading"],
    ["book-parenting", "book-exam", "book-resources", "book-compass"],
]
COVERS = [
    ["cover-phonics-kk", "cover-speaking", "cover-books", "cover-gept"],
    ["cover-screen-time", "cover-writing", "cover-wordgame", "cover-listening"],
]


def cutout(sub):
    a = np.array(sub.convert("RGBA")).astype(np.int16)
    whiteish = a[..., :3].min(axis=2) > 235
    seed = np.zeros_like(whiteish)
    seed[0, :] = seed[-1, :] = seed[:, 0] = seed[:, -1] = True
    seed &= whiteish
    bg = ndimage.binary_propagation(seed, mask=whiteish)
    lum = a[..., :3].min(axis=2)
    alpha = np.where(bg, 0, np.clip((248 - lum) / 13 * 255, 0, 255))
    alpha = np.where(~bg & (lum <= 235), 255, alpha)
    a[..., 3] = alpha
    im = Image.fromarray(a.astype(np.uint8))
    bb = im.getbbox()
    return im.crop(bb) if bb else im


def quads(path):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    for i in range(4):
        r, c = divmod(i, 2)
        yield im.crop((c * w // 2, r * h // 2, (c + 1) * w // 2, (r + 1) * h // 2))


def save(im, name, size, mode="RGB"):
    dest = OUT / f"{name}.webp"
    im.save(dest, "WEBP", quality=86, method=6)
    print(f"  ✓ {dest.name}  {im.size}  {dest.stat().st_size // 1024} KB")


def main(hero, books1, books2, covers1, covers2, shelf):
    OUT.mkdir(parents=True, exist_ok=True)

    im = Image.open(hero).convert("RGB")
    im.thumbnail((1600, 1600), Image.LANCZOS)
    save(im, "hero-library", None)

    im = Image.open(shelf).convert("RGB")
    # 書架只要中間那一條，上下的天花板與地板裁掉，卡片才壓得進去
    w, h = im.size
    im = im.crop((0, int(h * 0.18), w, int(h * 0.80)))
    im.thumbnail((1600, 1600), Image.LANCZOS)
    save(im, "shelf", None)

    for src, names in zip((books1, books2), BOOKS):
        for sub, name in zip(quads(src), names):
            cut = cutout(sub)
            cut.thumbnail((320, 320), Image.LANCZOS)
            canvas = Image.new("RGBA", (320, 320), (0, 0, 0, 0))
            canvas.alpha_composite(cut, ((320 - cut.width) // 2, (320 - cut.height) // 2))
            save(canvas, name, None)

    for src, names in zip((covers1, covers2), COVERS):
        for sub, name in zip(quads(src), names):
            w, h = sub.size
            pad = int(w * 0.012)                      # 修掉格線留下的白邊
            sub = sub.crop((pad, pad, w - pad, h - pad))
            w, h = sub.size
            box = int(w * 9 / 16)                     # 中央裁成 16:9
            sub = sub.crop((0, (h - box) // 2, w, (h + box) // 2))
            sub.thumbnail((800, 800), Image.LANCZOS)
            save(sub, name, None)


if __name__ == "__main__":
    if len(sys.argv) != 7:
        sys.exit(__doc__)
    main(*sys.argv[1:])
