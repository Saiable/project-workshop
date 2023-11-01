from time import sleep
from selenium import webdriver

driver = webdriver.Edge(executable_path = './msedgedriver')
url = 'http://www.baidu.com'
driver.get(url)
# driver.find_element_by_id('kw').send_keys('python')
# driver.find_element_by_xpath('//*[@id="kw"]').send_keys('python')
# driver.find_element_by_css_selector('#kw').send_keys('python')
driver.find_element_by_class_name('s_ipt').send_keys('python')