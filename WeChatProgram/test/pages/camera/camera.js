// pages/camera/camera.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: ''
  },

  /**
   * 拍照
   */
  takePhoto() {
    let that = this;
    // 获取相机对象
    const ctx = wx.createCameraContext();
    // 通过接口调用拍照方法
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        // 设定到缓存中
        wx.setStorage({
          key: 'photoPeople',
          data: res.tempImagePath,
        });
        // 跳转新页面
        wx.redirectTo({
          url: '/pages/camera/showPhoto',
        });
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