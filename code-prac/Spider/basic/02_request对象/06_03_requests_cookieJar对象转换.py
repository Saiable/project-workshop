import requests

url = 'https://www.baidu.com'
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.51"
}
response = requests.get(url, headers=headers)
print(response.cookies)
cookies_dict = requests.utils.dict_from_cookiejar(response.cookies)
print(cookies_dict)
cookie_jar = requests.utils.cookiejar_from_dict(cookies_dict)
print(cookie_jar)

# <RequestsCookieJar[<Cookie BAIDUID=B769B49A969318E68D1A355D558EEE3B:FG=1 for />, <Cookie BAIDUID_BFESS=B769B49A969318E6ABAA167F9536E529:FG=1 for />, <Cookie BDSVRTM=0 for />, <Cookie BD_HOME=1 for />, <Cookie BIDUPSID=B769B49A969318E6ABAA167F9536E529 for />, <Cookie H_PS_PSSID=38516_36555_38687_38881_38903_38792_38844_38831_38811_38826_38839_38639_26350 for />, <Cookie PSTM=1687664041 for />]>