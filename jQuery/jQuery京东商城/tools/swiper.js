// jq轮播图插件
(function () {
    $.fn.extend({
        swiper: function (options) {
            options.wrap = this;
            var obj = new Swiper(options);
            obj.init();
        }
    })

    // 构造函数
    function Swiper(options) {
        // 父级
        this.wrapper = options.wrap;
        // 图片列表
        this.imgList = options.imgList;
        // 图片宽度，默认继承父级宽度
        this.imgWidth = options.imgWidth || $(this.wrapper).width();
        // 图片高度，默认继承父级高度
        this.imgHeight = options.imgHeight || $(this.wrapper).height();
        // 是否展示按钮
        this.showBtn = options.showBtn && true;
        // 是否自动轮播
        this.isAuto = options.isAuto && true;
        // 动画效果
        this.swiperType = options.swiperType || 'fade';
        // 索引
        this.index = 0;
        // false时,执行动画
        this.key = false;
        // 轮播方向left->right
        this.direction = 'next';
        // 定时器
        this.timer = null;
        // 初始化轮播图
        this.init = function () {
            // 创建轮播图结构
            this.createDom();
            // 初始化样式
            this.initStyle();
            // 绑定事件
            this.bindEvent();
            // 自动轮播
            if (this.isAuto) {
                clearInterval(this.timer);
                this.autoPlay();
            }
        }
    }

    Swiper.prototype.createDom = function () {
        var oUl = $('<ul class="imgBox"></ul>');
        var oSpot = $('<div class="spotBox"></div>');
        this.imgList.forEach(function (ele) {
            $('<li class="imgItem"><img src="' + ele + '"/></li>').appendTo(oUl);
            $('<span class="point"></span>').appendTo(oSpot);
        });
        if (this.swiperType == 'animate') {
            $('<li class="imgItem"><img src="' + this.imgList[0] + '"/></li>').appendTo(oUl);
        }
        if (this.showBtn) {
            $(this.wrapper)
                .append($('<div class="btn leftBtn">&lt;</div>'))
                .append($('<div class="btn rightBtn">&gt;</div>'));
        }
        $(this.wrapper).append(oUl).append(oSpot);
    }

    Swiper.prototype.initStyle = function () {
        $(this.wrapper).css({
            position: 'relative',
            overflow: 'hidden'
        })
        $('*', this.wrapper).css({
            margin: 0,
            padding: 0,
            listStyle: 'none',
            textDecoration: 'none',
        });
        if (this.swiperType == 'animate') {
            // 将li排成一横排
            $('.imgBox', this.wrapper).css({
                width: this.imgWidth * (this.imgList.length + 1),
                position: 'absolute',
                left: 0,
                top: 0,
            }).find('.imgItem').css({
                float: 'left',
            });
        } else {
            // 将li都叠到一起
            $('.imgBox', this.wrapper).css({
                width: this.imgWidth,
            }).find('.imgItem').css({
                position: 'absolute',
                display: 'none',
            }).eq(0).css({
                display: 'block'
            });
        }
        // fade或animate时, ul li共同的样式
        $('.imgBox', this.wrapper).css({
            height: this.imgHeight
        }).find('.imgItem').css({
            width: this.imgWidth,
            height: this.imgHeight,
        }).find('img').css({
            width: '100%',
            height: '100%',
        });
        // 按钮
        $('.btn', this.wrapper).css({
            position: 'absolute',
            width: 36,
            height: 36,
            lineHeight: '36px',
            backgroundColor: '#000',
            opacity: 0.4,
            textAlign: 'center',
            top: '50%',
            marginTop: '-18px',
            marginLeft: '10px',
            color: '#fff',
            cursor: 'pointer',
            zIndex: 99
        }).filter('.rightBtn').css({
            right: 0,
            marginRight: '10px',
        });
        // 下标点
        $('.spotBox', this.wrapper).css({
            position: 'absolute',
            width: '100%',
            bottom: 0,
            textAlign: 'center',
            zIndex: 99
        }).find('.point').css({
            display: 'inline-block',
            width: 10,
            height: 10,
            backgroundColor: 'transparent',
            border: '2px solid #ddd',
            borderRadius: '50%',
            margin: '0 3px'
        }).eq(this.index).css({
            backgroundColor: "#f40",
            borderColor: 'orange'
        })


    }

    // 绑定事件
    Swiper.prototype.bindEvent = function () {
        var self = this;
        if (self.showBtn) {
            $('.leftBtn', this.wrapper).on('click', function () {
                clearInterval(self.timer);
                self.direction = 'prev';
                self.play(self.direction);
                self.direction = 'next';
            });

            $('.rightBtn', this.wrapper).on('click', function () {
                clearInterval(self.timer);
                self.direction = 'next';
                self.play(self.direction);
            });
        }
        $(this.wrapper).mouseenter(function () {
            clearInterval(self.timer);
        }).mouseleave(function () {
            self.autoPlay();
        });
    }

    Swiper.prototype.moveImg = function () {
        var self = this;
        if (this.swiperType == 'fade') {
            // 先淡出将要隐藏的图片,再淡入将要显示的图片
            $('.imgItem', this.wrapper).fadeOut()
                .eq(self.index).fadeIn(function () {
                    self.key = false;
                });
        } else {
            // 移动ul
            $('.imgBox', this.wrapper).animate({
                left: -self.imgWidth * self.index,
            })
        }
        // 下标点实时更新
        $('.point', this.wrapper).css({ backgroundColor: 'transparent', border: '2px solid #ddd' })
            .eq(self.index % self.imgList.length).css({ backgroundColor: "#f40", borderColor: 'orange' });
    }

    // 轮播
    Swiper.prototype.play = function (direction) {
        var self = this;
        if (self.key) {
            return false;
        }
        if (direction == 'next') {
            // left -> right
            if (self.swiperType == 'fade' && self.index == self.imgList.length - 1) {
                self.index = 0;
            } else if (self.swiperType == 'animate' && self.index == self.imgList.length) {
                $('.imgBox', this.wrapper).css({
                    left: 0,
                });
                self.index = 1;
            } else {
                self.index++;
            }
        } else if (direction == 'prev') {
            // left <- right
            if (self.index == 0) {
                if (self.swiperType == 'animate') {
                    $('.imgBox', this.wrapper).css({
                        left: -self.imgWidth * self.imgList.length,
                    });
                }
                self.index = self.imgList.length - 1;
            } else {
                self.index--;
            }
        }
        self.moveImg();
    }

    // 自动轮播
    Swiper.prototype.autoPlay = function () {
        var self = this;
        this.timer = setInterval(function () {
            self.play(self.direction);
        }, 2000);
    }

})();