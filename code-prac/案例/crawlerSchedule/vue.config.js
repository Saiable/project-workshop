const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // devServer: {
  //   proxy: {
  //       '/api': { // 表示请求前缀，发送`ajax`请求时，在端口号后添加该前缀，表示要通过代理服务器进行转发，并且该前缀，会作为请求路径发送给目标服务器
  //           target: 'http://127.0.0.1:9878', // 代理服务器的路径
  //           pathRewrite: {
  //               '^/api': '' // 对路径进行匹配替换，将前缀替换为空字符串，如果真实的服务器有这个路径头，就不需要重写
  //           },
  //           ws: true, // 用于支持websocket
  //           changeOrigin: true // true配置项，会伪装代理服务的主机端口号，是localhost:5000。false配置项，代理服务器会如实告诉目标服务器自己的主机端口号，是localhost:8080
  //       }    
  //     }
  // },
  devServer: {
    proxy: "http://localhost:9878/" //配置成最终要请求的服务器
  }

});
