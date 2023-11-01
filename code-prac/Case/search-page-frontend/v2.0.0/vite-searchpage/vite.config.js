import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import path, { resolve } from "path"
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import postCssPxToRem from "postcss-pxtorem"
import autoPrefixer from 'autoprefixer'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueSetupExtend(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: "src/auto-import.d.ts",
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: "src/components.d.ts",
    }),

  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  // css: {
  //   postcss: {
  //     plugins: [
  //       postCssPxToRem({
  //         rootValue: 160,
  //         selectorBlackList: ["ig"],
  //         propList: ['*'],
  //         exclude: /node_modules/i
  //       }),
  //       autoPrefixer({
  //         overrideBrowserslist: ["last 15 versions"]
  //       })
  //     ]
  //   }
  // },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://218.94.82.249:6062',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     }
  //   }
  // }
})
