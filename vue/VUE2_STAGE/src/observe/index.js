class Observer {
    constructor(data) {
        this.walk(data)
    }

    walk(data) { // 循环对象，对属性依此劫持
        // 重新定义属性
        Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
    }
}

// 向外导出该方法，供单独使用
export function defineReactive(target, key, value) { // 闭包
    Object.defineProperty(target, key, {
        get() { // 取值的时候，会执行get
            return value
        },
        set(newValue) { // 修改值的时候，会执行set
            if(value == newValue) return
            value = newValue
        }
    })
}
export function observe(data) {
    // console.log(data)
    // 对data类型进行判断
    if(typeof data !== 'object' || data == null) {
        return // 只对对象进行劫持
    }

    // 如要考虑到一个对象已经被劫持的情况
    // 如果一个对象已经被劫持过了，那么就不需要再被劫持
    // 可以添加一个实例，用实例来判断是否被劫持过（应该是用实例身上的属性）
    return new Observer(data)
}