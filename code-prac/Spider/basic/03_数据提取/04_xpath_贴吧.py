import requests
from lxml import etree

class Tieba():
    def __init__(self, name):
        self.url = 'https://tieba.baidu.com/f?kw={}'.format(name)
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.51"
        }
    def get_data(self, url):
        response = requests.get(url, headers=self.headers)
        return response.content
    def parse_data(self, data):
        # 返回的实际html，百度直接给注释了
        data = data.decode().replace("<!--", "").replace("-->", "")
        # 去掉html标签中的display:none;
        data = data.replace("display:none", "display:block")
        # with open('04.html', 'w', encoding='utf-8') as fw:
        #     fw.write(data)


        html = etree.HTML(data)
        # print(html)
        title_xpath = '//*[@id="thread_list"]/li//div/a/text()'
        title_list = html.xpath(title_xpath)
        # print(title_list)

        try: 
            # 获取下一页url
            # next_url_xpath = '//*[@id="frs_list_pager"]//a[@class="next pagination-item"]/@href'
            next_url_xpath = '//a[contains(text(), "下一页")]/@href'
            next_url = 'https:' + html.xpath(next_url_xpath)[0]
            # print(next_url)
        except:
            next_url = None

        return title_list, next_url
    
    def save_data(self, data_list):
        for data in data_list:
            print(data)
    def run(self):
        next_url = self.url
        num = 0
        while True:
            if next_url == None:
                break
            data = self.get_data(next_url)
            title_list, next_url = self.parse_data(data)
            print(next_url)
            self.save_data(title_list)
            num += 1
            if num == 3:
                break


if __name__ == '__main__':
    tieba = Tieba('rust')
    tieba.run()
