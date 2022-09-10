// 基础库，这里放一些工具，如继承、扩展、单例

var tool = {
    // 继承
    inherit: function (Target, Origin) {
        var F = function(){};
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constructor = Target;
        // 目标最终继承的构造函数
        Target.prototype.uber = Origin.prototype.constructor;
    },

    // 扩展
    extends: function (Origin) {
        var Target = function () {
            Origin.apply(this, arguments);
            return this;
        }
        this.inherit(Target, Origin);
        return Target;
    },

    // 单例
    single: function (Origin) {
        var singleResult = (function () {
            var instance;
            return function () {
                if(typeof instance == 'object') {
                    return instance;
                }
                Origin && Origin.apply(this, arguments);
                // 将实例对象赋给instance
                instance = this;
            }
        })();
        Origin && this.inherit(singleResult, Origin);
        return singleResult;
    }
}
