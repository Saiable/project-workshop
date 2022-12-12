import { newArrayProto } from './array'
class Observer {
    constructor(data) {
        // data.__ob__ = this
        Object.defineProperty(data, '__ob__', {
            value: this,
            enumerable: false
        })
        if(Array.isArray(data)) {
            // 这里我们可以重写数组的7个变异方法（可以修改数组本身）
            data.__proto__ = newArrayProto
            this.observeArray(data) // 递归处理数组中的对象
        } else {
            this.walk(data)
        }
    }

    walk(data) { // 循环对象，对属性依此劫持
        // 重新定义属性
        Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
    }
    observeArray(data) {
        data.forEach(item => observe(item))
    }
}

// 向外导出该方法，供单独使用
export function defineReactive(target, key, value) { // 闭包
    observe(value) // observe内部对value进行判断了，是个对象，会再次创建Observer实例，再次调用walk方法，劫持每个属性
    Object.defineProperty(target, key, {
        get() { // 取值的时候，会执行get
            // console.log('key', key)
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
    if(data.__ob__ instanceof Observer) {
        return data.__ob__ // 如果被代理过了，直接返回它的实例
    }
    return new Observer(data)
}