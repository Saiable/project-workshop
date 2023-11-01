from jsonpath import jsonpath
import json

book_dict = {
    "store": {
        "book": [
            {
                "category": "reference",
                "author": "Nigel Rees",
                "title": "Saying of the Century",
                "price": 8.95
            },
            {
                "category": "fiction",
                "author": "Evelyn Waugh",
                "title": "Sound of Homour",
                "price": 12.99
            },
            {
                "category": "fiction",
                "author": "Herean Melville",
                "title": "Moby Dick",
                "isbn": "0-553-21311-3",
                "price": 8.99
            },
            {
                "category": "fiction",
                "author": "J. R. R. Tolkien",
                "title": "The Lord of the Rings",
                "isbn": "0-233-21231-8",
                "price": 22.99
            },
        ],
        "bicycle": {
            "color": "red",
            "price": 19.95
        }
    }
}

# dicts = json.loads(book_str)
print(jsonpath(book_dict, '$.store.book[*].author')) # `store`中的所有的`book`作者
print(jsonpath(book_dict, '$..author')) # 所有的作者

