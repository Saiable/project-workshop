import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/utils/flexible.js'
import '@/styles/index.scss'
// Toast
// import { showToast } from 'vant';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
createApp(App).use(store).use(router).mount('#app')
