// 自动轮播    setInterval      点击跳转   bindEvent
// 展示的图片索引
var curIndex = 0;
var timer;
var flag = true;

function init() {
    show();
    bindEvent();
}
init();
function show() {
    var hlen = Math.floor($('img').length / 2);
    var lNum, rNum;
    for(var i = 0; i < hlen; i++) {
        //0; lNum = -1 -2
        lNum = curIndex - i - 1;
        $('img').eq(lNum).css({
            'transform':'translateX(' + (-150*(i + 1)) + 'px) translateZ(' + (100-i*100) +'px)',
            'z-index':50-(i*50)
        });
        //0; rNum = 1 2
        rNum = curIndex + i + 1;
        if(rNum > $('img').length - 1) {
            rNum -= $('img').length;
        }
        $('img').eq(rNum).css({
            'transform':'translateX(' + (150*(i + 1)) + 'px) translateZ(' + (100-i*100) +'px)',
            'z-index':50-(i*50)
        });
    }
    $('img').eq(curIndex).css({
        'transform':'translateZ(200px)',
        'z-index':'99'
        
    });
    $('img').on('transitionend', function() {
        flag = true;
    });
    changeStyle();
}

function bindEvent() {
    $('img').add('.list li').not(curIndex).on('click', function() {
        if(flag) {
            flag = false;
            curIndex = $(this).index();
            show();
        }
    }).hover(function() {
        clearInterval(timer);
    }, function() {
        timer = setInterval(play,2000);
    });
    timer = setInterval(play,2000);
}

function changeStyle() {
    $('.active').removeClass('active');
    $('.list li').eq(curIndex).addClass('active');
}

function play() {
    if(curIndex == 4) {
        curIndex = 0;
        show();
    }else {
        curIndex ++;
        show();
    }
}

