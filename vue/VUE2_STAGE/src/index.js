import {initMixin} from "./init";

function Vue(options) { // options就是用户的选项
    // 拿到用户的options，做一下初始化
    this._init(options)
}

// 给Vue增加init方法
initMixin(Vue)

export default Vue