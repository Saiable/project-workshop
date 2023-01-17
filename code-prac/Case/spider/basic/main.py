import requests 
import time
import json
if __name__ =='__main__':    
    post_url = 'https://fanyi.baidu.com/sug'    
    headers ={        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3947.100 Safari/537.36'    
             }    
    # post请求参数处理（同get请求一致）    
    input_string = input('enter a key:')    
    data = {        
        'kw': input_string    
    }    
    response = requests.post(url = post_url,data = data,headers=headers)    
    dict_obj = response.json()    
    # 持久化存储    
    with open(input_string +'.json','w',encoding='utf-8') as fw:        
        json.dump(dict_obj,fp=fw,ensure_ascii=False)    
        print(dict_obj)