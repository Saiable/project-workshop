import {initState} from "./state";

export function initMixin(Vue) {
    Vue.prototype._init = function(options) {
        const vm = this
        vm.$options = options
        initState(vm)

        if(options.el) {
            vm.$mount(options.el)
        }
    }

    Vue.prototype.$mount = function (el) {
        const vm = this
        el = document.querySelector(el)
        let ops = vm.options
        if(!ops.render) { // 先查找render函数
            let template
            if(!ops.template && el) { // 没有template配置项，但是有el配置项
                template = el.outerHTML // 就用el的配置项，outHTML返回的是匹配到自身的dom元素
            } else { // 如果有template,就用template配置项
                if(el) {
                    template = ops.template
                }
            }
            console.log(template)
        }
    }
}

