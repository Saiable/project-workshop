// 我们希望重写数组中的部分方法

let oldArrayProto = Array.prototype

// newArraryProto.__proto = oldArrayProto
let newArrayProto = Object.create(oldArrayProto)
