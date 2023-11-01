import requests
import json
import execjs
cookies = {
    'btoken': 'I9A8JIN5OYAAN5WX5MFUOCXLRG7IC2E0',
    'Hm_lvt_42317524c1662a500d12d3784dbea0f8': '1693274460',
    'hy_data_2020_id': '18a3f05d14a525-0aafdc2f987bbd-13462c6c-1879680-18a3f05d14ba3a',
    'hy_data_2020_js_sdk': '%7B%22distinct_id%22%3A%2218a3f05d14a525-0aafdc2f987bbd-13462c6c-1879680-18a3f05d14ba3a%22%2C%22site_id%22%3A211%2C%22user_company%22%3A105%2C%22props%22%3A%7B%7D%2C%22device_id%22%3A%2218a3f05d14a525-0aafdc2f987bbd-13462c6c-1879680-18a3f05d14ba3a%22%7D',
    'sajssdk_2020_cross_new_user': '1',
    'export_notice': 'true',
    'Hm_lpvt_42317524c1662a500d12d3784dbea0f8': '1693275761',
}

headers = {
    'authority': 'www.xiniudata.com',
    'accept': 'application/json',
    'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'content-type': 'application/json',
    # 'cookie': 'btoken=I9A8JIN5OYAAN5WX5MFUOCXLRG7IC2E0; Hm_lvt_42317524c1662a500d12d3784dbea0f8=1693274460; hy_data_2020_id=18a3f05d14a525-0aafdc2f987bbd-13462c6c-1879680-18a3f05d14ba3a; hy_data_2020_js_sdk=%7B%22distinct_id%22%3A%2218a3f05d14a525-0aafdc2f987bbd-13462c6c-1879680-18a3f05d14ba3a%22%2C%22site_id%22%3A211%2C%22user_company%22%3A105%2C%22props%22%3A%7B%7D%2C%22device_id%22%3A%2218a3f05d14a525-0aafdc2f987bbd-13462c6c-1879680-18a3f05d14ba3a%22%7D; sajssdk_2020_cross_new_user=1; export_notice=true; Hm_lpvt_42317524c1662a500d12d3784dbea0f8=1693275761',
    'origin': 'https://www.xiniudata.com',
    'referer': 'https://www.xiniudata.com/report',
    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Linux"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
}

json_data = {
    'payload': 'LBcvXUk5KSgsMnt4Yxh5a0ExV0ZaOgtUJCs+KSVnCBR1RyFIXzwyBTwoLS5dZwhlECZTRFYgIG09OzAhPzZaKiVqJ1lEKxk0KSw8MRp/DhQedkRRST0mRhI+Jy86LEEnMkcbVlEjIylqewIfFGcnLEI7REBmJjVVEiAzIDM2EHUMaGgaQis2NTo1BiFKIDQ9WztYa10zIFcSPDMjMSAQdQxoaBpCKzY1OjUGMlkiMDptJldaXjd2CBYTfm8kIEIgJUEbTEk+IylqewIfFGcmPVMmQhYDYngQISc/JCJnCH1nGWZLXzwyeHJjKydIKic9bTdEUVgmPV0jETYsIiAQY3VaNlxVPGRgZXAk',
    'sig': '5795E6C98A72C8EEB2C9C892FD4BB6D0',
    'v': 1,
}

response = requests.post('https://www.xiniudata.com/api/vip/report/report_list', cookies=cookies, headers=headers, json=json_data)

# Note: json_data will not be serialized by requests
# exactly as it was in the original request.
#data = '{"payload":"LBcvXUk5KSgsMnt4Yxh5a0ExV0ZaOgtUJCs+KSVnCBR1RyFIXzwyBTwoLS5dZwhlECZTRFYgIG09OzAhPzZaKiVqJ1lEKxk0KSw8MRp/DhQedkRRST0mRhI+Jy86LEEnMkcbVlEjIylqewIfFGcnLEI7REBmJjVVEiAzIDM2EHUMaGgaQis2NTo1BiFKIDQ9WztYa10zIFcSPDMjMSAQdQxoaBpCKzY1OjUGMlkiMDptJldaXjd2CBYTfm8kIEIgJUEbTEk+IylqewIfFGcmPVMmQhYDYngQISc/JCJnCH1nGWZLXzwyeHJjKydIKic9bTdEUVgmPV0jETYsIiAQY3VaNlxVPGRgZXAk","sig":"5795E6C98A72C8EEB2C9C892FD4BB6D0","v":1}'
#response = requests.post('https://www.xiniudata.com/api/vip/report/report_list', cookies=cookies, headers=headers, data=data)

encrypt_data = response.json()['d']
jscode = ''
with open('./demo.js', 'r', encoding="utf-8") as fr:
    jscode = fr.read()
ctx = execjs.compile(jscode)
result = ctx.call('decrypt', encrypt_data)
print(result)