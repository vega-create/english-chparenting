"""把飛船圖去背成首頁用的 hero。

用 flood-fill 而不是 rembg：rembg 會把散開的小東西（旗子、螺旋槳葉片）當雜訊刪掉，
只有「從邊界連進來的白」才算背景，船身裡的白（兔子、貓）才留得住。
"""
import numpy as np, pathlib
from PIL import Image
from scipy import ndimage

SRC = pathlib.Path("/Users/linyangting/Desktop/characters-clean/ship-c2.png")
DST = pathlib.Path("/Users/linyangting/english-chparenting/public/images/maps/hero-ship-crew.webp")

im = Image.open(SRC).convert("RGBA")
a = np.array(im).astype(np.int16)

whiteish = a[..., :3].min(axis=2) > 235
seed = np.zeros_like(whiteish)
seed[0, :] = seed[-1, :] = seed[:, 0] = seed[:, -1] = True
seed &= whiteish
bg = ndimage.binary_propagation(seed, mask=whiteish)

lum = a[..., :3].min(axis=2)
alpha = np.where(bg, 0, np.clip((248 - lum) / 13 * 255, 0, 255))
alpha = np.where(~bg & (lum <= 235), 255, alpha)
a[..., 3] = alpha
cut = Image.fromarray(a.astype(np.uint8)).crop(Image.fromarray(a.astype(np.uint8)).getbbox())

# 貼進 1600×900 的透明畫布置中，跟舊檔同規格，前端 CSS 不用動
W, H = 1600, 900
cut.thumbnail((W, H), Image.LANCZOS)
out = Image.new("RGBA", (W, H), (0, 0, 0, 0))
out.alpha_composite(cut, ((W - cut.width) // 2, (H - cut.height) // 2))
out.save(DST, "WEBP", quality=88, method=6)
print(f"✓ {DST}  {out.size}  {DST.stat().st_size // 1024} KB  （去背後主體 {cut.size}）")
