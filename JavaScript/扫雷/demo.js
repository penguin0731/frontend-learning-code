//点击开始游戏 --> 动态生成100个格子 --> 100个div
// leftClick --> 没有雷,显示数字 有雷,显示所有雷,游戏结束
//rightClick --> 标记旗子或取消标记
//最后十个格子是雷,游戏结束


var startBtn = document.getElementsByClassName('startBtn')[0];
var box = document.getElementById('box');
var flagBox = document.getElementById('flagBox');
var seconds = document.getElementsByClassName('seconds')[0];
var msec = document.getElementsByClassName('msec')[0];
var alertBox = document.getElementsByClassName('alertBox')[0];
var alertImg = document.getElementsByClassName('alertImg')[0];
var closeBtn = document.getElementsByClassName('closeBtn')[0];
var score = document.getElementById('score');
var mineNum, //初始化生成雷数
    mineOver,//当前剩余雷数
    realMineOver, //实际剩余雷数
    block,
    timer,
    SEC,
    MSEC;
var mineMap = [];
var key = true; //锁

bindEvent();
function bindEvent() {
    startBtn.onclick = function () {
        if (key) { //判断游戏是否已经开始,若开始则不再执行init()
            box.style.display = 'block';
            flagBox.style.display = 'block';
            init();
            key = false;
            //计时器
            SEC = 0, MSEC = 0;
            clearInterval(timer);
            timer = setInterval(function () {
                MSEC++
                if (MSEC == 100) {
                    MSEC = 0;
                    SEC++;
                }
                seconds.setAttribute('value', SEC);
                msec.setAttribute('value', MSEC);
            }, 10);
        }
    }
    box.oncontextmenu = function () {
        return false;
    }
    box.onmousedown = function (e) {
        var event = e.target;
        if (e.which == 1) { //点击鼠标左键
            leftClick(event);
        } else if (e.which == 3) { //点击鼠标右键
            rightClick(event);
        }
    }
    closeBtn.onclick = function () {
        alertBox.style.display = 'none';
        flagBox.style.display = 'none';
        box.style.display = 'none';
        box.innerHTML = '';
        key = true;
    }
}

function init() {
    mineNum = mineOver = realMineOver = 10;
    score.innerHTML = mineOver;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var con = document.createElement('div');
            con.classList.add('block'); //设置所有div的类名为block
            con.setAttribute('id', i + '-' + j); //给每一个div标记行列坐标
            box.appendChild(con);
            mineMap.push({ mine: 0 });
        }
    }
    block = document.getElementsByClassName('block');
    while (mineNum) {
        var mineIndex = Math.floor(Math.random() * 100); //随机生成0-100的数
        if (mineMap[mineIndex].mine === 0) {
            mineMap[mineIndex].mine = 1;
            block[mineIndex].classList.add('isLei');
            mineNum--;
        }
    }

}

function leftClick(dom) {
    var isLei = document.getElementsByClassName('isLei');
    if (dom && dom.classList.contains('isLei')) { //点击到雷,游戏结束
        clearInterval(timer);
        for (var i = 0; i < isLei.length; i++) {
            isLei[i].classList.add('show'); //显示所有雷
        }
        setTimeout(function () { //0.5毫秒后弹窗
            alertBox.style.display = 'block';
            alertImg.style.backgroundImage = 'url("imgs/over.jpg")';
        }, 500);
    } else {
        var n = 0; //以点击的方块为中心,四周存在的雷数
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX = posArr && +posArr[0];
        var posY = posArr && +posArr[1];
        dom && dom.classList.add('num');
        for (var i = posX - 1; i <= posX + 1; i++) {
            for (var j = posY - 1; j <= posY + 1; j++) {
                var aroundBox = document.getElementById(i + '-' + j);
                if (aroundBox && aroundBox.classList.contains('isLei')) { //如果周围存在雷
                    n++;
                }
            }
        }
        dom && (dom.innerHTML = n);
        // console.log(n);
        if (n == 0) { //扩散
            for (var i = posX - 1; i <= posX + 1; i++) {
                for (var j = posY - 1; j <= posY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    if (nearBox && nearBox.length != 0) {
                        if (!nearBox.classList.contains('check')) {
                            nearBox.classList.add('check');
                            leftClick(nearBox);
                            console.log(nearBox);
                        }
                    }
                }
            }
        }
    }
}
function rightClick(dom) {
    if (dom.classList.contains('num')) {
        //若点击有数字的方块，则不进行操作
        return;
    }
    dom.classList.toggle('flag'); //若类名不存在,添加类名,类名存在,删除类名
    if (dom.classList.contains('flag')) {
        mineOver--;
        if(dom.classList.contains('isLei')) {
            realMineOver--;
        }
    } else if (!dom.classList.contains('flag')) {
        mineOver++;
        if(dom.classList.contains('isLei')) {
            realMineOver++;
        }
    }

    score.innerHTML = mineOver;
    if (realMineOver == 0) {
        clearInterval(timer);
        console.log('时间：'+SEC+'.'+MSEC);
        setTimeout(function () {
            alertBox.style.display = 'block';
            alertImg.style.backgroundImage = 'url("imgs/success.png")';
        }, 500);
    }
}