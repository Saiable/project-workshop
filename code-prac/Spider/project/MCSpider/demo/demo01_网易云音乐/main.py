
import requests
import sys
import pandas

utils_path = r"/app/code/project-workshop/code-prac/Spider/spider_utils"
sys.path.append(utils_path)

from proxy import get_proxies
from ua import fake_ua

proxies = get_proxies()
ua = fake_ua()

def parse():
    pass
def main():
    url = "https://music.163.com/discover/toplist" # 热歌榜
    params = {
    'id': '3778678',
    }

    headers = {
        "User-Agent": ua
    }
    
    response = requests.get(url=url,proxies=proxies,headers=headers,params=params).text
    print(response)
    with open('热歌榜.html', 'w', encoding='utf-8') as fw:
        fw.write(response)

def get_m4a():
    import requests

    headers = {
        'authority': 'm701.music.126.net',
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'range': 'bytes=0-',
        'referer': 'https://music.163.com/',
        'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Microsoft Edge";v="116"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'audio',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': ua
    }

    response = requests.get(
        'https://m701.music.126.net/20230906143533/b861e70c2985e5007eb8228f35186068/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/28133411020/b5d7/3857/ac5c/1274e257b2e91849e3290c8b53709ba5.m4a',
        headers=headers,
    )
if __name__ == '__main__':
    main()