import Vue from 'vue'
import app from './components/app.vue'
import router from '../router'
import store from '../store'
import '@/utils/element'
import '@/styles/index.css'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(app)
}).$mount('#app')

