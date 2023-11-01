from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
# 需要selenium4
driver = webdriver.Edge()
driver.get('https://www.baidu.com')

# 显式等待
'''
    # 参数20表示最长等待20秒
    # 参数0.5表示每0.5秒检查一次规定的标签是否存在
    # EC.presence_of_element_located(By.LINK_TEXT, '好123') 表示通过链接文本内容定位位置
    # 每0.5秒进行一次检查，通过链接文本内容定位标签是否存在，如果存在就向下继续执行；如果不存在，重复定位直到20秒上限就报错
'''
WebDriverWait(driver, 20, 0.5).until(
    EC.presence_of_element_located(By.LINK_TEXT, '好123')
)