// 根据性别过滤
function filterArrBySex(data, sex) {
    if(sex == 'a') {
        return data;
    }else {
        return data.filter(function(elem){
            return elem.sex == sex;
        })
    }
}