import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import('@/styles/index.css');

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import JsonViewer from "vue-json-viewer"
createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .use(JsonViewer)
    .mount('#app');
