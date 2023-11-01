from time import sleep
from selenium import webdriver

driver = webdriver.Edge(executable_path = './msedgedriver')
url = 'https://jn.58.com/'
driver.get(url)
print(driver.current_url) # https://jn.58.com/
print(driver.window_handles) # ['00D09D20C37EC988C45DBFEE9575142B']

# 定位并点击“租房”按钮
el = driver.find_element_by_xpath('//*[@id="fcNav"]/*/a[@tongji_tag="pc_home_dh_zf"]')
el.click()
print(driver.current_url) # https://jn.58.com/ 操作权还没有切换
print(driver.window_handles) # ['AC534938D0295589F1F85C665EA181EA', '3084128DB37C2719E27400EDDB8FD179']

# 切换窗口
driver.switch_to.window(driver.window_handles[-1])

title_list = driver.find_elements_by_xpath('//*[@class="des"]/h2/a')
print(len(title_list)) # 122