// https://photo.weibo.com/5648857772/welcome/hot
var page = 1;
var oUl = document.getElementsByClassName('item');
var lock = false;
var timer = null;
// 获取最短的一列,用于插入图片
function getMinUl () {
    var minUl = 0;
    var minHeight = oUl[0].offsetHeight;
    for(var i = 0; i < oUl.length; i ++) {
        if(minHeight > oUl[i].offsetHeight) {
            minHeight = oUl[i].offsetHeight;
            minUl = i;
        }
    }
    return {
        minUl: minUl,
        minHeight: minHeight
    }
}

function getData () {
    if (lock) {
        return false;
    }
    lock = true;
    ajax('GET', './data.json', renderData, 'page=' + page, true);
    page++;
}

function renderData (data) {
    console.log(JSON.parse(data));
    data = JSON.parse(data);
    var dataList = data.data.hotPicture;
    dataList.forEach(function (ele, index) {
        var min = getMinUl();
        var minIndex = min.minUl;
        var oLi = document.createElement('li');
        var oP = document.createElement('p');
        var img = new Image();
        img.src = ele.url;
        img.width = oUl[minIndex].offsetWidth - 20;
        img.height = img.width * ele.image_height / ele.image_width;
        oP.innerHTML = ele.name + '上传到专辑' + ele.album_name;
        oLi.appendChild(img);
        oLi.appendChild(oP);
        oUl[minIndex].appendChild(oLi);
    });
    lock = false;
}

window.onscroll = function () {
    var scrollTop = document.documentElement.scrollTop;
    var clientHeight = document.documentElement.clientHeight;
    var minHeight = getMinUl().minHeight;
    clearTimeout(timer);
    if (minHeight < scrollTop + clientHeight) {
        timer = setTimeout(function () {
            getData();
        }, 500);
    }
}

getData();