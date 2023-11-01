import requests

# 指定url    
url = 'https://wwww.sogou.com/'

# 发送get请求，获取响应数据    
response = requests.get(url = url)

print(response)
