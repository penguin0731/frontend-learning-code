var div = document.getElementsByClassName('slider-wrap')[0];
HTMLDivElement.prototype.createTurnPage = function(imgArr) {
    // 结构
    var liNum = imgArr.length;
    var ul1 = '<ul class="slider">';
    var ul2 = '</ul>';
    var li1 = '<li><img src=" ';
    var li2 = ' "></li>';
    var pointsAndBtn = '<div id="points">';
    var span = '<span></span>'
    for(var i = 0; i < liNum; i++) {
        var li = li1 + imgArr[i] + li2;
        ul1 += li;
    }
    for(var j = 0; j < liNum - 1; j++) {
        pointsAndBtn += span;
    }
    var ul = ul1 + ul2;
    pointsAndBtn += '</div>';
    this.innerHTML = ul + pointsAndBtn;
    var points = document.getElementById('points');
    points.style.marginLeft = -(points.clientWidth / 2) + 'px';
    var on = points.children[0].classList.add('on')


    // 逻辑
    var index = 0;
    var timer = null;
    var key = true;
    var slider = document.getElementsByClassName('slider')[0];
    var moveWidth = slider.children[0].offsetWidth;
    var oSpanArr = document.getElementById('points').getElementsByTagName('span');

    for(var i = 0; i < oSpanArr.length; i++) {
        (function(myIndex){
            oSpanArr[i].onclick = function() {
                key = false;
                clearTimeout(timer);
                index = myIndex;
                move(slider, {left: -index * moveWidth}, function(){
                    key = true;
                    timer = setTimeout(autoMove, 1500);
                    changeIndex(index);
                });
            }
        }(i))
    }

    function autoMove (direction) {
        if(key) {
            key = false;
            clearTimeout(timer);
            if(!direction || direction == "next") {
                index ++;
                move(slider,{left: slider.offsetLeft - moveWidth}, function() {
                    if (slider.offsetLeft == -(liNum-1) * moveWidth) {
                        slider.style.left = "0px";
                        index = 0;
                    }
                    timer = setTimeout(autoMove, 1500);
                    key = true;
                    changeIndex(index);
                });
            }else if(direction == "prev") {
                if (slider.offsetLeft == 0) {
                    slider.style.left = -(liNum-1) * moveWidth + 'px';
                    index = (liNum-1);
                }
                index --;
                move(slider,{left: slider.offsetLeft + moveWidth}, function() {
                    timer = setTimeout(autoMove, 1500);
                    key = true;
                    changeIndex(index);
                });
            }
        }

    }

    timer = setTimeout(autoMove, 1500);

    function changeIndex(_index) {
        for(var i = 0; i < oSpanArr.length; i ++) {
            oSpanArr[i].className = '';
        }
        oSpanArr[_index].className = 'on';
    }




    function getStyle(elem, prop) {
        if(window.getComputedStyle) {
        return window.getComputedStyle(elem,null)[prop];  
        }else {
            return elem.currentStyle[prop];
        }
    }

    function move(dom, attrObj, callback) {
        clearInterval(dom.timer);
        var iSpeed = null,
            iCur = null;
        dom.timer = setInterval(function () {
            var stop = true;
            for(var prop in attrObj) {
                if(prop == 'opacity') {
                    iCur = parseFloat(getStyle(dom, prop)) * 100;
                }else {
                    iCur = parseInt(getStyle(dom, prop));
                }
                iSpeed = (attrObj[prop] - iCur) / 7;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if(prop == 'opacity') {
                    dom.style.opacity = (iCur + iSpeed) / 100;
                }else {
                    dom.style[prop] = iCur + iSpeed + 'px';
                }
                if(iCur != attrObj[prop]) {
                    stop = false;
                }
            }
            if(stop) {
                clearInterval(dom.timer);
                typeof(callback) && callback();
            }
        }, 30);
    }
}
div.createTurnPage(['./img/dog1.jpg','./img/dog2.jpg','./img/dog3.jpg','./img/dog1.jpg']);




// .slider-wrap{
//     width: 500px;
//     height: 300px;
//     position: relative;
//     overflow: hidden;
//     margin: 100px auto;
// }

// .slider{
//     position: absolute;
//     width: 2000px;
//     height: 100%;
//     list-style: none;
// }

// .slider li{
//     width: 500px;
//     height: 100%;
//     float: left;
// }

// .slider li img{
//     width: 100%;
//     height: 100%;
// }

// #points{
//     position: absolute;
//     /* width: 42px; */
//     height: 10px;
//     left: 50%;
//     top: 90%;
//     margin-left: -21px;
// }

// #points span{
//     width: 7px;
//     height: 7px;
//     border-radius: 50%;
//     border: 1px solid black;
//     float: left;
//     margin-left: 5px;
//     z-index: 999;
//     cursor: pointer;
// }

// /* 轮播图对应的焦点 */
// .on{
//     background-color: orange;
// }