const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: false,
  //关闭严格模式
  lintOnSave: false,
  //跨域问题
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host:"localhost",
    port: '8080',
    https: false, //是否使用https协议
    proxy: {
      '/': {
        target: 'http://cloud-music.pl-fe.cn/',
        ws:false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
      }
    }
  }
})