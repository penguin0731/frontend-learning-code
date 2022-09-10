// 实例方法 $().                          工具方法 $.
$.fn.extend({
    myFullPage: function(config) {
        // config.colorArr
        var colorArr = config.colorArr;
        var $W = $(this);
        var $Section = $W.find('.section');
        var commonStyle = {
            width: '100%',
            height: '100%'
        }
        var clientWidth = $(window).outerWidth();
        var clientHeight = $(window).outerHeight();
        // 索引 0=>第一张
        var curIndex = 0;
        var key = true;

        // 样式初始化
        $('html')
            .add('body')
                .css({
                    overflow: 'hidden',
                    position: 'relative',
                })
                    .add($W)
                        .add($Section)
                            .css(commonStyle);
        
        $W.css({position: 'absolute',top: 0,left: 0})
                .find('.section')
                    .each(function(index, ele) {
                        $(ele).css({
                            backgroundColor: colorArr[index],
                            position: 'relative'
                        }).find('.slide').css({
                                float: 'left',
                                width: clientWidth,
                                height: clientHeight
                            }).wrapAll('<div class="sliderWrapper"></div>')
                    });
        $Section
            .find('.sliderWrapper')
                .css({position: 'absolute', left: 0, top: 0})
                    .each(function(index, ele) {
                        $(ele).css({
                            width: clientWidth * $(ele).find('.slide').length, 
                            height: clientHeight
                        })
                    });
        
        // js控制移动
        // active为当前显示页
        // 给第一个section设置active
        // 给第一个slide设置innderActive
        $Section.eq(0)
            .addClass('active')
                .end().find('.sliderWrapper').each(function(index, ele) {
                    $(ele).find('.slide').eq(0).addClass('innerActive');
                });
        // 控制移动
        $(document).on('keydown', function(e) {
            // e.which
            // 左37 上38 右39 下40
            // console.log(e.which);
            // 垂直移动
            if(e.which == 38 || e.which == 40) {
                if(key) {
                    key = false;
                    var newTop = $W.offset().top;
                    // 方向
                    var derection = '';
                    if(e.which == 38 && curIndex != 0) {
                        // top
                        // 返回即将离开页的索引
                        derection = 'top';
                        config.onleave(curIndex, derection);
                        curIndex--;
                        newTop += clientHeight;
                    }else if(e.which == 40 && curIndex != $Section.length - 1) {
                        // bottom
                        // 返回即将离开页的索引
                        derection = 'bottom';
                        config.onleave(curIndex, derection);
                        curIndex++;
                        newTop -= clientHeight;   
                    }
                    $W.animate({top: newTop}, 350, 'swing', function() {
                        key = true;
                        // 给当前page添加class
                        $Section.eq(curIndex).addClass('active');
                        // 移除上一个当前page的class
                        if(derection == 'top') {
                            $Section.eq(curIndex + 1).removeClass('active');
                        }else {
                            $Section.eq(curIndex - 1).removeClass('active');
                        }

                        config.afterLoad(curIndex, derection);
                    });
                }
            }
            

            // 水平移动
            if(e.which == 37 || e.which == 39) {
                if(key) {
                    key = false;
                    var $SW = $('.active').find('.sliderWrapper');
                    console.log($SW);
                    var curShowDom = $SW.find('.innerActive');
                    var newLeft = $SW.offset().left;
                    var derection = '';
                    if(e.which == 37 && curShowDom.index() != 0) {
                        // left
                        newLeft += clientWidth;
                        derection = 'left';
                    }else if(e.which == 39 && curShowDom.index() != $SW.find('.slide').length - 1) {
                        // right
                        newLeft -= clientWidth;
                        derection = 'right';
                    }
                    $SW.animate({left: newLeft}, 200, 'swing', function() {
                        key = true;
                        // 如果进行了左右操作,移除上一个当前page的class
                        derection != null ? curShowDom.removeClass('innerActive') : '';
                        if(derection == 'left') {
                            curShowDom.prev().addClass('innerActive');
                        }else {
                            curShowDom.next().addClass('innerActive');
                        }
                    });
                }
            }
        })
    }
});