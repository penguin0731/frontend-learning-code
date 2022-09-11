const path = require('path');
module.exports = {
    //是否打包sourcemap
    productionSourceMap: false,

    //设置输入目录
    outputDir: './myDist',

    // 如果是生产环境，则将css和js文件的引入路径前添加域名
    publicPath: process.env.NODE_ENV == 'production' ? 'http://www.duyiedu.com' : '/',

    //将css,js,img文件放到一起
    assetsDir: 'assets',

    chainWebpack: config => {
        // config
        config.resolve.alias.set('_v', path.resolve(__dirname, 'src/views'))
    },

    devServer: {
        // 代理
        proxy: {
            '/edu/chat/sendMsg': {
                target: 'https://developer.duyiedu.com'
            }
        }
    },

    pluginOptions: {
        // 将css样式注入到全局里
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: [
            path.resolve(__dirname, 'src/assets/styles/variable.less')
        ]
      }
    }
}
