import lodash from 'lodash-es';

var aaa = function () {
    console.log('aaa');
}

var isArray = function (args) {
    console.log(lodash.isArray(args));
}

// 暴露一个对象，包含两个函数
export {
    aaa,        //相当于 aaa: aaa,
    isArray     //相当于 isArray: isArray
}