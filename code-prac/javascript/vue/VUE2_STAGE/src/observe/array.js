// 我们希望重写数组中的部分方法

let oldArrayProto = Array.prototype

// newArraryProto.__proto = oldArrayProto
export let newArrayProto = Object.create(oldArrayProto) // 以oldArryarProto对象为原型对象，新建一个newArraryProto

// 找到所有的变异方法
let methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
] // concact slice都不会改变原数组

methods.forEach(method => {
    // arr.push(1,2,3)
    newArrayProto[method] = function (...args) { // 这里重写了数组方法
        const result = oldArrayProto[method].call(this, ...args) // 内部调用原来的方法，一般称为函数的劫持（切片编程(切面编程)：自己写个功能，把以前的功能塞进去，外面可以做一些自己的事，aop）
        // 我们需要对新增的数据，再次进行劫持
        let inserted
        let ob = this.__ob__
        switch (method) {
            case 'push':
            case 'unshift': // arr.unshift(1,2,3)
                inserted = args
                break
            case 'splice': // arr.splice(0, 1, {a:1}, {a:1})
                inserted = args.slice(2)
                break
            default:
                break
        }
        // console.log('新增的内容', inserted)
        if(inserted) {
            // 对新增的内容再次进行观测
            ob.observeArray(inserted)
        }
        return result
    }
})