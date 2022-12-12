function sum() {
    console.log(arguments)
    let total = null
    for (let i = 0; i < arguments.length; i++) {
        // 获取的每一项，都要先转换成数字
        let item = Number(arguments[i])
        // 非有效数字不加
        if (isNaN(item)) {
            continue
        }
        total += item;
    }
    return total
}

let total = sum(1, 3, '5a')
console.log(total)
// arguements.callee指向函数自身，严格模式下禁止使用