var slider = document.getElementsByClassName('slider')[0];
var moveWidth = slider.children[0].offsetWidth;
var timer = null;
var num = slider.children.length - 1;    //不同图片的数量
var prev = document.getElementsByClassName('prev')[0];
var next = document.getElementsByClassName('next')[0];
var oSpanArr = document.getElementById('points').getElementsByTagName('span');
var key = true;
var index = 0;

prev.onclick = function() {
    autoMove("prev")
}

next.onclick = function() {
    autoMove("next")
}

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
// direction
// 默认方向/next 按钮  left->right
// 点击prev按钮        left<-right
function autoMove (direction) {
    if(key) {
        key = false;
        clearTimeout(timer);
        if(!direction || direction == "next") {
            index ++;
            move(slider,{left: slider.offsetLeft - moveWidth}, function() {
                if (slider.offsetLeft == -num * moveWidth) {
                    slider.style.left = "0px";
                    index = 0;
                }
                timer = setTimeout(autoMove, 1500);
                key = true;
                changeIndex(index);
            });
        }else if(direction == "prev") {
            if (slider.offsetLeft == 0) {
                slider.style.left = -num * moveWidth + 'px';
                index = num;
            }
            index --;
            move(slider, {left: slider.offsetLeft + moveWidth}, function() {
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