const app = getApp();
const scanType = {
  'WX_CODE': '微信小程序',
  'QR_CODE': '二维码',
  'EAN_8': '条形码（EAN_8）',
  'EAN_13': '条形码（EAN_13）',
  'UPC_A': '条形码（UPC_A）',
  'UPC_E': '条形码（UPC_E）',
  'CODE_25': '条形码（CODE_25）',
  'CODE_25': '条形码（CODE_39）',
  'CODE_128': '条形码（CODE_128）',
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    scanResult: {
      isShow: true,
      type: '',
      text: '',
      msg: ''
    }
  },

  /**
   * 复制
   */
  onCopy() {
    // 发送内容到剪贴板
    wx.setClipboardData({
      data: this.data.scanResult.text
    })
  },

  /**
   * 扫一扫
   */
  onScan() {
    wx.scanCode({
      success: (res) => {
        console.log(res);
        let msg = '';
        if(res.scanType === 'WX_CODE' && res.result === '') {
          msg = '失败了';
        }
        this.setData({
          scanResult: {
            isShow: true,
            type: scanType[res.scanType],
            text: res.result,
            msg
          }
        });

        // 存入storage
        if(this.data.scanResult.text !== '') {
          // 取缓存
          wx.getStorage({
            key: 'scanLogs',
            complete: (res) => {
              console.log(res);
              let scanLogs = res.data || [];
              this.data.scanResult.date = Date.now();
              scanLogs.unshift(this.data.scanResult);
              wx.setStorageSync('scanLogs', scanLogs);
            },
          })
        }
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