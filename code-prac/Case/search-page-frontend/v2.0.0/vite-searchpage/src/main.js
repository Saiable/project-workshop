import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import '@/styles/common.scss'
// import 'amfe-flexible'
// import { getUserConfig } from '@/api/userinfo.js';

const app = createApp(App);
app.use(router).mount('#app')
// require('https://at.alicdn.com/t/font_3135553_dtsihgkgrr.css');

// getUserConfig().then(res => {
//     console.log(res);
// });
