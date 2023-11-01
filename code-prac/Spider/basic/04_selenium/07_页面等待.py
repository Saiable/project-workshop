from time import sleep
from selenium import webdriver
import json
driver = webdriver.Edge(executable_path = './msedgedriver')
# 设置隐式等待，所有元素定位操作，都有最大的等待时间，超过10秒后将会报错
driver.implicitly_wait(10)
url = 'https://www.baidu.com'
driver.get(url)
el = driver.find_element_by_xpath('//*[!id="lg"]/img[1000]')
print(el)
