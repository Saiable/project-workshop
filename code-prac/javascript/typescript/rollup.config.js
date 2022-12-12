import {nodeResolve} from "@rollup/plugin-node-resolve"

import ts from "rollup-plugin-typescript2"
import serve from "rollup-plugin-serve"
import path from "path"

export default {
    input:'src/index.ts',
    output: {
        file: path.resolve(__dirname, 'dist/bundle.js'),
        format: 'iife', // 告诉rollup，打包后的代码是可以执行的，所以打包成立即执行函数
        // 常见的有global(弄个全局变量来接受)
        // cjs（会变成module.exports）
        // esm（会变成 import export的es6语法）
        // umd（兼容amd + commonjs，不支持es6导入）
        // rollup的配置文件，支持es6语法，它就是根据es6的语法来解析的
        sourcemap: true // ts的配置文件也得配，ts配置文件中，搜索sourceMap，取消注释即可
    },
    plugins: [
        // 1.先拿到ts文件
        nodeResolve({
            extensions: ['.js', '.ts'] // 默认解析ts文件
        }),
        // 2.根据配置文件解析
        ts({
            // 指定好ts的配置文件
            tsconfig: path.resolve(__dirname, 'tsconfig.json')
        }),
        // 3.最后提供服务
        serve({
            port: 3000, // 指定服务的端口号
            contentBase: '', // 指定根目录
            openPage: '/public/index.html' // 需要新建该目录和文件，并在index.html中引入`dist/bundle.js`
        })
    ]

}