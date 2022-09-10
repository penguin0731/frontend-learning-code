// pages/index/index.js
Page({

  startX: 0,
  startY: 0,
  /**
   * 页面的初始数据
   */
  data: {
    pen: 2,
    color: '#0f0',
    
  },

  /**
   * 选取笔的颜色
   */
  colorSelect(e) {
    this.setData({
      color: e.currentTarget.dataset.params
    })
  },

  /**
   * 选取笔的粗细
   */
  penSelect(e) {
    this.setData({
      pen: parseInt(e.currentTarget.dataset.params)
    })
  },

  /**
   * 触摸起始事件
   */
  touchstart(e) {
    // 获取当前的坐标位置
    // console.log(e);
    this.startX = e.changedTouches[0].x;
    this.startY = e.changedTouches[0].y;

    // 创建绘图上下文对象
    this.context = wx.createContext();
    // 设置颜色
    this.context.setStrokeStyle(this.data.color);
    // 设置笔触
    this.context.setLineWidth(this.data.pen);
    // 设置笔边
    this.context.setLineCap('round');
    // 开始绘制
    this.context.beginPath();
  },

  /**
   * 触摸移动事件
   */
  touchmove(e) {
    // 获取移动后的新坐标
    var startX1 = e.changedTouches[0].x;
    var startY1 = e.changedTouches[0].y;
    // 设置画笔移动到起始点
    this.context.moveTo(this.startX, this.startY);
    // 绘制一条从起始点到(x1,y1)的直线
    this.context.lineTo(startX1, startY1);
    // 需要进行路径的描边(内存完成)
    this.context.stroke();
    // 重新设置起始点
    this.startX = startX1;
    this.startY = startY1;
    // 绘制
    wx.drawCanvas({
      canvasId: 'myCanvas',
      reserve: true,
      actions: this.context.getActions() // 获取绘图动作的数组
    })
  },


})