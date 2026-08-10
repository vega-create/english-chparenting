#!/usr/bin/env python3
"""
把四合一單字圖切成 4 張、去背、縮 256、依 slug 命名上架。

用法：python3 split_words.py <四合一png> <slug1> <slug2> <slug3> <slug4>
     （順序＝左上、右上、左下、右下，跟 prompt 一致）

切格不是死板的四等份——AI 產的格子常有偏移，所以先用「找內容」的方式：
在每一象限內偵測非白像素的邊界，再往外留一點餘白才裁。
這樣物件被切到的機率遠低於硬切。
"""
import sys, pathlib
import numpy as np
from PIL import Image
from rembg import remove

OUT = pathlib.Path("/Users/linyangting/english-chparenting/public/words")


def quadrant_crop(im, qx, qy):
    """在指定象限內找出實際物件範圍（非白），回傳裁好的子圖"""
    W, H = im.size
    hw, hh = W // 2, H // 2
    # 象限往內縮 2%，避開隔壁格滲進來的邊緣殘影（ball/kite 踩過）
    inset = int(min(hw, hh) * 0.02)
    box = (qx * hw + inset, qy * hh + inset, (qx + 1) * hw - inset, (qy + 1) * hh - inset)
    sub = im.crop(box).convert("RGB")
    a = np.array(sub).astype(int)
    # 非白 = 任一通道明顯低於 245
    mask = (a.min(axis=2) < 240)
    if not mask.any():
        return sub
    ys, xs = np.where(mask)
    pad = 12
    x0 = max(0, xs.min() - pad); x1 = min(sub.width, xs.max() + pad)
    y0 = max(0, ys.min() - pad); y1 = min(sub.height, ys.max() + pad)
    return sub.crop((x0, y0, x1, y1))


def keep_largest_blob(im):
    """只留最大的一塊，把散落的小殘影清掉"""
    from scipy import ndimage
    a = np.array(im)
    lab, n = ndimage.label(a[:, :, 3] > 40)
    if n <= 1:
        return im
    sizes = ndimage.sum(a[:, :, 3] > 40, lab, range(1, n + 1))
    biggest = int(np.argmax(sizes)) + 1
    a[:, :, 3] = np.where(lab == biggest, a[:, :, 3], 0)
    return Image.fromarray(a)


def main():
    src = pathlib.Path(sys.argv[1])
    slugs = sys.argv[2:6]
    im = Image.open(src)
    order = [(0, 0), (1, 0), (0, 1), (1, 1)]   # 左上 右上 左下 右下
    for slug, (qx, qy) in zip(slugs, order):
        sub = quadrant_crop(im, qx, qy)
        cut = remove(sub)                       # 去背
        # 去背後可能留下細碎雜點（隔壁格的殘影）——只保留最大的連通區塊
        cut = keep_largest_blob(cut)
        bbox = cut.getbbox()
        if bbox:
            cut = cut.crop(bbox)
        cut.thumbnail((256, 256), Image.LANCZOS)
        # 置中貼到 256x256 透明畫布，讓所有單字卡尺寸一致
        canvas = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
        canvas.alpha_composite(cut, ((256 - cut.width) // 2, (256 - cut.height) // 2))
        dest = OUT / f"{slug}.png"
        canvas.save(dest, "PNG", optimize=True)
        print(f"  ✓ {slug}.png  ({cut.width}x{cut.height})")


if __name__ == "__main__":
    main()
