from time import sleep
from selenium import webdriver

driver = webdriver.Edge(executable_path = './msedgedriver')
url = 'http://www.baidu.com'

# 控制浏览器访问url地址
driver.get(url)
# print(driver.page_source) # 网页源码
print(driver.current_url) # https://www.baidu.com/
print(driver.title)

sleep(2)

driver.get('http://www.douban.com')
sleep(2)
driver.save_screenshot('douban.png')
driver.back()
sleep(2)
# 退出浏览器
driver.quit()