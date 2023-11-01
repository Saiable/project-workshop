import requests

# url = 'https://www.baidu.com/s?wd=python'
url = 'https://www.baidu.com/s'

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.51"
}
kw = {
    'wd': 'python'
}
response = requests.get(url, headers=headers, params=kw)

print(response.request.url) # https://www.baidu.com/s/?wd=python

response_content = response.content.decode()
with open('05_02.html', 'w', encoding='utf-8') as fw:
    fw.write(response_content)