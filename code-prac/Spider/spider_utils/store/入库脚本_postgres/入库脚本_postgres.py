import psycopg2
import json
from config_utils import read_config


def main():
    # 测试数据库
    db_params = read_config(name='database_postgres_01')
    json_data = [
        {
            "id": 1,
            "name": "Item 1"
        },
        {
            "id": 2,
            "name": "Item 2"
        }
    ]

    connection = psycopg2.connect(**db_params)
    print(connection)
    cursor = connection.cursor()
    print(cursor)

    # 创建表
    create_table_query = '''
        CREATE TABLE IF NOT EXISTS json_data (
            id serial PRIMARY KEY,
            data jsonb
        );
    '''
    cursor.execute(create_table_query)
    connection.commit()

    # 插入数据
    insert_query = """
        INSERT INTO json_data (data) VALUES (%s);
        """
    for item in json_data:
        cursor.execute(insert_query, (json.dumps(item),))
        
    connection.commit()
    cursor.close()
    connection.close()


if __name__ == "__main__":
    main()
