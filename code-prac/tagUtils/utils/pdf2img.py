# -*- encoding: utf-8 -*-
'''
@File    :   pdf2img.py
@Time    :   2023/05/13 07:49:56
@Version :   1.0
@Desc    :   1.0 将同一文件夹下的多个pdf文件，统一转换成未分目录的、分页的图片
'''

# import lib here

from pdf2image import convert_from_path
import tempfile
import os



def pdf2img(filename):
    """
    将单个pdf文件，转成imga对象
    @param filename: pdf单文件输入路径
    @return: PIL.PpmImagePlugin.PpmImageFile 构成的列表
    """
    print('filename=', filename)
    with tempfile.TemporaryDirectory(dir='./') as path:
        print(path)
        images_from_path = convert_from_path(filename, output_folder = path)
        # Do something here
        # with tempfile.TemporaryDirectory() as path:
        images_from_path = convert_from_path(filename)
        # print(images_from_path, type(images_from_path))
        return images_from_path


def pdfs2img(pdf_dir, save_dir):
    for rt, folders, files in os.walk(pdf_dir):
        for f in files:
            if not f.endswith("pdf"):
                continue
            pdf_path = os.path.join(rt, f)
            try:
                images = pdf2img(filename=pdf_path)
            except Exception as e:
                print(f"f:{pdf_path},error_msg:{e}")
                continue
            for index, img in enumerate(images):
                img.save(save_dir + f"{f.strip('.pdf')}_{index+1}.png")
    print("Compeleted.")


if __name__ == "__main__":
    # 路径最后要加斜杠
    
    # pdf_dir = "/data/data01/ztp/苏粮/data/"
    pdf_dir = "/app/tag/utils/pdf/"
    # save_dir = "/data/data02/wj/PythonWorkspace/YuHuaPdfScan/code/ocr/src/suliang_pdf2imgs/"
    save_dir = "/app/tag/utils/png/"
    pdfs2img(pdf_dir=pdf_dir, save_dir=save_dir)
    # pdf2img('/app/tag/utils/pdf/013.pdf') # 单个文件


