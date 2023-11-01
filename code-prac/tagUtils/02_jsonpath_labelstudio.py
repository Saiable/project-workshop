'''
@Desc    :   将标注好的json文件放在同级脚本目录下，直接运行即可，输出为已排序过的xslx，命名后缀添加了outcome
'''
import json
from jsonpath import jsonpath
import pandas as pd
import glob

def get_file():
    filename = glob.glob('./*.json')
    print(filename)
    return filename
def exact_element():
    for file in get_file():
        infile = file
        outfile =  file.split('.json')[0] + '_outcome'+ '.xlsx'
        with open(infile, 'r', encoding='utf-8') as fr:
            content = json.load(fr)
            # 根据实际数据结构，取每个dict
            item_list = jsonpath(content, '$[*]')
            # 创建空的DataFram
            df = pd.DataFrame(columns=['id', 'key', 'value'])
            # 取每个dict中的标注结果
            for item in item_list:
                id = jsonpath(item, '$.id')
                key_list = jsonpath(item, '$..value.labels[*]')
                value_list = jsonpath(item, '$..value.text')
                if(key_list != False and value_list != False):
                    for key, value in zip(key_list, value_list):
                        new_row = {'id': id[0], 'key': key, 'value': value}
                        # 不断新增到DataFrame中
                        df.loc[len(df)] = new_row
            # 按key排序，便于查看
            sorted_df = df.sort_values(by='key')
            sorted_df.to_excel(outfile, index=False)

def main():
    exact_element()


if __name__ == '__main__':
    main()