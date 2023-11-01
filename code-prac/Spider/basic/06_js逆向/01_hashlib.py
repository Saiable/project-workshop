import hashlib
data = 'python'

# 创建hash对象
md5 = hashlib.md5()
# 向hash对象中添加需要做hash运算的字符串
md5.update(data.encode())
# 获取字符串的hash值
result = md5.hexdigest()

print(result)