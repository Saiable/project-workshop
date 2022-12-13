console.log(`Number: ${Number}`)
console.log(`0.1 + 0.2: ${0.1 + 0.2}`) // 0.30000000000000004
console.log(`Infinity: ${Number.MAX_VALUE, Number.MIN_VALUE}`)

console.log(Number('12.5')) // 12.5
console.log(Number('12.5px')) // NaN
console.log(Number('12.4.5')) // NaN
console.log(Number('011')) // 11
console.log(Number('')) // 0

// 布尔值转换为数字
console.log(Number(true)) // 1
console.log(Number(false)) // 0
console.log(isNaN(true)) // false
console.log(isNaN(false)) // false

// null和undefined
console.log(Number(null)) // 0
console.log(Number(undefined)) // NaN
console.log(isNaN(null)) // false
console.log(isNaN(undefined)) // true

// 把引用数据类型转为数字
console.log(({name: 'sai'}).toString()) // [object Object]
console.log(Number({name: 'sai'})) // NaN
console.log(Number({})) // NaN

console.log([].toString()) // '', 空字符串
console.log(Number([])) // 0

console.log([12].toString()) // '12',
console.log(Number([12])) // 12

console.log([12, 34].toString()) // '12,34'
console.log(Number([12, 34])) // NaN

