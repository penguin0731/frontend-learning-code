function cLoader(source) {
    console.log(source)
    return `${source}：[c ->`;
}

cLoader.pitch = function(remainingRequest, precedingRequest, data) {
    console.log('cLoader.pitch', remainingRequest, precedingRequest, data)
}

module.exports = cLoader;