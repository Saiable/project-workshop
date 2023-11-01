import json
from jsonpath import jsonpath
import pandas as pd
import glob

def get_file():
    filename = glob.glob('./*.json')
    print(filename)
    return filename

for file in get_file():
    infile = file
    outfile =  file.split('.json')[0] + '_outcome'+ '.xlsx'
    with open(infile, 'r', encoding='utf-8') as fr:
        content = json.load(fr)
        item_list = jsonpath(content, '$[*]')
        df = pd.DataFrame(columns=['id', 'key', 'value'])
        for item in item_list:
            id = jsonpath(item, '$.id')
            key_list = jsonpath(item, '$..value.labels[*]')
            value_list = jsonpath(item, '$..value.text')
            if(key_list != False and value_list != False):
                for key, value in zip(key_list, value_list):
                    new_row = {'id': id[0], 'key': key, 'value': value}
                    df.loc[len(df)] = new_row
        sorted_df = df.sort_values(by='key')
        sorted_df.to_excel(outfile, index=False)

