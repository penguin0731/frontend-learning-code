var game = new Game();
game.timer = null;
game.score = 0;
game.init = function () {
    clearInterval(this.timer);
    ground.init();
    snake.init();
    createFood();
    // 键盘事件
    document.onkeydown = function (e) {
        if (e.which == 37 && snake.direction != directionNum.right) {
            snake.direction = directionNum.left;
        } else if (e.which == 38 && snake.direction != directionNum.bottom) {
            snake.direction = directionNum.top;
        } else if (e.which == 39 && snake.direction != directionNum.left) {
            snake.direction = directionNum.right;
        } else if (e.which == 40 && snake.direction != directionNum.top) {
            snake.direction = directionNum.bottom;
        }
    }
    var btn = document.getElementById('btn');
    game.flag = false;
    btn.onclick = function () {
        if (game.flag) {
            clearInterval(this.timer);
            ground.init();
            snake.init();
            createFood();
        }
        game.start();
        btn.onclick = null;
    }
}
game.start = function () {
    this.timer = setInterval(function () {
        snake.getCollideSquare();
    }, intervalTime);
}
game.over = function () {
    clearInterval(this.timer);
    alert(this.score);
    game.flag = true;
    btn.onclick = function () {
        if (game.flag) {
            clearInterval(this.timer);
            ground.init();
            snake.init();
            createFood();
        }
        game.start();
        btn.onclick = null;
    }
}
game.init();

// 创建食物
function createFood() {
    var x = null, y = null;
    var flag = true;    //判断是否跳出循环
    while (flag) {
        // 随机坐标范围排除墙壁
        x = Math.round(Math.random() * (tr - 3) + 1);
        y = Math.round(Math.random() * (td - 3) + 1);
        var ok = true;
        // 排除食物出现在蛇身上的情况
        for (var node = snake.head; node; node = node.next) {
            if (x == node.x && y == node.y) {
                ok = false;
                break;
            }
        }
        // 如果食物的坐标没有在蛇身上，则跳出循环
        if (ok) {
            flag = false;
        }
    }
    var food = SquareFactory.create('Food', x, y, 'red');
    ground.remove(food.x, food.y);
    ground.append(food);
}