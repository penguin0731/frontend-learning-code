// 在此文件中需要遵循CommonJs的规范
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 单个入口
    // entry: './src/index.js',
    // 多个入口
    entry: {
        main: './src/index.js',
        app: './src/app.js'
    },
    // 出口
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-bundle.js'
    },
    // loader
    module: {
        rules: [
            // 匹配less格式的文件
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin()
    ],
    // 模式
    mode: 'development',
}