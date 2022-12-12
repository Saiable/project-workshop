import pandas as pd
import os
data = pd.read_csv("./tb_sh_purchase_notice.csv")
data.head()
num = 0
#按行读取csv数据
for line in data.values: 
    # print (line)
    num += 1
    print(num)
    # print(type(line[0]))
    if 'textarea' in line[0]:
        newLine = line[0].replace('textarea', 'span')
        
        print('yes')
        #第一列作为txt文件名
        with open('res/%s.html'%str(num),'a+',encoding = 'utf-8') as fw:
            #第二列作为txt内容
            fw.write((str(newLine)))
    else:
        print('no')
        with open('res/%s.html'%str(num),'a+',encoding = 'utf-8') as fw:
            #第二列作为txt内容
            fw.write((str(line[0])))
