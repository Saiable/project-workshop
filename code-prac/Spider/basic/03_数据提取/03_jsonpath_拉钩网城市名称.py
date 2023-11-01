import requests
from jsonpath import jsonpath
import json

class CityName():
    def __init__(self):
        self.url = 'https://www.lagou.com/lbs/getAllCitySearchLabels.json'
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.51"
        }

    def run(self):
        response = requests.get(url=self.url, headers=self.headers)
        print(type(response.text))
        json_response = json.loads(response.text)
        print(jsonpath(json_response, '$..name')) 

if __name__ == '__main__':
    city = CityName()
    city.run()