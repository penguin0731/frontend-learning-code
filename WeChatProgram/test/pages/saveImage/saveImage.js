// pages/saveImage/saveImage.js
Page({
  chooseImgs: [],
  /**
   * 页面的初始数据
   */
  data: {
    updateImage: [],
    downloadFile: ''
  },

  /**
   * 获取图片
   */
  chooseImage() {
    let that = this;
    wx.chooseImage({
      count: 2, //选几张图片
      success: function(res) {
        that.chooseImgs = res.tempFilePaths;
        wx.showToast({
          title: '图片获取成功',
          icon: 'success'
        });
        // 赋值给data
        that.setData({
          updateImage: res.tempFilePaths
        })
      },
    })
  },

  /**
   * 获取图片信息
   */
  getImageInfo() {
    wx.getImageInfo({
      src: this.chooseImgs[0],
      success(res) {
        console.log(res);
      }
    })
  },

  /**
   * 预览图片
   */
  previewImage() {
    wx.previewImage({
      urls: this.chooseImgs,
      current: '0'
    })
  },

  /**
   * 下载图片
   */
  download() {
    let that = this;
    wx.downloadFile({
      url: "",
      success(res) {
        that.setData({
          downloadFile: res.downloadFile
        })
      }
    })
  },
  
  /**
   * 保存到本机相册
   */
  saveImg() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.downloadFile,
      success(res) {
        console.log('保存成功')
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