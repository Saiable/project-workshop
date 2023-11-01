import requests

url = "https://www.baidu.com"

response = requests.get(url)
# 响应的url；有时候响应的url和请求的url并不一致
print(response.url)

# 响应状态码
print(response.status_code) # 状态码并不一定可信

# 响应对应的请求对象
print(response.request) # <PreparedRequest [GET]>
# 响应对应请求对象的请求头，User-Agent（UA）就明确告诉人家，我是一个python-request/2.30.0模块，而不是浏览器
print(response.request.headers) # {'User-Agent': 'python-requests/2.30.0', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive'}
# 响应头，注意下Set-Cookie字段
print(response.headers) # {'Cache-Control': 'private, no-cache, no-store, proxy-revalidate, no-transform', 'Connection': 'keep-alive', 'Content-Encoding': 'gzip', 'Content-Type': 'text/html', 'Date': 'Wed, 21 Jun 2023 00:38:49 GMT', 'Last-Modified': 'Mon, 23 Jan 2017 13:23:55 GMT', 'Pragma': 'no-cache', 'Server': 'bfe/1.0.8.18', 'Set-Cookie': 'BDORZ=27315; max-age=86400; domain=.baidu.com; path=/', 'Transfer-Encoding': 'chunked'}


# 响应设置的cookie，是一个CookeJar对象
print(response.cookies) # <RequestsCookieJar[<Cookie BDORZ=27315 for .baidu.com/>]> 
