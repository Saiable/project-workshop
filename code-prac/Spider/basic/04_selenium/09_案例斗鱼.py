from selenium import webdriver

class Douyu(object):

    def __init__(self):
        self.url = 'https://www.douyu.com/directory/all'
        self.driver = webdriver.Edge(executable_path='./msedgedriver')
        self.driver.implicitly_wait(10)
    def parse_data(self):
        room_list = self.driver.find_elements_by_xpath('//section[@class="layout-Module js-ListContent"]/*/ul/li')
        print(len(room_list))
        data_list = []
        for room in room_list:
            temp = {}

            temp['title'] = room.find_element_by_xpath('./div/a/div[2]/div[1]/h3').text
            temp['type'] = room.find_element_by_xpath('./div/a/div[2]/div[1]/span').text
            temp['owner'] = room.find_element_by_xpath('./div/a/div[2]/div[2]/h2/div').text
            temp['num'] = room.find_element_by_xpath('./div/a/div[2]/div[2]/span').text
            # temp['pic'] = room.find_element_by_xpath('./div/a/div[1]/div[1]/picture/img').get_attribute('src') # 需要往下拖动
            print(temp)
            data_list.append(temp)
        return data_list
    def save_data(self, data_list):
        with open('09.json', 'a', encoding='utf-8') as fw:
            fw.write(str(data_list))
    def run(self):
        self.driver.get(self.url)
        while True:
            data_list = self.parse_data()
            self.save_data(data_list)
            try:
                el_next = self.driver.find_element_by_xpath('//*[contains(text(),"下一页")]')
                # 下拉
                self.driver.execute_script('window.scrollTo(0,10000)')
                el_next.click()
            except:
                break
if __name__ == '__main__':
    douyu = Douyu()
    douyu.run()