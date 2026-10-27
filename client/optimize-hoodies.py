
from pathlib import Path
from PIL import Image

src = Path("src/assets/products/hoodies/pink-hoodie")
dst = src / "optimized"
dst.mkdir(exist_ok=True)

files = [
    "front-photo.jpeg",
    "sideview.jpeg",
    "sideview02.jpeg",
    "face-detail.jpeg",
    "logo-detail.jpeg",
    "detail-photo.jpeg",
]

for name in files:
    source = src / name
    output = dst / f"{Path(name).stem}.webp"

    with Image.open(source) as image:
        image = image.convert("RGB")
        dimensions = image.size
        image.save(output, "WEBP", quality=90, method=6)

    before = source.stat().st_size / (1024 * 1024)
    after = output.stat().st_size / (1024 * 1024)

    print(
        f"{name}: {before:.2f} MB -> {after:.2f} MB "
        f"| dimensions: {dimensions}"
    )

print("\nDone. Original images were preserved.")
