import {observe} from "./observe/index"

export function initState(vm) {
    const opts = vm.$options
    if(opts.data) {
        initData(vm)
    }
}

function initData(vm) {
    let data = vm.$options.data
    data = typeof data === 'function' ? data.call(vm) : data
    // 对数据进行劫持,vue2中采用了defineProperty


    // 定义一个方法obeserve观测数据，这是一个核心模块，我们单独新建observe文件夹进行处理
    observe(data)

    // 观测之前，把data放一份到vm._data身上
    vm._data = data
}