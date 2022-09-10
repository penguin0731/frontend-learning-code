var snake = new Snake();
snake.head = null;  //蛇头
snake.tail = null;  //蛇尾
// 蛇走的方向
var directionNum = {
    left: {
        x: -1,
        y: 0
    },
    right: {
        x: 1,
        y: 0
    },
    top: {
        x: 0,
        y: -1
    },
    bottom: {
        x: 0,
        y: 1
    }
}

snake.init = function () {
    var snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'deeppink');
    var snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'green');
    var snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'green');

    this.head = snakeHead;  //蛇头
    this.tail = snakeBody2;  //蛇尾

    // 移除蛇头所在坐标的地板
    ground.remove(snakeHead.x, snakeHead.y);
    // 将蛇头添加到被移除地板的位置
    ground.append(snakeHead);

    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);

    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);

    // 形成链表
    snakeHead.next = snakeBody1;
    snakeHead.last = null;

    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;

    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    // 给蛇添加一个移动的方向，默认为right
    this.direction = directionNum.right;
}

// 获取蛇头走到(碰撞)的下一个格子,并进行处理
snake.getCollideSquare = function () {
    var square = ground.squareTable[snake.head.y + this.direction.y][snake.head.x + this.direction.x];
    // console.log(square.collide());
    snake.collideMethod[square.collide()](square);
}
// 蛇与格子碰撞的处理
snake.collideMethod = {
    move: function (square, boolean) {
        // console.log('move');
        // 创建新蛇身
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'green');
        newBody.next = snake.head.next;
        newBody.last = null;
        newBody.next.last = newBody;
        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);
        // 创建新蛇头
        var newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'deeppink');
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;
        ground.remove(newHead.x, newHead.y);
        ground.append(newHead);
        snake.head = newHead;
        // 判断蛇的下一次碰撞是否是食物，若是则不删除最后一节身体，若不是，则删除最后一节身体并添加地板
        if (!boolean) {
            // 创建新地板
            var newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'grey');
            ground.remove(newFloor.x, newFloor.y);
            ground.append(newFloor);
            snake.tail=snake.tail.last;
        }

    },
    eat: function (square) {
        // console.log('eat');
        this.move(square, true);
        game.score++;
        createFood();
    },
    die: function () {
        // console.log('die');
        game.over();
    }
}

