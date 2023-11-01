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
      imports: ['vue', 'vue-router'],
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
})