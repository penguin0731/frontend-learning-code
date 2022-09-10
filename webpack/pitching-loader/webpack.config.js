
module.exports = {
    mode: 'development',
    module: {
        rules: [
            // {
            //     test: /data.js/,
            //     use: ['./loaders/a-loader.js', './loaders/b-loader.js', './loaders/c-loader.js']
            // }
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: "./cache"
                        }
                    }, 
                    'babel-loader'
                ]
            }
        ]
    },
    devtool: 'source-map'
}