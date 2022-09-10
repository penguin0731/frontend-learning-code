"use strict";

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

function _classCallCheck(instance, Constructor) {
    // 判断instance是不是Constructor的实例
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true,
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

var A = /*#__PURE__*/ (function () {
    // 该立即执行函数的返回结果，应该是构造函数A
    // 构造函数A，对应类中的constructor
    function A() {
        // 参数默认值
        var b =
            arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
        // 判断调用函数是否是构造函数
        _classCallCheck(this, A);
        // 给this定义一个属性prop1,，值为1
        _defineProperty(this, "prop1", 1);

        _defineProperty(this, "method2", function () {
            for (
                var _len = arguments.length, args = new Array(_len), _key = 0;
                _key < _len;
                _key++
            ) {
                args[_key] = arguments[_key];
            }

            console.log(args);
        });

        this.prop2 = b;
    }

    // 为构造函数A定义原型方法和静态方法
    _createClass(
        A,
        [
            {
                key: "method1",
                value: function method1() {
                    console.log("method1");
                },
            },
        ],
        [
            {
                key: "method3",
                value: function method3() {
                    console.log("method3", this);
                },
            },
        ]
    );

    return A;
})();

_defineProperty(A, "method4", function () {
    console.log("method4", A);
});
