
var timer,
    per = 0;
setInterval(function(){
    $('.bar').css('width',per + '%');
    per ++;
    if(per > 100){
        // $('.pageLoading').fadeOut(1000); //淡出
        $('.pageLoading').addClass('complete');
        setTimeout(function(){
            $('.monsterText').html('<h2>We are monster</h2>');
        }, 3000);
        clearInterval(timer);
    }
}, 30);
