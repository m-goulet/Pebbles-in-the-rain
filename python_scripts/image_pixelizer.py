from PIL import Image
import sys
import os

def pixelize(input_path, output_path, pixel_size=16):
    """
    Pixelizes an image by downscaling then upscaling.

    Args:
        input_path:  Path to the input image.
        output_path: Path to save the pixelized image.
        pixel_size:  Size of each "pixel block". Higher = more pixelized.
    """
    img = Image.open(input_path)
    original_size = img.size

    # Shrink the image down, then blow it back up using nearest-neighbor
    small = img.resize(
        (original_size[0] // pixel_size, original_size[1] // pixel_size),
        resample=Image.BOX
    )
    pixelized = small.resize(original_size, resample=Image.NEAREST)

    pixelized.save(output_path)
    print(f"Saved pixelized image to: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python pixelize.py <input_image> [pixel_size]")
        print("  pixel_size: size of pixel blocks (default: 16)")
        sys.exit(1)

    input_path = sys.argv[1]
    pixel_size = int(sys.argv[2]) if len(sys.argv) >= 3 else 16

    # Build output filename, e.g. photo.jpg -> photo_pixelized.jpg
    base, ext = os.path.splitext(input_path)
    output_path = f"{base}_pixelized{ext}"

    pixelize(input_path, output_path, pixel_size)