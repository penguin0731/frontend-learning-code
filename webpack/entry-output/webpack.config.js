const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: ['./src/statistics.js', './src/index.js'],
        app: './src/app.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[chunkhash:5].js'
    },
    devtool: 'source-map'
}