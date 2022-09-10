function init() {
    bindEvent();
}

function bindEvent() {
    slideTitle();
}

function slideTitle() {
    $(window).on('scroll', function() {
        var scroll = $('html,body').scrollTop();
        if(scroll >= 200) {
            $('.img-title').addClass('scroll');
        }
        if(scroll <= 100) {
            $('.img-title').removeClass('scroll');
        }
    })
}



init();