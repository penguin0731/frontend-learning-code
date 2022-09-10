// 随机生成字符串  大小写字母及数字之间四个组成的验证码
// ASCII码中 65~90是小写字母 97~122是大写字母

var arr = [0,1,2,3,4,5,6,7,8,9];
for(var i = 65; i < 122; i++) {
    if(i > 90 && i < 97) {
        continue;
    }
    arr.push(String.fromCharCode(i));
}
var value = '';
var lowerValue = null;
var upperValue = null;
function createCanvas(){
    // 选取要显示的字符
    var canvasStr = '';
    for(var i = 0; i < 6; i++) {
        var index = Math.floor(Math.random() * arr.length);
        var temp = arr[index];
        canvasStr += temp + ' ';
        value += temp;
    }
    console.log(canvasStr);
    //生成验证码区域
    var myCanvas = document.getElementById('myCanvas');
    var ctx = myCanvas.getContext('2d');
    var oImg = new Image();
    oImg.src = './imgs/black.jpg';
    oImg.onload = function() {
        var pattern = ctx.createPattern(oImg, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0,0,myCanvas.clientWidth, myCanvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ccc';
        ctx.font = '46px Roboto Slab';
        ctx.fillText(canvasStr, myCanvas.width/2, 60);
    }
}

createCanvas();

$('.submit').on('click', function(){
    showResult();
});

$('.refresh').on('click',function(){
    createCanvas();
});

function showResult() {
    var inputValue = $('.inputBox input').val();
    lowerValue = value.toLowerCase();
    upperValue = value.toUpperCase();
    if(lowerValue == inputValue || upperValue == inputValue || value == inputValue) {
        $('.inputBox span').css({
            display: 'inline-block',
            color: 'green'
        }).html('√');
        $('.error').css({
            display: 'none'
        });
        createCanvas();
    }else{
        $('.inputBox span').css({
            display: 'inline-block',
            color: 'red'
        }).html('×');
        $('.error').css({
            display: 'inline-block'
        }).html('验证码错误');
        createCanvas();
    }
}