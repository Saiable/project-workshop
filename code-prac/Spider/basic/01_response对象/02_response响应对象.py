import requests

# 指定url    
url = 'https://wwww.sogou.com/'

# 发送get请求，获取响应数据    
response = requests.get(url = url)
print(response) # <Response [200]> 响应对象
print(response.encoding) # utf-8

print('*'*20+'response.text\n')
print(response.text) # html

print('*'*20+'response.content\n')
print(response.content) # 响应里的中文未解码

print('*'*20+'response.content.decode()\n')
print(response.content.decode())