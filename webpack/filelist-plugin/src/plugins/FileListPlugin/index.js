module.exports = class FileListPlugin {
    constructor(filename = 'filelist.txt') {
        this.filename = filename
    }

    apply(compiler) {
        compiler.hooks.emit.tap('FileListPlugin', (complation) => {
            var filelist = [];
            for (const key in complation.assets) {
                var content = `【${ key }】\n大小：${complation.assets[key].size() / 1000}KB`;
                filelist.push(content)
            }
            var str = filelist.join('\n\n');
            complation.assets[this.filename] = {
                source() { return str },
                size() { return str.length }
            }
        })
    }
}