import requests

# 指定url    
url = "https://wwww.baidu.com/"
# 指定请求头 
# Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.51
# 构建请求头字典
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.51"
}
# 没有请求头
response_no_headers = requests.get(url)
print(len(response_no_headers.content.decode())) # 2287
print(response_no_headers.request.headers) # {'User-Agent': 'python-requests/2.30.0', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive'}
# 发送带请求头的
response_with_headers = requests.get(url, headers=headers)
print(len(response_with_headers.content.decode())) # 385342 携带了请求头，获取到了更多的数据
print(response_with_headers.request.headers) # {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.51', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive'}

