# -*- encoding: utf-8 -*-
'''
@File    :   11_requests_session登陆github.py
@Time    :   2023/06/29 09:04:48
@Version :   1.0
@Desc    :   
    # 创建session对象
    # 设置headers

    # url1-获取token
        # 发送请求获取响应
        # 正则提取
    
    # url2-登陆
        # 构建表单数据
        # 发送请求登陆
    
    # url3-验证
'''

# import lib here
import requests
import re


class Github():
    def __init__(self):
        self.session = requests.Session()
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.51"
        }
        self.token = ''
        self.data = {
            'commit': 'Sign in',
            'authenticity_token': self.token,
            'login': 'mindcons',
            'password': 'gi@tMid#123',
            'webauthn-conditional': 'undefined',
            'javascript-support': 'true',
            'webauthn-support': 'supported',
            'webauthn-iuvpaa-support': 'unsupported',
            'return_to': 'https://github.com/login',
            'timestamp': '1688020307382',
            'timestamp_secret': '99b817e7a8c3623cb2a980ab4815ca4ca1689ad6bce9d71b50bd2420a5327d88'
        }

    def get_token(self, url1):
        response = self.session.get(
            url1, headers=self.headers).content.decode()
        self.token = re.findall(
            'name="authenticity_token" value="(.*?)"', response)

    def login(self, url2):
        response = self.session.post(
            url2, headers=self.headers, data=self.data)

    def login_check(self, url3):
        response = self.session.get(url3)
        with open('11.html', 'w', encoding='utf-8') as fw:
            fw.write(response.text)


if __name__ == '__main__':
    ins = Github()
    url1 = 'https://github.com/login'
    url2 = 'https://github.com/session'
    url3 = 'https://github.com/mindcons'
    ins.get_token(url1)
    print(ins.token)
    ins.login(url2)
    ins.login_check(url3)
