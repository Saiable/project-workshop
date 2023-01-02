export function initMixin(Vue) {
    Vue.prototype._init = function(options) {
        this.$options = options
        debugger
    }
}