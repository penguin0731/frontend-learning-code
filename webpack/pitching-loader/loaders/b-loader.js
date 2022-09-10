function bLoader(source) {
    return `${source} b ->`;
}

bLoader.pitch = function(remainingRequest, precedingRequest, data) {
    console.log('bLoader.pitch', remainingRequest, precedingRequest, data)
}

module.exports = bLoader;