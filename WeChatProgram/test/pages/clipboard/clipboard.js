// pages/clipboard/clipboard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: '床前明月光，疑是地上霜，举头望明月，低头思故乡'
  },

  /**
   * 一键复制
   */
  copy() {
    let that = this;
    wx.setClipboardData({
      data: this.data.detail
    })
  },

  /**
   * 显示
   */
  show() {
    wx.getClipboardData({
      success(res) {
        console.log(res);
      }
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 监控内存的警告
    wx.onMemoryWarning(() => {
      console.log('内存警告');
      wx.showToast({
        title: '内存不足警告',
      })
    })
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