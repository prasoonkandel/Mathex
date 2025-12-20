import cv2
import numpy as np
import pytesseract
from PIL import Image


def get_text(image_path):
    image = cv2.imread(image_path)

    if image is None:
        raise ValueError("Image not found or unable to load")
    
    print("Image loaded successfully.")

    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    print("Image converted to RGB.")

    text = pytesseract.image_to_string(Image.fromarray(image_rgb))

    return text

lekhan = get_text("./personal/demo.jpg")


print(lekhan)


