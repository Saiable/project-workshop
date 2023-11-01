import requests

headers = {
    'Accept': '*/*',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'Connection': 'keep-alive',
    'Origin': 'https://www.ishumei.com',
    'Referer': 'https://www.ishumei.com/trial/captcha.html',
    'Sec-Fetch-Dest': 'script',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188',
    'sec-ch-ua': '"Not/A)Brand";v="99", "Microsoft Edge";v="115", "Chromium";v="115"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
}

params = {
    'ra': 'hxr/MjNHA9Q=', # 变化
    'ml': 'jIMH9Nqk+AENn//Xs7iHWff3lKevt297', # 变化
    'ee': 'b6/OUymOq6je7Wbu0+VkXfdYSQU4SgBGVtzNwGItgbVHMpXnjP7oxlVMQDEzstcy2iD9dgq5FVxu23c8mvH7fzCF0d5UsCzjnSjOC85sZjg2JeY6M8eTD/4JuVBcnHTdQHkabMvaQyZylKnZpCsd3A==', # 变化
    'callback': 'sm_1693773372016', # 变化
    'organization': 'd6tpAY1oV0Kv5jRSgxQr', # 同频字段
    'sdkver': '1.1.3', # 同频字段
    'rversion': '1.0.4', # 同频字段
    'rid': '2023090404364815c0f648a85b41af37', # 由加载验证码的接口返回
    'captchaUuid': '202309040434008Ji5eJxzjeMzTR4peX', # 验证码id，刷新页面会变化，同一个会话不会变化
    'ostype': 'web', # 无变化
    'us': 'zY8brT9SISY=', # 无变化
    'hd': 'w6ArMUdGI6s=', # 无变化
    'xy': 'xIAv2QAUoJA=', # 无变化
    'jn': 'w6ook9DZFNo=', # 无变化
    'ma': 'Ku1yrQmmWo8=', # 无变化
    'protocol': '179', # 无变化
    'act.os': 'web_pc', # 无变化
    'xc': 'MPQBHp3MK74=', # 无变化
    'jv': 'tnws0FUkt6c=', # 无变化
    'qu': 'Q/IW6xhk8TI=', # 无变化
    'rj': 'LpMN9yrHH3I=', # 无变化
}

response = requests.get('https://captcha1.fengkongcloud.cn/ca/v2/fverify', params=params, headers=headers)