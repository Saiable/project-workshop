import {initState} from "./state";
import {compileToFunction} from "./compiler" // 使用@rollup/plugin-node-resolve插件，可省略index

export function initMixin(Vue) {
    Vue.prototype._init = function(options) {
        const vm = this
        vm.$options = options
        initState(vm)

        if(options.el) { // 看是否有el配置项
            vm.$mount(options.el) // 实现数据的挂载
        }
    }

    Vue.prototype.$mount = function (el) {
        const vm = this
        el = document.querySelector(el)
        let ops = vm.$options

        if(!ops.render) { // 先查找render函数
            let template
            if(!ops.template && el) { // 没有template配置项，但是有el配置项
                template = el.outerHTML // 就用el的配置项，outHTML返回的是匹配到自身的dom元素
            } else { // // 如果既有template,又有el，就用template配置项作为模板
                if(el) {
                    template = ops.template
                }
            }
            // 其他情况的分支考虑
            // console.log(template)
            // 最终如果获取到模板
            if(template) {
                // 这里需要对模板进行编译
                const render = compileToFunction(template)
                // 将编译后的结果给render函数
                ops.render = render
            }
        }
        ops.render // 有render就直接调用render
    }
}

