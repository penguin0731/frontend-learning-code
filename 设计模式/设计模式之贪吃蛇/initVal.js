// 这个文件存放一些全局性的东西
// 常用的变量
// 方块的构造函数
// 根据方块的构造函数创建各个元素对象，如蛇头蛇身、食物
// 存储蛇头与其他方块碰撞的处理方式

// 游戏区域的大小
var tr = 30;    //列数，一行30列
var td = 30;    //行数，一列30行

// 方块的大小
var squareWidth = 20;

// 游戏区域一开始的坐标
var positionX = 200;
var positionY = 50;

// 蛇的移动时间间隔
var intervalTime = 300;

// 定义方块的构造函数(x轴的索引,y轴的索引,宽,高,dom)，每一个元素都由它生产
function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
}
// 由于单例对象在第二次创建的时候，它的信息也不会更新。但是要移动就必需要更新。这个方法就是用来更新单例对象的信息
Square.prototype.upDate = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * squareWidth + 'px';
    this.viewContent.style.top = y * squareWidth + 'px';
}

// 创建相关的元素对象，这些对象都是通过Square生成的实例对象
var Ground = tool.single(Square);   //整个游戏场景,包含所有元素,是个单例对象
var Floor = tool.extends(Square);   //地板对象
var Wall = tool.extends(Square);    //围墙
var SnakeHead = tool.single(Square);   //蛇头
var SnakeBody = tool.extends(Square);   //蛇身
var Snake = tool.single();              //蛇(抽象)
var Food = tool.single(Square);         //食物

var Game = tool.single();   //游戏对象

// 方块的类型
var squareTag = {
    move: 'move',
    eat: 'eat',
    die: 'die'
}