(function () {
    var obj = {
        init: function () {
            this.dataList = [];
            this.bindEvent();
        },
        bindEvent: function () {
            var self = this;
            $('.left-menu').on('click', 'dd', function() {
                var id = $(this).data('id');
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                if(id == 'student-list') {
                    self.getAllData();
                }
                $('.content-item').fadeOut();
                $('#' + id).fadeIn();
            });
        },
        getAllData: function () {
            var self = this;
            $.ajax({
                url: 'http://api.duyiedu.com//api/student/findAll?appkey=13926806277_1558879000128',
                beforeSend: function () {
                    $('tbody').eq(0).html('<p>正在加载中...</p>');
                },
                success: function (data) {
                    self.dataList = JSON.parse(data);
                    console.log(self.dataList);
                    self.renderDom();
                },
                error: function () {
                    alert('获取信息失败');
                }
            })
        },
        renderDom: function () {
            var str = '';
            var dataList = this.dataList.data;
            var len = dataList.length;
            if(len > 0) {
                dataList.forEach(function (ele, index) {
                    str += '<tr>\
                                <td>' + ele.sNo + '</td>\
                                <td>' + ele.name + '</td>\
                                <td>' + (ele.sex ? '女' : '男') + '</td>\
                                <td>' + (new Date().getFullYear() - ele.birth) + '</td>\
                                <td>' + ele.email + '</td>\
                                <td>' + ele.phone + '</td>\
                                <td>' + ele.address + '</td>\
                                <td>\
                                    <button class="table-btn edit" data-index="' + index +'">编辑</button>\
                                    <button class="table-btn del" data-index="' + index +'">删除</button>\
                                </td>\
                            </tr>'
                });
                $('tbody').eq(0).html(str);
                // 渲染结构后再绑定编辑按钮和删除按钮事件
                this.show();
            }
        },
        show: function () {
            $('tbody').eq(0).on('click', '.table-btn', function () {
                var index = $(this).data('index');
                var isEdit = $(this).hasClass('edit');
                if(isEdit) {
                    
                }
            })
        }

    }
    obj.init();
}());