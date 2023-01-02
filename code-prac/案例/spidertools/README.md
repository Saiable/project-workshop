# spidertools

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Function Tips
- JsonFormat
- HeaderFormat

  origin input
  
  ```BASH
  Accept: text/html,image/*                                            
  Accept-Charset: ISO-8859-1                                      
  Accept-Encoding: gzip,compress                              
  Accept-Language: en-us,zh-cn                                
  Host: www.lks.cn:80                                               
  Referer: http://www.lks.cn/index.html                         
  User-Agent: Mozilla/4.0 compatible; MSIE 5.5; Windows NT 5.0   
  If-Modified-Since: Tue, 11 Jul 2000 18:23:51 GMT   
  Cookie: 123                                
  Connection: close1.0/Keep-Alive1.1                          
  Date: Tue, 11 Jul 2000 18:23:51GMT                       
  Allow:GET                                                                  
  Keep-Alive：5                                                            
  Connection：keep-alive                                             
  Cache-Control：max-age=300                                   
  ```
  format output
  ```json
    {
        "Accept": "text/html,image/*",
        "Accept-Charset": "ISO-8859-1",
        "Accept-Encoding": "gzip,compress",
        "Accept-Language": "en-us,zh-cn",
        "Host": "www.lks.cn:80",
        "Referer": "http://www.lks.cn/index.html",
        "User-Agent": "Mozilla/4.0 compatible; MSIE 5.5; Windows NT 5.0",
        "If-Modified-Since": "Tue, 11 Jul 2000 18:23:51 GMT",
        "Cookie": "123",
        "Connection": "close1.0/Keep-Alive1.1",
        "Date": "Tue, 11 Jul 2000 18:23:51GMT",
        "Allow": "GET",
        "Keep-Alive：5": "",
        "Connection：keep-alive": "",
        "Cache-Control：max-age=300": ""
    }
  ```
- CookieFormat
- DictFormat
- urlParamsParse
- curlFormat

