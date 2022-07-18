import {observe} from "./observe/index"

export function initState(vm) {
    const opts = vm.$options
    if (opts.data) {
        initData(vm)
    }
}

function proxy(vm, target, key) {
    Object.defineProperty(vm, key, { // vm.name
        get() {
            return vm[target][key] // vm.name实际上是去vm._data.name上去取值了
        },
        set(newValue) {
            vm[target][key] = newValue // 这性能的确不太好，每一个`key`都加了一层
        }
    })
}

function initData(vm) {
    let data = vm.$options.data
    data = typeof data === 'function' ? data.call(vm) : data
    // 对数据进行劫持,vue2中采用了defineProperty

    // 观测之前，把data放一份到vm._data身上
    vm._data = data

    // 定义一个方法obeserve观测数据，这是一个核心模块，我们单独新建observe文件夹进行处理
    observe(data)

    // 将vm._data用vm来代理，简化用户写法
    for (let key in data) {
        proxy(vm, '_data', key)
    }
}