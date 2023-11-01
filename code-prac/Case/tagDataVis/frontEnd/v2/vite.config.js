import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite"
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite'
//element
import {
  ElementPlusResolver
} from 'unplugin-vue-components/resolvers'
// 配置@别名
import {
  resolve
} from "path"

// https://vitejs.dev/config/
export default defineConfig({
  // 本地运行配置，及反向代理配置
  server: {
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      '/dataTask': {
        target: 'http://127.0.0.1:8000', // 通过代理接口访问实际地址。这里是实际访问的地址。vue会通过代理服务器来代理请求
        changeOrigin: true,
        ws: true, // 允许websocket代理
        // rewrite: (path) => path.replace(/^\/api/, '') // 将api替换为空
      }
    }
  },
  resolve: {
    // ↓路径别名
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  plugins: [
    vue(),
    //element按需导入
    AutoImport({
      //安装两行后你会发现在组件中不用再导入ref，reactive等
      imports: ['vue', 'vue-router', 'pinia'],
      dts: "src/auto-import.d.ts",
      //element
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      //element
      resolvers: [ElementPlusResolver()],
      //默认存放位置
      //dts: "src/components.d.ts",
    })
  ],
  build: {
    outDir: 'tagdata-vis', //想要把dist修改成什么名字在这边改
    assetsDir: 'tagdata-vis-assets' //想要把static修改成什么名字在这边改
  },

})