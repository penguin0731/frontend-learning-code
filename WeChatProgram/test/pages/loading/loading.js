// pages/loading/loading.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: true
  },

  /**
   * 展示Toast
   */
  showToast() {
    wx.showToast({
      title: 'loading',
      icon: 'loading',
      duration: 5000,
      mask: true,
      success(res) {},
      fail(res) {},
      complete(res) {}
    });
    setTimeout(this.closeToast, 2000);
  },

  /**
   * 关闭Toast
   */
  closeToast() {
    // 关闭loading
    wx.hideToast();
  },

  showLoading() {
    wx.showLoading({
      title: '加载中...',
    });
    setTimeout(this.closeLoading, 2000);
  },

  closeLoading() {
    wx.hideLoading();
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