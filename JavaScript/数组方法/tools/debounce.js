function debounce(handler, delay) {
    var timer;
    return function() {
        var _self = this, _arg = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            handler.apply(_self, _arg);
        }, delay);
    }
}