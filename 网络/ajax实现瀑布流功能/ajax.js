// ajax --->  async javascript and json
//  ajax  用来数据通信

//  请求方式
//  GET / POST / HEAD / DELETE / PUT 
/* 
    * method  请求方式
    * url  请求地址
    * callback 成功的回调函数
    * data 请求参数
    * flag 是否异步
*/
function ajax(method, url, callback, data, flag) {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    // readyState变化是才会触发
    xhr.onreadystatechange = function () {
        // 1 - 4
        // 4: 表示请求完成
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText);
            } else {
                console.log('error');
            }
        }
    }
    method = method.toUpperCase();
    if (method == 'GET') {
        var date = new Date(),
            timer = date.getTime();
        // 建立连接
        xhr.open(method, url + '?' + data + '&timer=' + timer, flag);
        // 数据通信
        xhr.send();
    } else if (method == 'POST') {
        // 建立连接
        xhr.open(method, url, flag);
        // ContentType:application/x-www-form-urlencoded 表示数据通信的过程当中  编码格式key=value&key1=value1
        // application/json  编码格式为json字符串的形式
        // multiply/form-data  用来传递文件---》 转化成2进制文件
        // text/plain  文本形式
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // 发送数据
        xhr.send(data);
    }
}