import sys
utils_path = r"/app/code/project-workshop/code-prac/Spider/spider_utils"
sys.path.append(utils_path)

from proxy import get_proxies
from ua import fake_ua
import requests
import execjs
import json

proxies = get_proxies() # 可以取消

# 需要更新
headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json;charset=UTF-8',
    'Origin': 'https://ggzyfw.fujian.gov.cn',
    'Referer': 'https://ggzyfw.fujian.gov.cn/business/list/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.203',
    'portal-sign': '6d6c4965262e8066869490630352e007',
    'sec-ch-ua': '"Not/A)Brand";v="99", "Microsoft Edge";v="115", "Chromium";v="115"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
}
# 需要更新
json_data = {
    'pageNo': 2,
    'pageSize': 20,
    'total': 4184,
    'AREACODE': '',
    'M_PROJECT_TYPE': '',
    'KIND': 'GCJS',
    'GGTYPE': '1',
    'PROTYPE': '',
    'timeType': '6',
    'BeginTime': '2023-02-28 00:00:00',
    'EndTime': '2023-08-28 23:59:59',
    'createTime': [],
    'ts': 1693208324512,
}
response = requests.post('https://ggzyfw.fujian.gov.cn/FwPortalApi/Trade/TradeInfo', headers=headers, json=json_data, proxies=proxies)


print(response.text)
json_response = json.loads(response.text)
encrypt_data = json_response['Data']
# 读取JavaScript代码文件
with open("demo.js", "r") as file:
    js_code = file.read()

# 创建一个ExecJS上下文
ctx = execjs.compile(js_code)

# 使用上下文执行JavaScript函数
result = ctx.call("b", encrypt_data)
print(result)  # 输出明文