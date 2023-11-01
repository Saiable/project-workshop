'''
该版本输出的pdf大小有问题

'''

import os 
for filename in os.listdir('new-png'):
# 要是有不同的格式，就将第四行代码取消注释，后面的代码缩进即可
    # if filename.endswith('.png') or filename.endswith('.jpg'):
    # print(filename)
    image = Image.open(filename)
    pdf = Image.new("RGB", image.size, (255, 255, 255))
 
    pdf.paste(image, mask=image.split()[3])
 
# save the PDF file
    pdf.save(f"new-png//{filename}.pdf", "PDF", resolution=100.0)