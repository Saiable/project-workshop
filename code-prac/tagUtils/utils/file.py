import os
# 给定一个绝对路径，返回该文件夹及子文件夹下的所有的文件
def get_abs_filenamelist(dir_abs_path):
    file_abspath_list = []
    for root, dirs, files in os.walk(dir_abs_path):
        for file in files:
            abs_path = os.path.join(root, file)
            file_abspath_list.append(abs_path)
    return file_abspath_list

# 来判断目录是否存在并创建目录
def create_directory_if_not_exists(directory_path):
    # 检查目录是否存在
    if not os.path.exists(directory_path):
        # 创建目录
        os.makedirs(directory_path)
        print(f"目录已成功创建：{directory_path}")
    else:
        print(f"目录已存在：{directory_path}")
