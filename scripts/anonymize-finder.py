from PIL import Image, ImageDraw, ImageFont

INPUT = '/Users/iorikawano/.cursor/projects/Users-iorikawano-Documents-figma-plugin/assets/image-f1125caa-a678-405d-967f-9a3ccd3c9f96.png'
OUTPUT = '/Users/iorikawano/Documents/figma-plugin/screenshot-importer/assets/finder-anonymized.png'

img = Image.open(INPUT).convert('RGB')
draw = ImageDraw.Draw(img)

sidebar_font = ImageFont.truetype('/Library/Fonts/SF-Pro-Text-Regular.otf', 12)
path_font = ImageFont.truetype('/Library/Fonts/SF-Pro-Text-Regular.otf', 10)

SIDEBAR_BG = (249, 249, 249)
SIDEBAR_TEXT = (60, 60, 60)
PATH_BG = (255, 255, 255)
PATH_TEXT = (155, 155, 155)

sidebar_replacements = [
    # (y_top, y_bottom, new_text)
    (302, 324, "projects"),
    (336, 358, "design-files"),
    (370, 392, "resources"),
    (404, 426, "plugins"),
    (438, 460, "screenshots"),
    (472, 494, "references"),
    (506, 528, "portfolio"),
]

TEXT_X_START = 65
TEXT_X_END = 188

for y_top, y_bottom, new_text in sidebar_replacements:
    draw.rectangle([(TEXT_X_START, y_top), (TEXT_X_END, y_bottom)], fill=SIDEBAR_BG)
    text_y = y_top + (y_bottom - y_top - 12) // 2
    draw.text((TEXT_X_START + 3, text_y), new_text, fill=SIDEBAR_TEXT, font=sidebar_font)

# Path bar: cover "iorikawano" text (x=362 to x=416) and its folder icon (x=348-358)
# Replace with "designer"
draw.rectangle([(348, 496), (418, 510)], fill=PATH_BG)

# Redraw a small blue folder icon at the same position
BLUE = (112, 190, 230)
draw.rectangle([(349, 499), (357, 507)], fill=BLUE, outline=BLUE)
draw.polygon([(349, 499), (353, 499), (353, 501), (357, 501), (357, 499), (357, 507), (349, 507)], fill=BLUE)

draw.text((362, 499), "designer", fill=PATH_TEXT, font=path_font)

import os
os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
img.save(OUTPUT, quality=95)
print(f"Saved: {OUTPUT} ({img.size})")
