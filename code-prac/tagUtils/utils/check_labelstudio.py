# -*- encoding: utf-8 -*-
'''
@File    :   main.py
@Time    :   2023/05/22 15:50:50
@Version :   1.0
@Desc    :   None
'''

# import lib here
import json



if __name__ == '__main__':
    infile = 'project-76-at-2023-05-22-15-31-cef69a23.json'
    tags = ['被处罚人', '地址', '违法时间', '案件编号', '处罚时间', '没收', '拆除', '罚款']
    with open(infile, 'r', encoding='utf-8') as fr:
        content = json.loads(fr.read())
        for item in content:
            id = item['id']
            result = item['annotations'][0]['result']
            for res in result:
                for i in range(len(tags)):
                    if res['value']['labels'][0] == tags[i]:
                        with open(tags[i] + '.txt', 'a', encoding='utf-8') as fw:
                            fw.write(str(id)+'\t' + res['value']['text'] + '\n')