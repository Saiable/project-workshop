var obj = {
    name: 'sai',
    age: 18,
    friends: 'hikaru, akira',
    1: 20,
    null: 30,
    [3]: 40
}

// for(var 变量 in 对象)
// 对象中有多少组键值对，循环就执行几次（除非break）结束
for( var key in obj) {
    // 每一次循环时，key变量存储的值是当前对象的属性名
    // 获取属性值：obj[属性名] => obj[key]
    console.log(key) // 打印对象所有的属性名
    // 不能通过obj.key的形式获取，获取的结果是undefined
    console.log(`属性名是${key}，属性值是${obj[key]}`)

    // for in 循环遍历时，会有一个优先级，优先遍历数字类型的属性名，并按照从小到大的顺序
}