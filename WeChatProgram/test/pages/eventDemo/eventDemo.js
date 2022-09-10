// pages/eventDemo/eventDemo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigatorArr: ['英雄联盟', '王者荣耀', '刺激战场', '全军出击', '终结者', '皇室战争', '炉石传说', '部落冲突', '开心消消乐', '球球大作战', '守卫萝卜'],
    swiperRPXHeight: 0,
    currentTap: 0,
    classArr: ['active', '', '', '', '', '', '', '', '', '', '',]
  },

  campusActivity(e) {
    let newClassArr = [];
    let currentIndex = e.currentTarget.dataset.index;
    for (let i = 0; i < this.data.navigatorArr.length; i++) {
      currentIndex == i ? newClassArr.push('active') : newClassArr.push('');
    }
    this.setData({
      currentTap: currentIndex,
      classArr: newClassArr
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    // 获取手机的信息
    wx.getSystemInfo({
      success: function(res) {
        // 获取手机屏幕高度(px)
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        // 获取(rpx / px)比例
        let ratio = 750 / clientWidth;
        let rpxHeight = clientHeight * ratio;
        // 修改data里的数据
        self.setData({
          swiperRPXHeight: rpxHeight
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})