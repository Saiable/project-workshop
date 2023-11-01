# -*- encoding: utf-8 -*-
'''
@File    :   deal_zip.py
@Time    :   2023/05/17 07:04:43
@Version :   1.0
@Desc    :   None
'''

# import lib here
import glob
import os
import gzip
import tarfile
import zipfile
# import rarfile
from unrar import rarfile

compressed_list = ['gz', 'tar', 'gzip', 'rar']

class Zip:
    def __init__(self, filename, dir = None):
        self._filename = filename
        self._dir = dir

    def un_gz(self, filename):
        # gz文件的单文件解压就是去掉 filename 后面的 .gz

        filename = filename[:-3]
        gz_file = gzip.GzipFile(filename)
        with open(filename, "w+") as file:
            file.write(gz_file.read())
            return filename
        # 这个gzip的函数需要返回值以进一步配合untar函数

    def un_tar(self, filename):
        tar = tarfile.open(filename)
        names = tar.getnames()
        # tar本身是将文件打包，解除打包会产生很多文件，因此需要建立文件夹存放
        if not os.path.isdir(filename + "_dir"):
            os.mkdir(filename + "_dir")
            for name in names:
                tar.extract(name, filename + "_dir/")
                tar.close()

    def un_zip(self, filename):
        zip_file = zipfile.ZipFile(filename)
        # 类似tar解除打包，建立文件夹存放解压的多个文件
        if not os.path.isdir(filename + "_dir"):
            os.mkdir(filename + "_dir")
            for names in zip_file.namelist():
                zip_file.extract(names, filename + "_dir/")
                zip_file.close()

    def un_rar(self, pwd="None"):
        rar = rarfile.RarFile(self._filename)
        if not os.path.isdir(self._filename[:-4] + "_dir"):
            os.mkdir(self._filename[:-4] + "_dir")
            os.chdir(self._filename[:-4] + "_dir")
            print(pwd)
            rar.extractall(pwd=pwd)
            rar.close()

    def decompression(self, dir):
        """
        处理文件夹下，不同类型的压缩文件
        """
        filename_list = [os.path.basename(i) for i in glob.iglob(dir + '/*')]
        for filename in filename_list:
            print(filename)

            # 有些文件没有后缀名，因此可能不存在 .，这时用 filename.split('.')[-1]会报错，因此需要先判断
            if '.' in filename:
                # 获取后缀名
                suffix = filename.split('.')[-1]
                # 逐个将后缀名和各格式的压缩后缀匹配
                # 以.gz 结尾的文件，解压后需要再次判断是否是以 .tar 结尾，然后我们就可以分别将四种压缩文件的解压代码写成函数，符合时候单独调用即可
                if suffix == 'gz':  # filename.gz
                    new_filename = self.un_gz(filename)
                    # 再次判断新产生的文件名是否以 .tar 结尾
                    if new_filename.split('.')[-1] == 'tar':
                        self.un_tar(new_filename)
                if suffix == 'tar':  # filename.tar.gz
                    self.un_tar(new_filename)
                if suffix == 'zip':  # filename.zip
                    self.un_zip(filename)
                if suffix == 'rar':  # filename.rar
                    print('rar')
                    self.un_rar(filename)


if __name__ == '__main__':
    obj = Zip('/app/tag/ods/2022审计档案.rar')
    obj.un_rar(pwd='8321055')
