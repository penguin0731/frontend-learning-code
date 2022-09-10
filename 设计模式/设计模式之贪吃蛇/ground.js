var ground = new Ground(positionX, positionY, td * squareWidth, tr * squareWidth);
// console.log(ground);
ground.init = function () {
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.backgroundColor = 'orange';

    document.body.appendChild(this.viewContent);
    // 存放所有格子的实例对象
    this.squareTable = [];
    for (var y = 0; y < tr; y++) {   //外层循环的是行数
        this.squareTable[y] = new Array(tr);
        for (var x = 0; x < td; x++) {   //里层循环的是列数
            if (y == 0 || y == tr - 1 || x == 0 || x == td - 1) {   //满足这个条件生产围墙
                var newSquare = SquareFactory.create('Wall', x, y, 'black'); 
            } else {    //否则生产地板
                var newSquare = SquareFactory.create('Floor', x, y, 'grey'); 
            }
            this.viewContent.appendChild(newSquare.viewContent);
            this.squareTable[y][x] = newSquare;
        }
    }
    // console.log(this.squareTable);
}

// 移除方块
ground.remove = function (x, y) {
    var curSquare = this.squareTable[y][x];
    this.viewContent.removeChild(curSquare.viewContent);
    this.squareTable[y][x] = null;
}
// 添加方块
ground.append = function (square) {
    this.viewContent.appendChild(square.viewContent);
    this.squareTable[square.y][square.x] = square;
}