$('.wrapper').myFullPage({
    colorArr: ['red', 'blue', 'green', 'orange'],
    onleave: function(index, derection) {
        // 即将离开的section
        // 触发自定义事件
        $('.section').eq(index).trigger('_leave');
    },
    afterLoad: function(index, derection) {
        // 即将到来的section
        $('.section').eq(index).trigger('_load');        
    }
});

// 自定义事件
$('.section').on('_leave', function() {
    $(this).find('.component').trigger('cpLeave');
});
$('.section').on('_load', function() {
    $(this).find('.component').trigger('cpLoad');
});