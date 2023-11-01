import requests
import execjs
import json
headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Origin': 'https://www.qimingpian.com',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.203',
    'sec-ch-ua': '"Not/A)Brand";v="99", "Microsoft Edge";v="115", "Chromium";v="115"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
}

data = {
    'time_interval': '',
    'tag': '',
    'tag_type': '',
    'province': '',
    'lunci': '',
    'page': '1',
    'num': '20',
    'unionid': '',
}

response = requests.post('https://vipapi.qimingpian.cn/DataList/productListVip', headers=headers, data=data)

encrypt_data = json.loads(response.text)["encrypt_data"]

js_code = ''
with open('./demo.js', 'r', encoding='utf-8') as fr:
    js_code = fr.read()
ctx = execjs.compile(js_code)
result = ctx.call("s", encrypt_data)
print(result)
with open('./result.json', 'w', encoding='utf-8') as fw:
    fw.write(str(result))