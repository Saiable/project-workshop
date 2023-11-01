def get_json_value(a, k, l: list):
    """
    :param a: 传入的数据
    :param key: 获取哪个字段值
    :param l: 获取的值放在l里
    :return:
    """
    # 判断一下a的类型是不是字典类型
    if isinstance(a, dict):
        # 如果 key在第一层级
        if k in a:
            l.append(a.get(k))
        # 遍历a的每一个key
        for x in a.keys():
            # 递归查找key
            get_json_value(a.get(x), k, l)
    # 判断一下a是否为list类型
    elif isinstance(a, list):
        # 遍历a中的每一个元素
        for i in a:
            if isinstance(i, dict):
                if k in i:
                    l.append(i.get(k))
                for x in i.keys():
                    get_json_value(i.get(x), k, l)
    return l


if __name__ == '__main__':
    a = {"a": "xxa", "b": {"xxb": {"c": "xxxc"}}}
    print(type(a["b"]), a["a"])
    b = []
    c = get_json_value(a, k="b", l=b)
    print(c)
