from time import sleep
from selenium import webdriver
import json
driver = webdriver.Edge(executable_path = './msedgedriver')
url = 'https://www.baidu.com'
driver.get(url)

print(driver.get_cookies())
# 场景：有的网站非常复杂，可以先用selenium登陆获取cookie，再用requests模块进行处理
