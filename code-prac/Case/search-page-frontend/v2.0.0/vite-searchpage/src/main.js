import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import 'normalize.css'
import '@/styles/common.scss'

// import 'amfe-flexible'
// import { getUserConfig } from '@/api/userinfo.js';

const app = createApp(App);
const pinia = createPinia();
app.use(router).use(pinia).mount('#app')
// require('https://at.alicdn.com/t/font_3135553_dtsihgkgrr.css');

// getUserConfig().then(res => {
//     console.log(res);
// });

