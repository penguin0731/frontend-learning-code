function init() {
    bindNav();
    bindSwiper();
    backToTop();
}

function bindNav() {
    $(window).on('scroll', function () {
        var scroll = $('html,body').scrollTop();
        if (scroll > 0) {
            $('header').css({
                backgroundColor: '#1B1B1B'
            });
        } else {
            $('header').css({
                backgroundColor: 'transparent'
            });
        }
    });
    $('header .nav li').on('mouseenter', function () {
        var self = this;
        clearTimeout(self.timer);
        self.timer = setTimeout(function () {
            $(self).find('ul').css({
                display: 'block'
            });
        }, 200);

    }).on('mouseleave', function () {
        var self = this;
        clearTimeout(self.timer);
        self.timer = setTimeout(function () {
            $(self).find('ul').fadeOut();
        }, 200);
    });

}

function bindSwiper() {
    var key = true,
        index = 0,
        length = $('.swiper-list li').length - 1,
        swiperItem = $('.swiper-list li');
    $('.left').eq(0).on('click', function () {
        swiperItem.removeClass('active')
            .find('.swiper-content')
            .removeClass('active');
        index == 0 ? index = length : --index;
        swiperItem.eq(index).addClass('active')
            .find('.swiper-content')
            .addClass('active');
    });
    $('.right').eq(0).on('click', function () {
        swiperItem.removeClass('active')
            .find('.swiper-content')
            .removeClass('active');
        index == length ? index = 0 : ++index;
        swiperItem.eq(index).addClass('active')
            .find('.swiper-content')
            .addClass('active');
    });
}

function backToTop() {
    $('.back-to-top').on('click', function() {
        if($('html,body').scrollTop()){
            $('html,body').animate({ scrollTop: 0 }, 800);
        }
    })
}

init();