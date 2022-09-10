var menuList = document.getElementsByClassName('menu-list')[0];
var studentListDom = menuList.getElementsByTagName('dd')[0];
var tbody = document.getElementsByTagName('tbody')[0];
var modal = document.getElementsByClassName('modal')[0];
var editForm = document.getElementById('edit-student-form');
var page = document.getElementsByClassName('page')[0];
var tableData = [];     //存放所有学生的数据
var pageTable = [];     //存放相应页数的学生数据
var pageCount = 0;      //总页数
var size = 4;   //每页显示的数据数量

function bindEvent() {
    menuList.addEventListener('click', changeMenu);
    var addStudentBtn = document.getElementById('add-student-btn');
    addStudentBtn.addEventListener('click', addStudent);
    tbody.addEventListener('click', clickTable);
    var mask = document.getElementsByClassName('mask')[0];
    mask.addEventListener('click', function () {
        modal.style.display = 'none';
    });
    var editStudentBtn = document.getElementById('edit-student-btn');
    editStudentBtn.addEventListener('click', editStudent);


}

function pageEvent() {
    var prePage = document.getElementsByClassName('prePage')[0];
    var nextPage = document.getElementsByClassName('nextPage')[0];
    var tcdNum = document.getElementsByClassName('tcdNum');
    // 上一页
    if (prePage) {
        prePage.addEventListener('click', function () {
            var cur = parseInt(document.getElementsByClassName('current')[0].innerHTML) - 1;
            getPageData(cur, size);
            pageCount = Math.ceil(tableData.length / size);
            fillPageHtml(page, { pageCount: pageCount, currentPage: cur });
            pageEvent();
        });
    }
    // 下一页
    if (nextPage) {
        nextPage.addEventListener('click', function () {
            var cur = parseInt(document.getElementsByClassName('current')[0].innerHTML) + 1;
            getPageData(cur, size);
            pageCount = Math.ceil(tableData.length / size);
            fillPageHtml(page, { pageCount: pageCount, currentPage: cur });
            pageEvent();
        });
    }
    // 页码
    for (let i = 0; i < tcdNum.length; i++) {
        tcdNum[i].addEventListener('click', function () {
            var cur = parseInt(this.innerHTML);
            getPageData(cur, size);
            pageCount = Math.ceil(tableData.length / size);
            fillPageHtml(page, { pageCount: pageCount, currentPage: cur });
            pageEvent();
        });
    }
}

function editStudent(e) {
    e.preventDefault();
    var studentObj = getFormData(editForm);
    if (!studentObj) {
        return false;
    }
    transferData('/api/student/updateStudent', studentObj, function (result) {
        alert('修改成功！');
        editForm.reset();
        modal.style.display = 'none';
        getTableData();
        var current = document.getElementsByClassName('current')[0].innerHTML;
        getPageData(current, size);
        pageCount = Math.ceil(tableData.length / size);
        fillPageHtml(page, { pageCount: pageCount, currentPage: current });
        pageEvent();
    });
    return false;
}

function clickTable(e) {
    var tagName = e.target.tagName;
    var index = e.target.getAttribute('data-index');
    if (tagName != 'BUTTON') {
        return false;
    }
    // 是否含有edit的类名,否则为删除按钮
    var isEdit = [].slice.call(e.target.classList).indexOf('edit') > -1;
    if (isEdit) {
        modal.style.display = 'block';
        renderForm(pageData[index]);
    } else {
        var delComfirm = confirm('确认删除?');
        if (delComfirm) {
            transferData('/api/student/delBySno', {
                sNo: pageData[index].sNo
            }, function () {
                alert('删除成功！');
                studentListDom.click();
            });
        }
    }
}

// 数据回填
function renderForm(data) {
    for (var prop in data) {
        if (editForm[prop]) {
            editForm[prop].value = data[prop];
        }
    }
}

function changeMenu(e) {
    var tagName = e.target.tagName;
    // console.log(tagName);
    if (tagName != 'DD') {
        return false;
    }
    var dd = this.getElementsByTagName('dd');
    for (let i = 0; i < dd.length; i++) {
        dd[i].classList.remove('active');
    }
    e.target.classList.add('active');
    var id = e.target.getAttribute('data-id');
    var content = document.getElementById(id);
    var contentActive = document.getElementsByClassName('content-active');
    for (let i = 0; i < contentActive.length; i++) {
        contentActive[i].classList.remove('content-active');
    }
    content.classList.add('content-active');
    if (id == 'student-list') {
        getTableData();
        getPageData(1, size);
        pageCount = Math.ceil(tableData.length / size);
        fillPageHtml(page, { pageCount: pageCount, currentPage: 1 });
        // 分页按钮绑定事件
        pageEvent();
    }
}

// 添加学生信息
function addStudent(e) {
    e.preventDefault();
    var addForm = document.getElementById('add-student-form');
    var studentObj = getFormData(addForm);
    if (!studentObj) {
        return false;
    }
    transferData('/api/student/addStudent', studentObj, function (result) {
        alert('添加成功！');
        // 将form表单的数据清空
        addForm.reset();
        studentListDom.click();
    });
    return false;
}

// 获取所有学生数据 (但不渲染数据)
function getTableData() {
    transferData('/api/student/findAll', {}, function (result) {
        console.log(result);
        // 将所有学生数据保存到全局
        tableData = result.data;
        // renderTable(result.data);
    });
}

