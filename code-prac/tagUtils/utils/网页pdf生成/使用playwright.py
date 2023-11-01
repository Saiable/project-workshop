from playwright.sync_api import sync_playwright

def save_div_as_pdf(url, output_path, target_class, pdf_config):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # 导航到指定页面
        page.goto(url)

        # 等待页面加载完成
        page.wait_for_load_state('networkidle')

        # 使用页面评估来获取类名为"box_content"的div的内容
        div_content = page.evaluate(f'(async () => {{ return document.querySelector(".{target_class}").innerHTML; }})()')

        # 创建一个新的临时页面，将div的内容渲染到该页面
        temp_page = browser.new_page()
        temp_page.set_content(div_content)

        # 将临时页面的内容保存为PDF文件，并使用传入的配置参数
        temp_page.pdf(path=output_path, **pdf_config)

        # 关闭浏览器
        browser.close()

if __name__ == "__main__":
    # 设置要保存的页面URL、输出PDF文件路径和目标div类名
    url_to_save = 'http://gks.mof.gov.cn/guizhangzhidu/201511/t20151116_1564634.htm'
    pdf_output_path = 'box_content_output.pdf'
    target_div_class = 'box_content'

    # 配置参数字典
    pdf_config = {
        'margin': {
            'left': '20px',
            'right': '20px',
            'top': '40px',
            'bottom': '40px'
        }
        # 在这里可以添加其他配置参数
    }

    save_div_as_pdf(url_to_save, pdf_output_path, target_div_class, pdf_config)
