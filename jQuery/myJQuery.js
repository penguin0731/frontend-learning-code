(function(){
    function jQuery(selector, context) {
        return new jQuery.prototype.init(selector, context);
    }

    jQuery.prototype.init = function(selector, context) {
        this.length = 0;

        // 判断是否是class类名
        if(selector.indexOf('.') != -1) {
            // 将class类名的.截掉
            var dom = document.getElementsByClassName( selector.slice(1) );
        }else if(selector.indexOf('#') != -1) {
            var dom = document.getElementById( selector.slice(1) );
        }

        // 判断是否为class(id唯一)
        if(this.length) {
            this[0] = dom;
            this.length ++;
        } else {
            for(var i = 0; i < dom.length; i++) {
                this[i] = dom;
                this.length ++;
            }
        }

    }

    jQuery.prototype.css = function(config) {
        for(var i = 0; i < this.length; i ++) {
            for(var attr in config) {
                this[i].style[attr] = config[attr];
            }
        }
        // 链式调用的精髓
        return this;
    }





    // 自定义事件封装
    jQuery.prototype.myOn = function(type, handle) {
        for(var i = 0; i < this.length; i ++) {
            if( !this[i].cacheEvent ) {
                this[i].cacheEvent = {}
            }
            // 自定义事件数组里存放绑定的函数
            this[i].cacheEvent[type] == undefined ? this[i].cacheEvent[type] = [handle] : this[i].cacheEvent[type].push(handle);
        }
    }

    // 触发器封装
    jQuery.prototype.myTrigger = function(type) {
        // 自定义事件的参数
        var params = arguments.length > 1 ? [].slice.call(arguments, 1) : [];
        var self = this;
        for(var i = 0; i < this.length; i ++) {
            if( this[i].cacheEvent[type] ) {
                this[i].cacheEvent[type].forEach(function(ele, index) {
                    ele.apply(self, params);
                });
            }
        }
    }

    // 队列
    jQuery.prototype.myQueue = function() {
        var queueObj = this;
        // 'fx'是animate函数独有的队列
        var queueName = arguments[0] || 'fx';
        var addFun = arguments[1] || null;
        var len = arguments.length;
        if(len == 1) {
            return queueObj[0][queueName];
        }
        // 添加队列 或 往已有队列中添加内容
        queueObj[0][queueName] == undefined ? queueObj[0][queueName] = [addFun] : queueObj[0][queueName].push(addFun);
        return this;
    }

    // 出队
    jQuery.prototype.myDequeue = function() {
        var self = this;
        // 队列名
        var queueName = arguments[0] || 'fx';
        // 获取队列的内容数组
        var queueArr = this.myQueue(queueName);
        // 移除队列的起始位,并存到curFunc
        var curFunc = queueArr.shift();
        
        if(curFunc == undefined) {
            return;
        }
        var next = function() {
            self.myDequeue(queueName);
        }
        curFunc(next);
        return this;
    }

    // 清除队列
    jQuery.prototype.clearQueue = function() {
        var queueName = arguments[0] || 'fx';
        var queueArr = this.myQueue(queueName);
        queueArr.splice(0, queueArr.length);
        return queueArr;
    }



    // callback工具方法
    jQuery.myCallback = function () {
        // 存储参数
        var option = arguments[0] || '';
        // 通过add加入的方法
        var list = [];
        // 记录当前要执行的函数索引
        var fireIndex = 0;
        // 记录是否被fire过
        var fired = false;
        // 实际参数列表
        var args = [];

        var fire = function () {
            for(; fireIndex < list.length; fireIndex++) {
                list[fireIndex].apply(window, args);
            }
            if(option.indexOf('once') != -1) {
                list = [];
                fireIndex = 0;
            }
        }



        return {
            add: function (func) {
                list.push(func);
                if(option.indexOf('memory') != -1 && fired) {
                    fire();
                }
                return this;
            },
            fire: function () {
                fired = true;
                // 执行时第一步先将索引归0
                fireIndex = 0;
                args = arguments;
                fire();
            }
        }
    }

    jQuery.myDeferred = function () {
        // 3个callbakck
        //         注册      触发
        //  成功   done     resolve
        //  失败   fail     reject
        // 进行时 progress  notify

        var cbArr = [
            [jQuery.myCallback('once'), 'done', 'resolve'],
            [jQuery.myCallback('once'), 'fail', 'reject'],
            [jQuery.myCallback('memory'), 'progress', 'notify'],
        ];
        var deferred = {
            myPromise: function () {
                for(var i = 0; i < cbArr.length; i++) {
                    delete this[cbArr[i][2]];
                }
                return this;
            }
        };
        var pedding = true;
        for(var i = 0; i < cbArr.length; i++) {
            // 注册
            // deferred.done = function () {}
            // deferred.fail = function () {}
            // deferred.progress = function () {}
            deferred[i][1] = (function (index) {
                return function (func) {
                    cbArr[index][0].add(func);
                }
            })(i);

            // 触发
            // deferred.resolve = function () {}
            // deferred.reject = function () {}
            // deferred.notify = function () {}
            deferred[i][2] = (function (index) {
                return function () {
                    var args = arguments;
                    if(pedding) {
                        cbArr[index][0].fire().apply(window, args);
                        // 若触发的是notify,则继续触发
                        cbArr[index][2] == 'resolve' || cbArr[index][2] == 'reject' ? pedding = false : '';
                    }
                }
            })(i);

        }

        return deferred;
    }

    jQuery.prototype.init.prototype = jQuery.prototype;

    // 将jQuery函数保存到全局
    window.$ = window.jQuery = jQuery;
})()