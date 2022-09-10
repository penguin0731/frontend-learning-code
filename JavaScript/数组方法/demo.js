var personArr = [
    {name: '马云', des: '颈椎不好', img:'./img/1.jpg', sex: 'm', age: 25},
    {name: '小红', des: '肚子饿了', img:'./img/2.jpg', sex: 'f', age: 23},
    {name: '小明', des: 'Hello World!', img:'./img/3.jpg', sex: 'm', age: 18},
    {name: '马花藤', des: '充钱就会变强', img:'./img/4.jpg', sex: 'm', age: 20},
    {name: '储蓄卡', des: '我喜欢唱，跳，rap', img:'./img/5.jpg', sex: 'f', age: 30}
];

var oUl = document.getElementsByTagName('ul')[0];
var oInput = document.getElementById('search');
var low = document.getElementById('low');
var high = document.getElementById('high');

store.subscribe(function() {
    renderPage(lastFilterArr(personArr));
});

// 数据渲染
function renderPage(data) {
    var htmlStr = '';
    data.forEach(function(elem, index){
        htmlStr += '<li><img src="' + elem.img +'" alt=""><p class="name">' + elem.name + '(' + elem.age + '岁)' +'</p><p class="des">' + elem.des +'</p></li>';
    });
    oUl.innerHTML = htmlStr;
}
renderPage(personArr);

// 添加行为
// 输入行为
// 处理行为
oInput.oninput = debounce(function() {
    // 输入行为
    var action = {type: 'text', value: this.value};
    // 处理行为
    store.dispatch(action);
}, 500);


// btn 切换
// 通过数组的slice(截取)方法将类数组转化为数组
var oBtnArr = [].slice.call(document.getElementsByClassName('btn'));
var lastActiveBtn = oBtnArr[2];
oBtnArr.forEach(function(elem, index, self){
    elem.onclick = function() {
        changeActive(this);
        // 输入行为
        var action = {type: 'sex', value: this.getAttribute('sex')};
        // 处理行为
        store.dispatch(action);
    }
});

low.oninput = debounce(function() {
    ageInput();
}, 500);
high.oninput = debounce( function() {
    ageInput();
}, 500);
function ageInput() {
    var action = {type: 'age', value: {low: low.value, high: high.value}};
    store.dispatch(action);
}



function changeActive(curActiveBtn) {
    curActiveBtn.className = 'btn active';
    lastActiveBtn.className = 'btn';
    lastActiveBtn = curActiveBtn;
}

