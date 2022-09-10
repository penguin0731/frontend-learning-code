function b() {
    var mask = document.createElement('div');
    mask.id = 'mask';
    var cheight = document.documentElement.clientHeight || document.body.clientHeight;
    mask.style.height = cheight + 'px';
    document.body.appendChild(mask);
    var login = document.createElement('div');
    login.id = 'login';
    login.innerHTML = '<div class="title" id="title">'+
                            '登录账号'+
                            '<a href="" class="close">X</a>'+
                        '</div>'+
                        '<div class="content">'+
                            '<div class="user">'+
                                '<input type="text" class="pt" placeholder="请输入用户名" value="" name="">'+
                            '</div>'+
                            '<div class="password">'+
                                '<input type="password" class="pt" placeholder="请输入密码" value="" name="">'+
                            '</div>'+
                            '<div class="submit">'+
                                '<div class="sm">登录</div>'+
                            '</div>'+
                        '</div>';
    document.body.appendChild(login);

    var cwidth = document.documentElement.clientWidth || document.body.clientWidth;
    var lwdith = login.offsetWidth;
    var lheight = login.offsetHeight;
    login.style.left = (cwidth - lwdith)/2 + 'px';
    login.style.top = (cheight - lheight)/2 + 'px';

    var title = document.getElementById('title');
    var isDraging = false;
    var mouseOffsetX,
        mouseOffsetY;
        title.onmousedown = function(e) {
            var event = e || window.event;
            mouseOffsetX = event.pageX-login.offsetLeft;
            mouseOffsetY = event.pageY-login.offsetTop;
            isDraging = true;
        }
        document.onmousemove = function(e) {
            var event = e || window.event;
            var newX = event.pageX
            var newY = event.pageY;
            if(isDraging === true) {
                var loginL = newX - mouseOffsetX;
                var loginT = newY - mouseOffsetY;
                if(login < 0) {
                    loginL = 0;
                }else if(loginL > (cwidth-lwdith)){
                    loginL = cwidth-lwdith;
                }
                if(loginT < 0) {
                    loginT = 0;
                }else if(loginT > (cheight-lheight)){
                    loginT = cheight-lheight;
                }
                login.style.left = loginL + 'px';
                login.style.top = loginT + 'px';
            }
        }
        document.onmouseup = function() {
            isDraging = false;
        }
        var close = login.getElementsByClassName('close')[0];
        close.onclick = function() {
            document.body.removeChild(mask);
            document.body.removeChild(login);
        }
}

window.onload = function() {
    var btn = document.getElementById('btn');
    btn.onclick = function() {
        b();
    }
}