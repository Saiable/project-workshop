function sum() {
    console.log(arguments)
    let total = null
    for (let i = 0; i <arguments.length; i++) {
        let item = Number(arguments[i])
        if(isNaN(item)) {
            continue
        }
        total += item;
    }
    return total
}

let total = sum(1, 3, '5a')
console.log(total)