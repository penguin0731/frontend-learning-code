// 过滤文本的函数  纯函数
function filterArrByText (data,text) {
    if(!text) {
        return data;
    }else {
        return data.filter(function(elem) {
            return elem.name.indexOf(text) != -1;
        });
    }
}