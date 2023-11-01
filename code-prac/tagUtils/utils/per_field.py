import pandas as pd
import warnings
import os
import glob

exclude_cols = ['file_path', 'extend_json', 'image_path', 'image_total_num', 'file_type','all_char_coordinate','image_size_list','update_man','check_record','update_time','status']
folder_path = "/app/tag/dwd/0006_苏粮合同单据_风控/batch_23_单据识别准确率统计/v2/原始结果/"  # 文件夹下的文件命名，以_分割
delimiter = "_"  # 指定分隔符

def get_filename():
    files = glob.glob(os.path.join(folder_path, "*"))
    file_category_list = [os.path.basename(file).split(delimiter)[0] for file in files]
    # print(file_category_list)
    return file_category_list

def exclude_columns(col):
    return col not in exclude_cols and 'sinovatio' not in col

def statistical_accuracy(datatype):
    origin_file = './原始结果/' + datatype + '_原始.xls'
    check_file = './核验结果/' + datatype + '_核验.xls'
    res_file = './res/要素准确率_' + datatype + '.xlsx'
    res_perfile = './res/单文件准确率_' + datatype + '.xlsx'
    whole_res_file = './res/整体准确率'
    with warnings.catch_warnings(record=True):
        warnings.simplefilter("always")
        df1 = pd.read_excel(origin_file,  engine="openpyxl", usecols=exclude_columns)
        df2 = pd.read_excel(check_file,  engine="openpyxl", usecols=exclude_columns)

        # 合并数据帧
        df = pd.concat([df1, df2], ignore_index=True)
        print(df.groupby('file_name'))
        # 根据 'file_name' 字段分组，并计算相等和不相等的字段数量
        grouped = df.groupby('file_name').apply(lambda x: x.iloc[:, 1:].nunique(dropna=False) == 1)

        # 计算总共字段占比
        # 展平为一维序列
        flattened = grouped.values.flatten() # 降为一维数组
        flattened_true_percentage = flattened.sum() / len(flattened) # True的数量 / 总数量
        with open(whole_res_file+'_' + str(flattened_true_percentage)[:6] + '_' + datatype +'.txt', 'w', encoding='utf-8') as fw:
            fw.write(str(flattened_true_percentage))

        # 计算每个字段要素占比（按列统计）
        # 得到DataFrame的行数
        field_count = len(grouped)
        # 计算相等占比（准确率）
        equal_percentage = (grouped == True).sum() / field_count
        df_equal_percentage = pd.DataFrame(equal_percentage, columns=['单要素正确率'])
        df_sorted_equal_percentage = df_equal_percentage.sort_values(by='单要素正确率', ascending=False)
        writer = pd.ExcelWriter(res_file, engine='xlsxwriter')
        # 将数据写入 Excel
        df_sorted_equal_percentage.to_excel(writer, sheet_name=datatype, index=True, index_label=datatype)
        # 关闭写入器并保存 Excel 文件
        writer.close()


        # 计算每个文件的准确率，并将一个任务中，所有的pdf，按准确率排序

        columns_count = grouped.shape[1]
        perfile_percentage = grouped.sum(axis=1) / columns_count
        df_perfile_percentage = pd.DataFrame(perfile_percentage, columns=['单文件正确率'])
        df_sorted_perfile_percentage = df_perfile_percentage.sort_values(by='单文件正确率', ascending=False)

        # print(df_sorted_perfile_percentage)
        writer_perfile = pd.ExcelWriter(res_perfile, engine='xlsxwriter')
        # 将数据写入 Excel
        df_sorted_perfile_percentage.to_excel(writer_perfile, sheet_name=datatype, index=True, index_label=datatype)
        # 关闭写入器并保存 Excel 文件
        writer_perfile.close()

def main():
    for category in get_filename():
        statistical_accuracy(category)
if __name__ == "__main__":
    main()