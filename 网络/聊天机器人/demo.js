function init() {
    bindEvent();
}

function bindEvent() {
    $('#submit').on('click', function () {
        var val = $('#inp').val();
        if (val) {
            renderDom('mine', val);
            $('#inp').val('');
            getData(val);
        }
    });
    $('#inp').keyup(function(e){
        // console.log(e.keyCode);
        if(e.keyCode == 13) {
            $('#submit').click();
        }
    });
}

function getData(val) {
    $.ajax({
        url: 'http://api.duyiedu.com/api/chat/sendMsg',
        type: 'get',
        data: {
            appkey: '13926806277_1558879000128',
            msg: val,
        },
        dataType: 'json',
        success: function(res) {
            console.log(res);
            if(res.status == 'success') {
                renderDom('robot', res.data.text);
            }
        }
    })
}

function renderDom(who, text) {
    var str = '<div class="' + who +'">\
                    <div class="avitor"></div>\
                    <div class="text">' + text + '</div>\
               </div>';
    $(str).appendTo($('.content'));
    $('.content').scrollTop($('.content')[0].scrollHeight - $('.content')[0].clientHeight);
}

init();