function init() {
    bindEvent();
    swiper();
}
init();

function bindEvent() {
    $('.btn').hover(function () {
        $('.header .nav ul.list').show();
    });
    $('.header .nav ul.list').on('mouseleave', function () {
        if (window.innerWidth <= 700) {
            $(this).hide();
        }
    });
    $(window).on('resize', function () {
        if (window.innerWidth > 700) {
            $('.header .nav ul.list').show();
        }
    });
    $('.header a').on('click', function () {
        var navHeight = 80;
        if(window.innerWidth <= 900) {
            navHeight = 50
        }
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - navHeight + "px" 
        }, 500);
        return false;
    });
}

function swiper() {
    $('#swiper').sliderImg({
        image: ['./img/1.jpg', './img/2.jpg', './img/3.jpg'],
        href: ['#','#','#']
    });
}