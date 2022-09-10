// pages/share/share.js
Page({

  onShare() {
    this.onShareAppMessage();
  },

  /**
   * 点击右上角菜单的转发时触发
   */
  onShareAppMessage(res) {
    return {
      title: '我是分享的标题',
      path: '/pages/index/index',
      imageUrl: 'https://i0.hdslb.com/bfs/archive/563c74bf0dec75460eeffdda71fc3791913fcc5e.png@320w_184h_1c_100q.png',
      success(res) {
        console.log(res);
      }
    }
  },

  /**
   * 页面的初始数据
   */
  data: {

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