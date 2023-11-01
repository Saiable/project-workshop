from time import sleep
from selenium import webdriver
import json
driver = webdriver.Edge(executable_path = './msedgedriver')

driver.get('https://www.taobao.com')
sleep(1)
for i in range(10):
    i += 1
    try:
        sleep(3)
        element = driver.find_element_by_xpath('//div[@class="shop-inner"]/h3[1]/a')
        print(element.get_attribute('href'))
        break
    except:
        js = 'window.scrollTo(0,{})'.format(i*500)
        driver.execute_script(js)
    
driver.quit()