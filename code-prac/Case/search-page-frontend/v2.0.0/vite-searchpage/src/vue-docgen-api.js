https://www.npmjs.com/package/vue-docgen-api
var vueDocs = require('vue-docgen-api')
var componentInfo
var filePath = './components/BackGround.vue'
vueDocs.parse(filePath).then(ci => {
  componentInfo = ci
  console.log(componentInfo)
})