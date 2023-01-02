// rollup 默认可以导出一个对象，作为打包的配置文件

import babel from '@rollup/plugin-babel'
export default {
    input: './src/index.js', // 入口
    output: {
        file: './dist/vue.js', // 出口
        name: 'Vue', // 在global全局上，增添一个Vue对象，我们就可以new Vue了（global.Vue）
        format: 'umd', // options: 1.esm es6模块，相当于没有打包了 2.commonjs node中使用 3.iife 自执行函数 4.umd 兼容amd和commonjs
        sourcemap: true // 可以调试源代码
    },
    plugins: [
        // 需要新建babel的配置文件，既可以是js文件，也可以是.rc文件,
        // 这里和视频的保持一致
        babel({
            exclude: 'node_modules/**', // 排除第三方模块 ，**表示任意文件夹
            babelHelpers: 'bundled' // https://www.npmjs.com/package/@rollup/plugin-babel  搜索babelHelpers 
        }) // 所有的插件都是函数
    ]
}