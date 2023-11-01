import os
import shutil

source_folder = '/path/to/source/folder'  # 源文件夹路径
destination_folder = '/path/to/destination/folder'  # 目标文件夹路径

# 遍历源文件夹及其子文件夹
for root, dirs, files in os.walk(source_folder):
    for file in files:
        if file.endswith('.pdf'):
            source_file = os.path.join(root, file)  # 源文件路径

            # 构造目标文件路径，并处理同名文件的冲突
            destination_file = os.path.join(destination_folder, file)
            counter = 1
            while os.path.exists(destination_file):
                filename, extension = os.path.splitext(file)
                new_filename = f'{filename}_{counter}{extension}'
                destination_file = os.path.join(destination_folder, new_filename)
                counter += 1

            # 复制文件到目标文件夹
            shutil.copy(source_file, destination_file)
