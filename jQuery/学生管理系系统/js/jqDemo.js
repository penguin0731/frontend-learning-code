var curPage = 1;    //当前页数
var pageSize = 5;   //每页显示的数量
var pageCount = 1;  //总页数
var pageData = [];  //存放相应页数的学生数据
function bindEvent() {
    $('.menu-list').eq(0).on('click', 'dd', function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var id = $(this).data('id');
        if(id == 'student-list') {
            getPageData();
        }
        $('.content').fadeOut();
        $('#' + id).fadeIn();
    });
    // 添加学生页面的提交按钮
    $('#add-student-btn').on('click', function (e) {
        e.preventDefault();
        // 获取表单数据 serialize(string形式获取)  serializeArray(数组形式获取)
        var data = $('#add-student-form').serializeArray();
        data = checkData(data);
        if (data) {
            transferData('/api/student/addStudent', data, function () {
                alert('添加成功！');
                $('#add-student-form')[0].reset();
                $('.menu-list > dd[data-id=student-list]').trigger('click');
            });
        }
    });
    $('tbody').eq(0).on('click', '.table-btn', function () {
        var isEdit = $(this).hasClass('edit');
        var index = $(this).data('index');
        if (isEdit) {
            $('.modal').slideDown();
            renderForm(pageData[index]);
        } else {
            var del = confirm('确认删除?');
            if (del) {
                transferData('/api/student/delBySno', {
                    sNo: pageData[index].sNo
                }, function () {
                    alert('删除成功！');
                    $('.menu-list > dd[data-id=student-list]').trigger('click');
                });
            }
        }
    });
    $('.mask').eq(0).on('click', function () {
        $('.modal').slideUp();
    });
    // 编辑学生信息页面的提交按钮
    $('#edit-student-btn').on('click', function (e) {
        e.preventDefault();
        // 获取表单数据 serialize(string形式获取)  serializeArray(数组形式获取)
        var data = $('#edit-student-form').serializeArray();
        data = checkData(data);
        if (data) {
            transferData('/api/student/updateStudent', data, function () {
                alert('修改成功！');
                $('.modal').slideUp();
                $('.menu-list > dd[data-id=student-list]').trigger('click');
            });
        }
    });

}

function renderForm(data) {
    // 获取原生dom
    var editForm = $('#edit-student-form')[0];
    for (var prop in data) {
        if (editForm[prop]) {
            editForm[prop].value = data[prop];
        }
    }
}

// 获取表格数据
function getPageData () {
    transferData('/api/student/findByPage', {
        page: curPage,
        size: pageSize
    }, function (result) {
        console.log(result)
        pageData = result.findByPage;
        pageCount = Math.ceil(result.cont / pageSize);
        console.log(pageCount);
        renderTable(result.findByPage);
    });
}

// 渲染表格数据
function renderTable (data) {
    var str = '';
    data.forEach(function (ele, index) {
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
    $('.page').eq(0).createPage({
        pageCount: pageCount,
        currentPage: curPage,
        backFun: function (cur, pageCount) {
            curPage = cur;
            pageCount = pageCount;
            getPageData();
        }
    });
}

function transferData(url, param, callback) {
    $.ajax({
        url: 'http://api.duyiedu.com' + url,
        type: 'get',
        data: $.extend({
            appkey: '13926806277_1558879000128',
        }, param),
        dataType: 'json',
        success: function (res) {
            if (res.status == 'success') {
                callback(res.data);
            }else {
                alert(res.msg);
            }
        }
    });
}

// 校验数据填写是否规范
function checkData(data) {
    var obj = {};
    var flag = true;
    data.forEach(function (ele, index) {
        obj[ele.name] = ele.value
        if (!ele.value) {
            flag = false;
        }
    });
    if (!flag) {
        return false;
    }
    return obj;
}

function init() {
    bindEvent();
    $('.menu-list > dd[data-id=student-list]').trigger('click');
}
init();

