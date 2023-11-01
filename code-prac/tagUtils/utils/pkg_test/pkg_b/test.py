import os
from os.path import join, getsize
print(os.walk('/app/tag/utils/pkg_test'))
# for root, dirs, files in os.walk('/app/tag/utils/pkg_test'):
    # print(root)
    # 目标文件夹，以及所有的子文件夹
    # /app/tag/utils/pkg_test
    # /app/tag/utils/pkg_test/pkg_b
    # /app/tag/utils/pkg_test/pkg_b/__pycache__
    # /app/tag/utils/pkg_test/pkg_a
    # /app/tag/utils/pkg_test/pkg_a/__pycache__

    # print(dirs)
    # 每个文件夹下，所拥有的子文件夹列表
    # ['pkg_b', 'pkg_a']
    # ['__pycache__']
    # []
    # ['__pycache__']
    # []
    # print(files)
    # 每个文件夹下，所拥有的文件列表
    # []
    # ['test.py', '__init__.py']
    # ['__init__.cpython-38.pyc', 'test.cpython-38.pyc']
    # ['module_a.py', 'module_b.py', '__init__.py']
    # ['__init__.cpython-38.pyc', 'module_a.cpython-38.pyc']
    # for name in files:
    #     print(name, join(root, name))
    # print(dirs)