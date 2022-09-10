var FileListPlugin = require('./src/plugins/FileListPlugin');

module.exports = {
    mode: 'development',
    plugins: [
        new FileListPlugin('文件列表.md')
    ],
    devtool: 'source-map'
}