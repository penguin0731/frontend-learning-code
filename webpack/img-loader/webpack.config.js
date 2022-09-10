var path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(png)|(jpg)|(jpeg)|(gif)$/,
                use: [
                    {
                        loader: './loaders/img-loader',
                        options: {
                            limit: 12000,
                            name: 'img-[contenthash:5].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'source-map'
}