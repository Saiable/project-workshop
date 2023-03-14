// elementUI引入抽离，并在main.js入口文件中调用
// 参照官网
// 便于节省时间，开发时用全量引入
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(ElementUI)
