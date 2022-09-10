var path = require('path');
// 打包压缩css
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 提取html并将打包的css文件与js文件引入
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 保留最新打包的文件
var { CleanWebpackPlugin } = require('clean-webpack-plugin');

var Webpack = require('webpack');

module.exports = {
    entry: {
        // index: './index.js',
        pageA: './src/pageA.js',
        pageB: './src/pageB.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][hash:5]-bundle.js',
        // 公共模块
        chunkFilename: "[name][hash:5].js"
    },
    // 提取公共js配置
    optimization: {
        // 分离包
        splitChunks: {
            // 缓存
            cacheGroups: {
                // 抽离模块的名字
                // 业务代码的公共部分
                common: {
                    name: "common",
                    chunks: 'all',
                    minSize: 1,
                    minChunks: 2,
                    priority: 1
                },
                // 第三方库的公共部分
                vender: {
                    name: "vender",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'all',
                }
            }
        }
    },
    module: {
        rules: [
            // 匹配css格式的文件
            // {
            //     test: /\.css$/,
            //     use: [
            //         { loader: MiniCssExtractPlugin.loader },
            //         // { loader: 'style-loader' }, 
            //         { loader: 'css-loader' }
            //     ]
            // },

            {
                test: /\.less$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                // postcss-cssnext具有autoprefixer的功能，因此不能同时出现，否则会出现警告
                                require('postcss-cssnext')(),
                                // require('autoprefixer')(),
                                require('cssnano')()
                            ]
                        }
                    },
                    { loader: 'less-loader' }
                ]
            },
            // 处理图片
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        // 将图片单独抽出
                        options: {
                            name: '[name][hash:5].[ext]',
                            // 限制图片大小  <= 100kb时，将会进行base64格式编码，否则会被打包出来
                            limit: 100000,
                            // 打包出来后存放路径
                            outputPath: 'img'
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                require('imagemin-pngquant')({
                                    quality: [0.3, 0.5]
                                }),
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        // 自动引入打包好的图片
                        options: {
                            attrs: ['img:src']
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name][hash:5].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            // 以index.html为模板生成
            template: './index.html',
            minify: {
                // 清理注释
                removeComments: true,
                // 清理空白
                // collapseWhitespace: true
            }
        }),
        new CleanWebpackPlugin(),
        // 热重载，即只更新代码更新的部分，不重新刷新页面
        new Webpack.HotModuleReplacementPlugin()
    ],
    mode: 'development',
    devServer: {
        // 端口
        port: 8080,
        contentBase: 'dist',
        hot: true
    }
}