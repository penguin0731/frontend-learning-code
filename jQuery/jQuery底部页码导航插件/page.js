// $.fn = jquery.prototype

(function ($) {
    //实现翻页功能
    function init(dom, args) {
        if (args.currentPage <= args.pageCount) {
            fillHtml(dom, args);
            bindEvent(dom, args);
        } else {
            alert('请输入正确页数');
        }
    }

    //生成html结构
    function fillHtml(dom, args) {
        dom.empty();
        //上一页
        if (args.currentPage > 1) {
            dom.append('<a href="#" class="prePage">上一页</a>');
        } else {
            dom.remove('.prePage');
            dom.append('<span class="disabled">上一页</span>');
        }
        //中间页码
        //1 
        if (args.currentPage > 3) {
            dom.append('<a href="#" class="tcdNum">1</a>');
        }
        //左... 
        if (args.currentPage > 4) {
            dom.append('<span>...</span>');
        }
        //for循环56789 
        for (var i = args.currentPage - 2; i <= args.currentPage + 2; i++) {
            if (i == args.currentPage) {
                dom.append('<a href="#" class="current">' + i + '</a>');
            } else if(i > 0 && i <= args.pageCount) {
                dom.append('<a href="#" class="tcdNum">' + i + '</a>');
            }
        }
        //右... 
        if (args.currentPage + 2 < args.pageCount - 1) {
            dom.append('<span>...</span>');
        }
        //15             1.. 45678 ..11
        if (args.currentPage + 2 < args.pageCount) {
            dom.append('<a href="#" class="tcdNum">' + args.pageCount + '</a>');
        }
        //下一页
        if (args.currentPage < args.pageCount) {
            dom.append('<a href="#" class="nextPage">下一页</a>');
        } else {
            dom.remove('.nextPage');
            dom.append('<span class="disabled">下一页</span>');
        }
    }

    function bindEvent(dom, args) {
        $('.prePage').on('click', function () {
            var cur = parseInt($('.current').text()) - 1;
            fillHtml(dom, { pageCount: args.pageCount, currentPage: cur });
            bindEvent(dom, args);
            args.backFun(cur, args.pageCount);
        });
        $('.nextPage').on('click', function () {
            var cur = parseInt($('.current').text()) + 1;
            fillHtml(dom, { pageCount: args.pageCount, currentPage: cur });
            bindEvent(dom, args);
            args.backFun(cur, args.pageCount);
        });
        $('.tcdNum').on('click', function () {
            var cur = parseInt($(this).text());
            fillHtml(dom, { pageCount: args.pageCount, currentPage: cur });
            bindEvent(dom, args);
            args.backFun(cur, args.pageCount);
        });
    }


    $.fn.createPage = function (options) {
        var args = $.extend({   //若没传options,则默认以下值
            pageCount: 10,
            currentPage: 1,
            backFun: function(curPage, pageCount){
                console.log('当前页数：' + curPage + ', 总页数：' + pageCount);
            }
        }, options);
        init(this, args);
        return this;
    }
}(jQuery));
