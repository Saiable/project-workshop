import os,json,time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

chrome_options = webdriver.ChromeOptions()

settings = {
    # 目的打印机, 另存为
    "recentDestinations": [{
        "id": "Save as PDF",
        "origin": "local",
        "account": ""
    }],
    "selectedDestinationId": "Save as PDF",
    "version": 2,
    # 是否启用页眉-页脚
    "isHeaderFooterEnabled": False,

    # "customMargins": {},
    # "marginsType": 2,
    # "scaling": 100,
    # "scalingType": 3,
    # "scalingTypePdf": 3,
    "isLandscapeEnabled":True,#landscape横向，portrait 纵向，若不设置该参数，默认纵向
    # 背景图形
    "isCssBackgroundEnabled": True,
    # 纸张尺寸
    "mediaSize": {
        "height_microns": 297000,
        "name": "ISO_A4",
        "width_microns": 210000,
        "custom_display_name": "A4 210 x 297 mm"
    },
}
# 开启打印功能
chrome_options.add_argument('--enable-print-browser')
#chrome_options.add_argument('--headless') #headless模式下，浏览器窗口不可见，可提高效率
# 首选项
prefs = {
    'printing.print_preview_sticky_settings.appState': json.dumps(settings),
    'savefile.default_directory': 'your file path' #此处填写你希望文件保存的路径
}
chrome_options.add_argument('--kiosk-printing') #静默打印，无需用户点击打印页面的确定按钮
chrome_options.add_experimental_option('prefs', prefs)


driver = webdriver.Chrome("./chromedriver", options=chrome_options)
driver.get('your URL')
driver.maximize_window()
# time.sleep(7)
driver.execute_script('document.title="my_test_file1.pdf";window.print();') #利用js修改网页的title，该title最终就是PDF文件名，利用js的window.print可以快速调出浏览器打印窗口，避免使用热键ctrl+P
driver.close()