from urllib.parse import urlencode
from urllib.parse import urlparse, parse_qs


class Convert(object):
    def __init__(self):
        pass

    def dict_to_query(self, url, params_dict):
        return url + '?' + urlencode(params_dict)

    def url_to_dict(self, url):
        query = urlparse(url).query
        # 将字符串转换为字典
        # 所得的字典的value都是以列表的形式存在，若列表中都只有一个值
        params = parse_qs(query)
        result = {key: params[key][0] for key in params}
        return result


if __name__ == '__main__':
    url = r'https://ifanyi.iciba.com/index.php?commit=Sign+in&authenticity_token=ahUkEoObojrd87NtGWTGGUDw0hiuyb9ssdITnt1NTU%2FXPyo5MoqhLNcTDRi0P4TFjWcx1pUczhNyG43AfEOGKg%3D%3D&login=mindcons&password=gi%40tMid%23123&webauthn-conditional=undefined&javascript-support=true&webauthn-support=supported&webauthn-iuvpaa-support=unsupported&return_to=https%3A%2F%2Fgithub.com%2Flogin&allow_signup=&client_id=&integration=&required_field_c4fd=&timestamp=1688020307382&timestamp_secret=99b817e7a8c3623cb2a980ab4815ca4ca1689ad6bce9d71b50bd2420a5327d88'
    ins = Convert()

    res = ins.url_to_dict(url)
    print(res)
