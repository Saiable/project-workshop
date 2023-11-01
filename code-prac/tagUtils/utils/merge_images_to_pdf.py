from reportlab.lib.pagesizes import portrait
from reportlab.pdfgen import canvas
from PIL import Image

def merge_images_to_pdf(image1_path, image2_path, output_pdf_path):
    # 读取第一张图片，并获取图片尺寸
    image1 = Image.open(image1_path)
    width1, height1 = image1.size

    # 读取第二张图片，并获取图片尺寸
    image2 = Image.open(image2_path)
    width2, height2 = image2.size

    # 确定PDF的页面大小为图片的宽度和高度的最大值
    pdf_width = max(width1, width2)
    pdf_height = max(height1, height2)

    # 创建PDF画布
    c = canvas.Canvas(output_pdf_path, pagesize=portrait((pdf_width, pdf_height)))

    # 将第一张图片添加到PDF中，居中显示
    x_offset1 = (pdf_width - width1) / 2
    y_offset1 = (pdf_height - height1) / 2
    c.drawImage(image1_path, x_offset1, y_offset1, width=width1, height=height1)

    # 将第二张图片添加到PDF中，居中显示
    x_offset2 = (pdf_width - width2) / 2
    y_offset2 = (pdf_height - height2) / 2
    c.showPage()
    c.drawImage(image2_path, x_offset2, y_offset2, width=width2, height=height2)

    c.save()

# 调用函数合并两张图片为PDF，并设置PDF大小与原始图片一样
merge_images_to_pdf('image1.jpg', 'image2.jpg', 'output.pdf')
