from time import sleep
from selenium import webdriver
import json
driver = webdriver.Edge(executable_path = './msedgedriver')
url = 'https://www.toutiao.com'
driver.get(url)
sleep(1)

# selenium未提供下拉
js = 'window.scrollTo(0, document.body.scrollHeight)' # 横向滚动宽度， 纵向滚动高度
driver.execute_script(js)
# 如果元素未出现在视口中，就点击触发事件，则会报错
sleep(5)
driver.quit()
