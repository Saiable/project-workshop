import requests
from requests.exceptions import RequestException

url = 'http://example.com'  # 将此处替换为你要请求的URL
try:
    response = requests.get(url)
    response.raise_for_status()  # 检查是否有请求错误
except RequestException as e:
    print("请求错误:", e)
    # 处理请求错误的情况
    response = None

if response is not None:
    encoding = response.encoding  # 获取响应的编码
    content_type = response.headers.get('content-type', '').lower()  # 获取Content-Type头部

    # 处理Content-Type头部中的编码信息
    if 'charset' in content_type:
        encoding = content_type.split('charset=')[-1]

    # 使用正确的编码对响应内容进行解码
    try:
        decoded_content = response.content.decode(encoding)
    except UnicodeDecodeError:
        decoded_content = response.text  # 若解码失败，使用默认的Unicode解码

    # 现在你可以使用decoded_content来处理网页内容了