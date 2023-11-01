import requests
import json
import sys
# @TODO 1.自动更新params参数的中的sign。2.支持不同语言的互相翻译
class King(object):
    def __init__(self, word):
        self.word = word
        self.url = 'https://ifanyi.iciba.com/index.php'
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.51"
        }
        # sign会过期
        self.params = {
            'c': 'trans', 'm': 'fy', 'client': '6', 'auth_user': 'key_web_fanyi', 'sign': 'd5dc97e74b159da2'
        }
        self.data = {'from': 'zh', 'to': 'en', 'q': self.word}
    def get_data(self):
        response = requests.post(url=self.url, headers=self.headers, params=self.params, data = self.data)
        return response.content.decode()
    def parse_data(self, data):
        try:
            dict_data = json.loads(data)
            print(dict_data['content']['out'])
        except:
            print('error')
    def run(self):
        data_response = self.get_data()
        print(data_response)
        self.parse_data(data_response)

if __name__ == '__main__':
    word = sys.argv[1]
    king = King(word)
    king.run()