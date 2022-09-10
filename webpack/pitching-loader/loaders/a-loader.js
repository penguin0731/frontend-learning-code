function aLoader(source) {
    return `module.exports = '${source} a]'`;
}

aLoader.pitch = function(remainingRequest, precedingRequest, data) {
    console.log('aLoader.pitch', remainingRequest, precedingRequest, data)
}

module.exports = aLoader;