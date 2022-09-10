function init() {
    bindEvent();
}
init();
function bindEvent() {
    $('.cube').on('mouseenter', function (e) {
        // var x = e.clientX - this.offsetLeft - w / 2;
        // var y = e.clientY - this.offsetTop - y / 2;
        // 角度转弧度Math.atan(x, y)
        // (Math.round((Math.atan(y, x) * (180 / Math.PI) + 180) /90) + 3) % 4;

        addId(e, 'in', this);
        changeBg(this);
    }).on('mouseleave', function (e) {
        addId(e, 'out', this);
        // 动画完成时清空ID
        $(this).on('animationend', function () {
            if($(this).attr('id').indexOf('out') != -1) {
                $(this).attr('id', '');
            }
        })
    });
}
function changeBg(item) {
    var color = $(item).data('bg');
    $('.wrapper').attr('id', color);
}
function addId(e, state, item) {
    var d = getDir(e, item);
    var str = state;
    switch(d) {
        case 0:
            str += '-top';
            break;
        case 1:
            str += '-right';
            break;
        case 2:
            str += '-bottom';
            break;
        case 3:
            str += '-left';
            break;
    }
    $(item).attr('id', str);
    // console.log(str);
}
function getDir(e, item) {
    var w = item.offsetWidth;
    var y = item.offsetHeight;
    var x = e.clientX - item.offsetLeft - w / 2;
    var y = e.clientY - item.offsetTop - y / 2;
    var d = (Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) /90) + 3) % 4;
    return d;   //0,1,2,3
}

