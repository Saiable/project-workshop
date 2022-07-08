const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

// 复制文件到指定目录
const copyFiles = [
    {
        from: path.resolve("src/plugins/manifest.json"),
        to: `${path.resolve("dist")}/manifest.json`
    },
    {
        from: path.resolve("src/assets"),
        to: path.resolve("dist/assets")
    },
    {
        from: path.resolve("src/plugins/inject.js"),
        to: path.resolve("dist/js")
    },
    {
        from: path.resolve("src/plugins/static"),
        to: path.resolve("dist/static")
    },
    {
        from: path.resolve("src/plugins/index.html"),
        to: path.resolve("dist/index.html")
    },
    {
        from: path.resolve("src/plugins/favicon.ico"),
        to: path.resolve("dist/favicon.ico")
    }
];

// 复制插件
const plugins = [
    new CopyWebpackPlugin({
        patterns: copyFiles
    })
];

// 页面文件
const pages = {};
// 配置 popup.html 页面
const chromeName = ["popup"];

chromeName.forEach(name => {
    pages[name] = {
        entry: `src/${name}/main.js`,
        template: `src/${name}/index.html`,
        filename: `${name}.html`
    };
});

module.exports = {
    pages,
    productionSourceMap: false,
// 配置 content.js background.js
    configureWebpack: {
        entry: {
            content: "./src/content/main.js",
            background: "./src/background/main.js"
        },
        output: {
            filename: "js/[name].js"
        },
        plugins
    },
// 配置 content.css
    css: {
        extract: {
            filename: "css/[name].css"
        }
    },
// 让打包时生成的 chunk-vendors.js 不带 hash
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.output.filename('js/[name].js').end()
            config.output.chunkFilename('js/[name].js').end()
        }
    }
}
