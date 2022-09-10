// pages/worker/worker.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 主线程按钮触发worker线程
   */
  touch() {
    // 创建worker线程对象
    const worker = wx.createWorker('/worker/myWorker.js');
    worker.postMessage({
      msg: 'data from 主线程'
    });
    worker.onMessage(function (res) {
      console.log('主线程的onMessage对象', res);
    });

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