// 获取对应页数的学生数据
function getPageData(page, size) {
    transferData('/api/student/findByPage', { page: page, size: size }, function (result) {
        console.log(result);
        // 将对应页数的学生数据保存到全局
        pageData = result.data.findByPage;
        renderTable(result.data.findByPage);
    });
}

// 生成html结构
function fillPageHtml(dom, page) {
    dom.innerHTML = '';
    //上一页
    if (page.currentPage > 1) {
        dom.innerHTML += '<a href="#" class="prePage">上一页</a>';
    } else {
        dom.classList.remove('.prePage');
        dom.innerHTML += '<span class="disabled">上一页</span>';
    }
    //中间页码
    //1 
    if (page.currentPage != 1 && page.currentPage >= 4) {
        dom.innerHTML += '<a href="#" class="tcdNum">1</a>';
    }
    //左... 
    if (page.currentPage - 2 > 2 && page.pageCount > 5) {
        dom.innerHTML += '<span>...</span>';
    }
    //for循环56789 
    var start = page.currentPage - 2;
    var end = page.currentPage + 2;
    if (page.currentPage == 1 && page.pageCount == 4) {
        start = 0;
        end = 4
    } else if (page.currentPage == 1 && page.pageCount == 5) {
        start = 0;
        end = 4
    } else if (args.currentPage == 5 && args.pageCount == 5) {
        start = 2;
    }
    for (; start <= end; start++) {
        if (start <= page.pageCount && start >= 1) {
            if (start != page.currentPage) {
                dom.innerHTML += '<a href="#" class="tcdNum">' + start + '</a>';
            } else {
                dom.innerHTML += '<a href="#" class="current">' + start + '</a>';
            }
        }
    }
    //右... 
    if (page.currentPage + 2 < page.pageCount - 1 && page.pageCount > 5) {
        dom.innerHTML += '<span>...</span>';
    }
    //15             1.. 45678 ..11
    if (page.pageCount != page.currentPage && page.currentPage < page.pageCount - 2 && page.pageCount != 4) {
        dom.innerHTML += '<a href="#" class="tcdNum">' + page.pageCount + '</a>';
    }
    //下一页
    if (page.currentPage < page.pageCount) {
        dom.innerHTML += '<a href="#" class="nextPage">下一页</a>';
    } else {
        dom.classList.remove('.nextPage');
        dom.innerHTML += '<span class="disabled">下一页</span>';
    }

    dom.style.marginLeft = -(dom.clientWidth / 2) + 'px';
}

// 获取form表单数据 包括编辑form和添加学生form
function getFormData(form) {
    var name = form.name.value;
    var sex = form.sex.value;
    var sNo = form.sNo.value;
    var birth = form.birth.value;
    var email = form.email.value;
    var phone = form.phone.value;
    var address = form.address.value;
    if (!name || !sex || !sNo || !birth || !email || !phone || !address) {
        alert('部分数据未填写，请填写完后提交');
        return false;
    }
    var studentObj = {
        name: name,
        sex: sex,
        sNo: sNo,
        birth: birth,
        email: email,
        phone: phone,
        address: address,
    }
    return studentObj;
}

// 渲染数据
function renderTable(data) {
    // <tr>
    //     <td>162101</td>
    //     <td>王小波</td>
    //     <td>男</td>
    //     <td>22</td>
    //     <td>1234@qq.com</td>
    //     <td>17765602401</td>
    //     <td>北京</td>
    //     <td>
    //         <button class="table-btn edit">编辑</button>
    //         <button class="table-btn del">删除</button>
    //     </td>
    // </tr>
    var str = '';
    for (let i = 0; i < data.length; i++) {
        str += '<tr>\
                    <td>' + data[i].sNo + '</td>\
                    <td>' + data[i].name + '</td>\
                    <td>' + (data[i].sex ? '女' : '男') + '</td>\
                    <td>' + (new Date().getFullYear() - data[i].birth) + '</td>\
                    <td>' + data[i].email + '</td>\
                    <td>' + data[i].phone + '</td>\
                    <td>' + data[i].address + '</td>\
                    <td>\
                        <button class="table-btn edit" data-index=' + i + '>编辑</button>\
                        <button class="table-btn del" data-index=' + i + '>删除</button>\
                    </td>\
                </tr>'
    }
    tbody.innerHTML = str;

}

// 向后端存储数据url: 'http://api.duyiedu.com' + '/api/student/findAll'
// param: {appkey: '13926806277_1558879000128'} 或 'appkey=13926806277_1558879000128'
function saveData(url, param) {
    var result = null;
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        // IE
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if (typeof param == 'string') {
        xhr.open('GET', url + '?' + param, false);
    } else if (typeof param == 'object') {
        var str = "";
        for (var prop in param) {
            str += prop + '=' + param[prop] + '&';
        }
        xhr.open('GET', url + '?' + str, false);
    } else {
        xhr.open('GET', url + '?' + param.toString(), false);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                result = JSON.parse(xhr.responseText);
            }
        }
    }
    xhr.send();
    return result;
}

function transferData(url, param, callback) {
    var result = saveData('http://api.duyiedu.com' + url, Object.assign(param, {
        appkey: '13926806277_1558879000128'
    }));
    if (result.status == 'success') {
        callback(result);
    } else {
        alert(result.msg);
    }

}

bindEvent();