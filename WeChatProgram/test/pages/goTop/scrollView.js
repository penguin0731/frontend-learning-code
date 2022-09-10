// pages/goTop/scrollView.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cangotTop: false,
    topNum: 0
  },

  /**
   * 回到顶部
   */
  goTop() {
    this.setData({
      topNum: 0
    })
  },

  /**
   * 滚动
   */
  scroll(e) {
    console.log(e);
    if(e.detail.scrollTop > 100) {
      this.setData({
        cangotTop: true
      })
    }else {
      this.setData({
        cangotTop: false
      })
    }
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