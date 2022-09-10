// 1.创建管理者
function SquareFactory() {

}

// 2.包装创建方块的方法
SquareFactory.prototype.init = function (square, color, action) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.left = square.x * squareWidth + 'px';
    square.viewContent.style.top = square.y * squareWidth + 'px';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.backgroundColor = color;
    // 给每一个小方块定义一个函数,返回这个方块的标签
    square.collide = function () {
        return action;
    }
}

// 创建地板的方法
SquareFactory.prototype.Floor = function (x, y, color) {
    // 创建地板实例对象
    var floor = new Floor(x, y, squareWidth, squareWidth);
    // 初始化
    this.init(floor, color, squareTag.move);
    return floor;
}

// 创建围墙的方法
SquareFactory.prototype.Wall = function (x, y, color) {
    // 创建地板实例对象
    var wall = new Wall(x, y, squareWidth, squareWidth);
    // 初始化
    this.init(wall, color, squareTag.die);
    return wall;
}

// 创建蛇头的方法
SquareFactory.prototype.SnakeHead = function (x, y, color) {
    // 创建地板实例对象
    var snakeHead = new SnakeHead(x, y, squareWidth, squareWidth);
    // 初始化
    this.init(snakeHead, color, squareTag.die);
    snakeHead.upDate(x, y);
    return snakeHead;
}

// 创建蛇身的方法
SquareFactory.prototype.SnakeBody = function (x, y, color) {
    // 创建地板实例对象
    var snakeBody = new SnakeBody(x, y, squareWidth, squareWidth);
    // 初始化
    this.init(snakeBody, color, squareTag.die);
    return snakeBody;
}

// 创建食物的方法
SquareFactory.prototype.Food = function (x, y, color) {
    // 创建地板实例对象
    var food = new Food(x, y, squareWidth, squareWidth);
    // 初始化
    this.init(food, color, squareTag.eat);
    food.upDate(x, y);
    return food;
}

// 3.提供对外的接口
SquareFactory.create = function (type, x, y, color) {
    // 如果在原型链上找不到该方法则抛出错误
    if(typeof SquareFactory.prototype[type] == 'undefined') {
        throw new Error('no this type');
    }
    // 子工厂继承父工厂
    SquareFactory.prototype[type].prototype = new SquareFactory();
    return new SquareFactory.prototype[type](x, y, color);
}