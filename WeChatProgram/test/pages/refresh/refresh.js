// pages/refresh/refresh.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: 'https://i0.hdslb.com/bfs/sycp/creative_img/202005/b17ee67f458c93b33707f6c047a96716.jpg',
    imgTitle: '肯德基'
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // loading
    // wx.showLoading({
    //   title: '正在加载...',
    // });
    setTimeout(() => {
      this.setData({
        imgUrl: 'https://i0.hdslb.com/bfs/archive/31b8d2617cb8d6b01e98425b7eba39ae9f973c20.png',
        imgTitle: 'bilibili'
      })
      // wx.hideLoading();// 关闭loading
      wx.stopPullDownRefresh();// 停止系统的加载事件
    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      imgUrl: 'https://i0.hdslb.com/bfs/archive/946e7a90d50a6650590bc6cb5db04fac0ebdc83a.jpg@880w_388h_1c_95q',
      imgTitle: '英雄联盟'
    })
  }
})