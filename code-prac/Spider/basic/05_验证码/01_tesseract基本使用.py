from PIL import Image
import pytesseract

im = Image.open('./image.png')
result = pytesseract.image_to_string(im)
print(result)