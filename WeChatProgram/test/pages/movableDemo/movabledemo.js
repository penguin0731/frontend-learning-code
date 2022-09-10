// pages/movableDemo/movabledemo.js
Page({
  angle: function (start, end) {
    let _x = end.x - start.x,
        _y = end.y - start.y;
    // 返回角度 Math.atan()返回数字反正切值
    return 360 * Math.atan(_y / _x) / (2 * Math.PI);
  },
  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    startX: 0,
    startY: 0
  },

  /**
   * 手指触摸动作开始，记录x坐标
   */
  touchstart(e) {
    this.data.items.forEach(function(item) {
      if(item.isTouchMove) {
        item.isTouchMove = false;
      }
    });
    this.setData({
      items: this.data.items,
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY 
    })
  },

  /**
   * 滑动事件处理
   */
  touchmove(e) {
    let self = this,
    index = e.currentTarget.dataset.index,  //当前索引
    startX = self.data.startX,  //开始x坐标
    startY = self.data.startY,  //开始y坐标
    touchX = e.changedTouches[0].clientX, //滑动变化坐标x
    touchY = e.changedTouches[0].clientY, //滑动变化坐标y
    // 获取滑动角度
    angle = self.angle({x: startX, y: startY}, {x: touchX, y: touchY});
    self.data.items.forEach(function(item, i) {
      item.isTouchMove = false;
      // 滑动角度大于30度，则不操作
      if(Math.abs(angle) > 30) return;
      if(i == index) {
        // 判断是否是右滑
        startX < touchX ? item.isTouchMove = false : item.isTouchMove = true;
      }
    });
    self.setData({
      items: self.data.items
    })
  },

  /**
   * 删除条目
   */
  del(e) {
    let index = e.currentTarget.dataset.index;
    this.data.items.forEach(function(item, i, self) {
      if(index == i) {
        self.splice(i, 1);
      }
    });
    this.setData({
      items: this.data.items
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    for(let i = 0; i < 10; i++) {
      this.data.items.push({
        content: i + '向左滑动删除,向左滑动删除,向左滑动删除,向左滑动删除,向左滑动删除,向左滑动删除',
        isTouchMove: false
      });
    }
    this.setData({
      items: this.data.items
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

