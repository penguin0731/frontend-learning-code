var totalBtn1 = 0,
    totalBtn2 = 0;

function clickBtn() {
    $('button').on('click', function() {
        var img = $(this).parent().find('img');
        var btn = $(this).attr('class'); //获取class属性
        var flyImg = img.clone().css({'opacity':'0.6'});
        $('.wrapper').append(flyImg);
        flyImg.css({
            'position': 'absolute',
            'left': img.offset().left + 'px',
            'top': img.offset().top + 'px',
            'width': '300px',
            'height': '300px',
            'border': '3px solid #fff'
        });
        flyImg.animate({
            'width': '50px',
            'height': '50px',
            'border-radius': '50%'
        }, function(){
            var top;
            if(btn == 'btn1') {
                totalBtn1 ++;
                top = $('#btn1-add').offset().top;
            }else if(btn == 'btn2') {
                totalBtn2 ++;
                top = $('#btn2-add').offset().top;
            }
            flyImg.animate({
                'width': '0px',
                'height': '0px',
                'left': $('#btn2-add').offset().left + 'px',
                'top': top + 'px'
            }, 1500, function(){
                flyImg.remove();
                $('#btn1-add').html(totalBtn1);
                $('#btn2-add').html(totalBtn2);
            })
        });
    });
}

function mouseHover() {
    $('.right-box li').hover(function() {
        $(this).find('.left-box').animate({
            'left': '-90px'
        });
        $(this).find('.left-box').show();
    },function() {
        $(this).find('.left-box').animate({
            'left': '-121px'
        });
        $(this).find('.left-box').hide();
    })
}

clickBtn();
mouseHover();