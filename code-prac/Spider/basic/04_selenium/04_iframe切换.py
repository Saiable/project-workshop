from time import sleep
from selenium import webdriver

driver = webdriver.Edge(executable_path = './msedgedriver')
url = 'https://qzone.qq.com'
driver.get(url)

# 通过id切换到iframe
# driver.switch_to.frame('login_frame')
# 通过xpath切换到iframe
el_iframe = driver.find_element_by_xpath('//*[@id="login_frame"]')
driver.switch_to.frame(el_iframe)

driver.find_element_by_id('switcher_plogin').click()
driver.find_element_by_id('u').send_keys('账户')
driver.find_element_by_id('p').send_keys('密码')
driver.find_element_by_id('login_button').click() # 可能会出现验证码，这里跳过
