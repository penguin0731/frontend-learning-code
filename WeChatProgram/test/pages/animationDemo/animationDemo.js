// pages/animationDemo/animationDemo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: '北京',
    end: '深圳',
    lAnimate: '',
    rAnimate: ''
  },

  /**
   * 点击切换操作
   */
  trigger() {
    let that = this;
    let option = {
      duration: 100, //动画执行时间
      timingFunction: 'ease-in', //动画执行效果
    }
    let lanimation = wx.createAnimation(option); //创建动画
    let ranimation = wx.createAnimation(option);
    // 动画开始-起点动画
    lanimation.translateX(100).opacity(0.1).step();
    // 动画结束-终点动画
    ranimation.translateX(-100).opacity(0.1).step();
    // 设置
    that.setData({
      lAnimate: lanimation.export(),
      rAnimate: ranimation.export()
    });
    // 第二段开始，需要进行等待100ms
    setTimeout(() => {
      // 起点
      lanimation.translateX(0).opacity(1).step();
      // 终点
      ranimation.translateX(0).opacity(1).step();
      let temp = that.data.start;
      that.setData({
        lAnimate: lanimation.export(), //开始执行动画
        rAnimate: ranimation.export(), //开始执行动画
        end: temp,
        start: that.data.end
      })
    }, 300)
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