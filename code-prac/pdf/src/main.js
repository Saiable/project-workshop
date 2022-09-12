import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import {
  AnnotationFactory
} from '../node_modules/annotpdf/_bundles/pdfAnnotate';

// AnnotationFactory.loadFile(path).then((factory) => {
//   factory.createTextAnnotation({
//       page: 0,
//       rect: [50, 50, 80, 80],
//       contents: "Pop up note",
//       author: "Max"
//   })
//   factory.download()
// })