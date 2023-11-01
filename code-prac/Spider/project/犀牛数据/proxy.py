# -*- encoding: utf-8 -*-
'''
@File    :   proxy.py
@Version :   1.0
@Desc    :   None
'''

# import lib here
import requests
import json


def get_proxies():
    url = 'http://webapi.http.zhimacangku.com/getip?num=1&type=2&pro=0&city=0&yys=0&port=1&time=1&ts=0&ys=0&cs=0&lb=1&sb=0&pb=4&mr=1&regions='
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.203',
    }
    response = requests.get(url=url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        if data.get("success") and data.get("data"):
            proxy_info = data["data"][0]
            ip = proxy_info["ip"]
            port = proxy_info["port"]
            proxies = {
                "http": f"http://{ip}:{port}",
                # "https": f"https://{ip}:{port}"
            }
            return proxies
        else:
            print("Error: Failed to get valid proxy data.")
    else:
        print("Error: Failed to fetch proxy data.")


if __name__ == '__main__':
    proxy = get_proxies()
    print(proxy)