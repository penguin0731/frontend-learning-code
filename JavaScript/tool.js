//判断数据类型
function myType(target) {
    //1.分两类  原始值  引用值
    //2.区分引用值
    var ret = typeof (target);
    var _str = Object.prototype.toString;
    var temp = {
        "[object Array]": "array",
        "[object Object]": "object",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Boolean]": "boolean"
    }
    if (target === null) {
        return "null";
    }
    if (ret == 'object') {
        //数组
        //对象
        //包装类  Object.prototype.toString  new Number()
        var str = _str.call(target);
        return temp[str];
    } else {
        return ret;
    }
}

// 深度克隆
function deepClone(origin, target) {
    var target = target || {},
        toStr = Object.prototype.toString,
        arrStr = "[object Array]";
    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) {
            if (origin[prop] !== null && typeof (origin[prop]) == 'object') { //是否为引用值
                target[prop] = toStr.call(origin[prop]) == arrStr ? [] : {};
                deepClone(origin[prop], target[prop]); //克隆origin[prop]
            } else {
                target[prop] = origin[prop];      //原始值
            }
        }
    }
    return target;
}


// insertAfter()的封装方法 --与insertBefore()相反
// 忽略老版本浏览器，直接在Element.prototype上编程
Element.prototype.insertAfter = function (targetNode, afterNode) {
    var beforeNode = afterNode.nextElementSibling;
    if (beforeNode == null) {
        this.appendChild(targetNode);
    } else {
        this.insertBefore(targetNode, beforeNode);
    }
}


// 查看滚动条滚动距离
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        // IE8和IE8以下浏览器
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}


// 查看窗口尺寸
function getViewPortOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        // 怪异模式
        if (document.compatMode === "BackCompat") {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }
}


/**
 * 获取dom元素的样式
 * @param {*} elem 元素
 * @param {*} prop 样式
 */
function getStyle(elem, prop) {      
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
}


// 封装兼容性的绑定事件方法
function addEvent(elem, type, handle) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handle, false);
    } else if (elem.attachEvent) { //IE独有
        elem.attachEvent('on' + type, function () {
            handle.call(elem);
        });
    } else {
        elem['on' + type] = handle;
    }
}


// 封装阻止默认事件的函数
function cancelHandler(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

// 异步加载
function loadScript(url, callBack) {
    var script = document.createElement('script');
    if (script.readyState) {
        script.onreadystatechange = function () {    //IE
            if (script.readyState == 'complete' || script.readyState == 'loaded') {
                callBack();
            }
        }
    } else {
        script.onload = function () {    // Chrome Safari Firefox Opera
            callBack();
        }
    }
    script.url = url;
    document.head.appendChild(script);
}
loadScript()


// 拖拽方法
function drag(elem) {
    var disX,
        disY;
    elem.onmousedown = function (e) {
        disX = e.pageX - parseInt(elem.offsetLeft);
        disY = e.pageY - parseInt(elem.offsetTop);
        document.onmousemove = function (e) {
            var event = e || window.event;
            elem.style.left = event.pageX - disX + "px";
            elem.style.top = event.pageY - disY + "px";
        }
        elem.onmouseup = function () {
            document.onmousemove = null;
        }
    }
}

// 节流
// 每过一秒按钮功能才可以触发
// 	<div class="show">0</div>
// <button class="btn">按钮</button>
$('.btn').click(throttle(buy, 1000));
function throttle(handler, wait) {
    var lastTime = 0;
    return function (...args) {
        var newTime = Date.now();
        if (newTime - lastTime > wait) {
            handler.apply(this, args);
            lastTime = newTime;
        }
    }
}
function buy(e) {
    $('.show').text(parseInt($('.show').text()) + 1);
}


// 防抖
// 1.5秒后输出输入框中的数据(常用于搜索框)
//<input type="text" class="inp">
// var oInp = document.getElementsByClassName('inp')[0];
// oInp.oninput = debounce(ajax, 1500);
function debounce(handler, delay) {
    var timer;
    return function(...args) {
        var _this = this;
        clearTimeout(timer);
        timer = setTimeout(function () {
            handler.apply(_this, args);
        }, delay);
    }
}
function ajax(e) {
    console.log(e, this.value);
}

// 封装ClassName
{/* <div class="wrapper" id="ow">
        <span class=" demo   active   index  "></span>
        <p class="    index  demo"></p>
        <div class=" demodemo    "></div>
        <div class="  demo   index   "></div>
        <span class="active    demo   "></span>
</div> */}
// Element.prototype.getElementsByClassName = Document.prototype.getElementsByClassName = function (_className) {
//     // _classname
//     // 获取所有标签
//     var allDomArr = this.getElementsByTagName('*');
//     var _classNameArr = trimSpace(_className).trim().split(' ');    //用空格将字符分割
//     var lastDomArr = [];
//     function trimSpace(strClass) {  //将所有空格都替换成一个空格
//         var reg = /\s+/g;
//         return strClass.replace(reg, ' ');
//     }
//     String.prototype.trim = function () {   //去掉首尾空格
//         var reg = /(^\s|\s$)+/g;
//         return this.replace(reg, '');
//     }
//     for (var i = 0; i < allDomArr.length; i ++) {
//         var lastStrClass = trimSpace(allDomArr[i].className).trim();
//         var classArr = lastStrClass.split(' ');
//         var count = 0;
//         for(var j = 0; j < _classNameArr.length; j ++) {
//             var temp = _classNameArr[j];
//             console.log(temp);
//             for(var k = 0; k < classArr.length; k ++) {
//                 if(temp == classArr[k]) {
//                     count ++;
//                     break;
//                 }
//             }
//         }
//         if(count == _classNameArr.length) {
//             lastDomArr.push(allDomArr[i]);
//         }
//     }
//     return lastDomArr;
// }
// var ow = document.getElementById('ow');
// console.log(ow.getElementsByClassName('  demo   index  '));