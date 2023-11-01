import requests
from lxml import etree

url = 'https://bj.58.com/ershoufang/'
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188"
}
def ershoufang():    
    # response = requests.get(url=url,headers=headers)    
    # response_text = response.text    
    # with open('58.html', 'w', encoding='utf-8') as fw:
    #     fw.write(response_text)
    with open('58.html', 'r', encoding='utf-8') as fr:
        content = fw.write(fr.read())
    tree = etree.HTML(content)
    name_list = tree.xpath('//section[@class="list"]//p[@class="property-content-info-comm-name"]')    
    for div in name_list:        
        title = div.xpath('.//div[@class="property-content-title"]/h3/text()')[0]        
        print(title)        
        
ershoufang()