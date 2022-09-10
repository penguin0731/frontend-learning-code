//点击开始游戏 ==> startPage消失 ==> 游戏开始
//随机出现食物,三节蛇开始运动
//方向键操作蛇的运动
//判断是否吃到食物 ==> 食物消失,蛇的长度加1
//判断游戏结束，弹出提示框

var content = document.getElementsByClassName('content')[0];
var startPage = document.getElementsByClassName('startPage')[0];
var startBtn = document.getElementsByClassName('startBtn')[0];
var startPause = document.getElementById('start-pause');
var scoreBox = document.getElementById('score');
var loser = document.getElementsByClassName('loser')[0];
var point = document.getElementsByClassName('point')[0];
var closeBtn = document.getElementsByClassName('closeBtn')[0];
var snakeMove,
    speed = 200;
var startPauseBool = true;//游戏开始暂停锁
var startGameBool = true;//游戏开始结束锁


init();
function init() {
    //地图
    this.mapW = parseInt(getComputedStyle(content).width);//地图宽
    this.mapH = parseInt(getComputedStyle(content).height);//地图高
    this.mapDiv = content;
    //食物
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;
    //蛇
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [[3,0,'head'],[2,0,'body'],[1,0,'body']];
    //游戏属性
    this.derect = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    //游戏分数
    this.score = 0;
    bindEvent();
}

function startGame() {
    startPage.style.display = 'none';
    startPause.style.display = 'block';
    food();
    snake();
}

//随机生成食物
function food() {
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random() * (mapW / 20));
    this.foodY= Math.floor(Math.random() * (mapH / 20));
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    this.mapDiv.appendChild(food).setAttribute('class', 'food');
}

function snake() {
    for(var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');

        switch(this.derect){
            case 'up':
                snake.style.transform = 'rotate(270deg)';
                break;
            case 'down': 
                snake.style.transform = 'rotate(90deg)';
                break;
            case 'left':
                snake.style.transform = 'rotate(180deg)';
                break;
            case 'right':
                break;
            default: 
                break;
        }
    }
}

function move() {
    for(var i = this.snakeBody.length - 1; i > 0; i--) {
        //运动时,从蛇尾开始,每一节的坐标都跟它上一节坐标相同
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    switch(this.derect){
        case 'up'://蛇头向上运动时,蛇头的x坐标-1
            this.snakeBody[0][1] -= 1;
            break;
        case 'down': //蛇头向下运动时,蛇头的x坐标+1
            this.snakeBody[0][1] += 1;
            break;
        case 'left'://蛇头向左运动时,蛇头的x坐标-1
            this.snakeBody[0][0] -= 1;
            break;
        case 'right'://蛇头向右运动时,蛇头的x坐标+1
            this.snakeBody[0][0] += 1;
            break;
        default: 
            break;
    }
    removeClass('snake');
    snake();
    //当蛇头与食物坐标相同时
    //分数+1并插入到score中,清楚food,再随机生成food
    if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        var snakeEndX = snakeBody[snakeBody.length - 1][0],
            snakeEndY = snakeBody[snakeBody.length - 1][1];
        switch(this.derect){
            case 'up':
                this.snakeBody.push([snakeEndX, snakeEndY - 1,'body']);
                break;
            case 'down': 
                this.snakeBody.push([snakeEndX, snakeEndY + 1,'body']);
                break;
            case 'left':
                this.snakeBody.push([snakeEndX - 1, snakeEndY,'body']);
                 break;
            case 'right':
                this.snakeBody.push([snakeEndX + 1, snakeEndY,'body']);
                break;
            default: 
                break;
        }
        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }
    if(this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / 20) {
        reloadGame();
    }
    if(this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / 20) {
        reloadGame();
    }
    var snakeHeadX = this.snakeBody[0][0],
        snakeHeadY = this.snakeBody[0][1];
    for(var i = 1; i < snakeBody.length; i++) {
        if(snakeHeadX == snakeBody[i][0] && snakeHeadY == snakeBody[i][1]) {
            reloadGame();
        }
    }
}

function reloadGame() {
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);
    loser.style.display = 'block';
    point.innerHTML = this.score;

    //蛇
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [[3,0,'head'],[2,0,'body'],[1,0,'body']];
    //游戏属性
    this.derect = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    //游戏分数
    this.score = 0;
    scoreBox.innerHTML = this.score;
    startPauseBool = true;
    startGameBool = true;
    startPause.setAttribute('src', 'imgs/start.png');
}

function removeClass(className) {
    var elem = document.getElementsByClassName(className);
    while(elem.length > 0){
        elem[0].parentNode.removeChild(elem[0]);
    }
}

function setDerect(code) {
    switch(code) {
        case 37://左
            if(this.left) {
                this.derect = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38://上
            if(this.up) {
                this.derect = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39://右
            if(this.right) {
                this.derect = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40://下
            if(this.down) {
                this.derect = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        default:
            break;
    }
}

function bindEvent() {
    startBtn.onclick = function() {
        startAndPause();
    }
    startPause.onclick = function() {
        startAndPause();
    }
    closeBtn.onclick = function() {
        loser.style.display = 'none';
    }
}

function startAndPause() {
    if(startPauseBool) {
        if(startGameBool) {
            startGame();
            startGameBool = false;
        }
        startPause.setAttribute('src', 'imgs/pause.png');
        snakeMove = setInterval(function() {
            move();
        }, speed);
        document.onkeydown = function(e) {
            var code = e.keyCode;
            setDerect(code);
            if(code == 38 || code == 40) {
                e.preventDefault();
            }
        }
        startPauseBool = false; 
    }else{
        startPause.setAttribute('src', 'imgs/start.png');
        clearInterval(snakeMove);
        document.onkeydown = function(e) {
            e.returnValue = false;
            return false;
        }
        startPauseBool = true;

    }
}