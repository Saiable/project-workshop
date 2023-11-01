import requests
import execjs

js_code = ''
with open('./demo.js', 'r', encoding='utf-8') as fr:
    js_code = fr.read()
ctx = execjs.compile(js_code)
cookie = ctx.call('run')
key = cookie.split('=')[0]
value = cookie.split('=')[1]
cookies = {
    key: value,
}
print('a', cookie)


headers = {
    'authority': 'www.ontariogenomics.ca',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'cache-control': 'max-age=0',
    'cookie': cookie,
    'referer': 'https://www.ontariogenomics.ca/news-events/',
    'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Microsoft Edge";v="116"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.62',
}

response = requests.get('https://www.ontariogenomics.ca/news-events/', headers=headers).text
print(response)