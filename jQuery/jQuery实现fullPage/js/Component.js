var ComponentFactory = function(config) {
    var $Div = $('<div class="component base"></div>');
    // config 定制化$Div
    config.className && $Div.addClass(config.className);
    config.width && $Div.css('width', config.width);
    config.height && $Div.css('width', config.height);
    config.text && $Div.text(config.text);
    config.center && $Div.css({position: 'absolute', left: 0, marginLeft: -config.width/2});
    config.css && $Div.css(config.css);
    if(config.event) {
        for(var prop in config.event) {
            config.on(prop, config.event[prop]);
        }
    }

    $Div.on('cpLeave', function() {
        // 淡出
        var self = this;
        setTimeout(function(){
            config.animateOut && $(self).animate( config.animateOut );
        }, config.delay || 0);
    });
    $Div.on('cpLoad', function() {
        // 淡入
        var self = this;
        setTimeout(function() {
            config.animateIn && $(self).animate( config.animateIn );
        }, config.delay || 0);
    });

    return $Div;
}