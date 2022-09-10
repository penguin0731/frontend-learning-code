// 引入其他js文件
// importScripts('./demo.js');
this.onmessage = function (e) {
    var result = 0;
    for(var i = 0; i < e.data.num; i++) {
        result += i;
    }
    this.postMessage(result);
}