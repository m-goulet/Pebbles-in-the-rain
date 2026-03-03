from PIL import Image
from PIL.ExifTags import TAGS

img = Image.open("\assets\20230408_170714.jpg")
exif_data = img._getexif()

if exif_data:
    for tag_id, value in exif_data.items():
        tag_name = TAGS.get(tag_id, tag_id)  # convert numeric ID to human name
        print(f"{tag_name:30} {value}")