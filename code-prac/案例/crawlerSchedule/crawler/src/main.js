import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// let echarts = require('echarts');
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

import '@/styles/index.less';
import '@/utils/element.js'
Vue.config.productionTip = false
require("@/utils/flexible.js");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
