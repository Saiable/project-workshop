import pandas as pd
from itertools import combinations
# 基于excel表字段，构造问答对
def gen_file(filename, filed_nums):
    # 读取 Excel 文件数据
    df = pd.read_excel(filename + '.xlsx', engine='openpyxl')

    # 获取所有字段名
    fields = list(df.columns)
    # 剔除指定字段，如 '回款金额_创投'
    fields_to_exclude = [filename]
    fields = [field for field in fields if field not in fields_to_exclude]

    # 从 1 到 fields 列表的最大数量进行组合，并构建问答对样例
    with open(filename+'.txt', 'w') as file:
        for _, row in df.iterrows():
            # for num_fields_to_combine in range(1, len(fields) + 1):
                # combinations_list = list(combinations(fields, num_fields_to_combine))
            combinations_list = list(combinations(fields, filed_nums))
            for comb in combinations_list:
                question = "问："
                answer = "答："
                conditions = []
                for field in comb:
                    question += "{}为{}，".format(field, row[field])
                    conditions.append(f"{field}={row[field]}")
                question_part = filename + "是多少？"
                question += "\n".join([question_part, filename + "\n"])
                question += " and ".join(conditions)


                answer += filename + "为{}。".format(row[filename])
                file.write(question + "\n")
                file.write(answer + "\n\n")  # 写入答案和空行，用于分隔问答对

if __name__ == '__main__':
    gen_file('非上市退出项目平均投资回报倍数_创投', 4)