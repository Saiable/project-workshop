import requests

url = 'https://www.google.com'
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.51"
}

response = requests.get(url, headers=headers, timeout=3)
# requests.exceptions.ConnectTimeout: HTTPSConnectionPool(host='www.google.com', port=443): Max retries exceeded with url: / (Caused by ConnectTimeoutError(<urllib3.connection.HTTPSConnection object at 0x7f9aacde3220>, 'Connection to www.google.com timed out. (connect timeout=3)'))