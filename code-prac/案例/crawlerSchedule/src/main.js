import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "default-passive-events";
import "@/styles/index.less";
import "@/utils/element.js";
import "@/utils/echarts.js";
import "@/utils/globalMixin.js";
Vue.config.productionTip = false;
require("@/utils/flexible.js");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
