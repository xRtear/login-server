const { defineConfig } = require("@vue/cli-service");
const path = require('path')

module.exports = defineConfig({
  publicPath: "./",
  outputDir: "./dist",
  assetsDir: "./static",
  filenameHashing: true, // false 来关闭文件名哈希
  lintOnSave: false, // 关闭eslint
  // 打包时不生成.map文件
  productionSourceMap: false,
  transpileDependencies: true,
  devServer: {
    https: false,
    port: 8082,
    hot: true,
    proxy: {
      "/hellologin": {
        target: "http://127.0.0.1:7999",
        changeOrigin: true,
        pathRewrite: {
          "^/hellologin": "hellologin",
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      fallback: {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
      },
    },
  },
  // 配置加载svg文件
  chainWebpack:config=>{
    // svg图标加载
    config.module
        .rule('svg')
        .exclude.add(path.join(__dirname, 'src/assets/svgIcon'))
        .end()

    config.module
        .rule('icons')// 定义一个名叫 icons 的规则
        .test(/\.svg$/)// 设置 icons 的匹配正则
        .include.add(path.join(__dirname,'src/assets/svgIcon'))// 设置当前规则的作用目录，只在当前目录下才执行当前规则
        .end()
        .use('svg-sprite')// 指定一个名叫 svg-sprite 的 loader 配置
        .loader('svg-sprite-loader')// 该配置使用 svg-sprite-loader 作为处理 loader
        .options({// 该 svg-sprite-loader 的配置
          symbolId:'icon-[name]'
        })
        .end()
  }
});
