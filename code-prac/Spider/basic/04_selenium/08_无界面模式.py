# selenium 4
from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from time import sleep
url = 'https://www.baidu.com'

# 设置Edge浏览器的驱动路径
edge_driver_path = './msedgedriver'

# 创建Edge浏览器的选项对象
options = Options()
# 可根据需要添加更多的选项
options.add_argument('--headless')
options.add_argument('--disable-gpu')

# 创建Edge浏览器的服务对象
service = Service(edge_driver_path)

# 创建Edge浏览器的WebDriver对象
driver = webdriver.Edge(service=service, options=options)

# 打开网页
driver.get('https://msedgewebdriverstorage.z22.web.core.windows.net/')

# 进行其他操作，例如查找元素、点击按钮等
sleep(3)
driver.save_screenshot('08.png')
# 关闭浏览器
driver.quit()

