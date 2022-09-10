// pages/downloadFile/downloadFile.js
Page({
  filePath: 'https://cn.bing.com/sa/simg/SharedSpriteDesktop_2x_090619.png',
  /**
   * 页面的初始数据
   */
  data: {
    imagePath: '',
    percent: ''
  },

  /**
   * 下载操作
   */
  downloadOpt() {
    let that = this;
    const downloadTask = wx.downloadFile({
      url: this.filePath,
      success(res) {
        if(res.statusCode == 200) {
          console.log('[success]', res);
          console.log(res.tempFilePath);
          that.setData({
            imagePath: res.tempFilePath
          })
        }
      },
      fail(res) {
        console.log('[fail]', res);
      },
      complete(res) {
        console.log('[complete]', res);
      }
    });
    // downloadTask.abort(); //终止请求
    downloadTask.onProgressUpdate((res) => {
      console.log('下载进度', res.progress);
      console.log('已经下载的长度', res.totalBytesWritten);
      console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite);
      this.setData({
        percent: res.totalBytesWritten / res.totalBytesExpectedToWrite * 100
      })
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