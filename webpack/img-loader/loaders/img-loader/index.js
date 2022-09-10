var loaderUtils = require('loader-utils');

function getBase64(buffer, ext) {
    return `data:image/${ ext };base64,${ buffer.toString('base64') }`
}

function getFilePath(buffer, name) {
    var filename = loaderUtils.interpolateName(this, name, {
        content: buffer
    });
    this.emitFile(filename, buffer); // 生成一个文件
    return filename
}

module.exports = function(buffer) {
    var { limit = 1000, name = '[name].[ext]' } = loaderUtils.getOptions(this);
    var content;
    if (buffer.byteLength > limit) {
        content = getFilePath.call(this, buffer, name);
    } else {
        var splitArr = this.resourcePath.split('.');
        var ext = splitArr[splitArr.length - 1];
        content = getBase64(buffer, ext);
    }
    return `module.exports = \`${ content }\``
}

// 默认情况下，资源文件（即sourceCode入参）会被转换成utf-8字符串
// 通过设置静态属性raw为true，可以接收原始的Buffer
module.exports.raw = true;
