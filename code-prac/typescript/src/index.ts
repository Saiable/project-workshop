let max = Number.MAX_SAFE_INTEGER
console.log(max + 1 === max + 2); // true 取到js中的最大值，然后相加，结果为true，很明显是有问题的
let r1:bigint = BigInt(max)
console.log(BigInt(max) + BigInt(1) === BigInt(max) + BigInt(2)) // false