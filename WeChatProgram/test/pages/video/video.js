function getRandomColor() {
  let rgb = [];
  for (let i = 0; i < 3; i++) {
    let color = Math.floor(Math.random() * 256).toString(16);
    color = color.length == 1 ? color += '0' : color;
    rgb.push(color);
  }
  return '#' + rgb.join('');
}
Page({
  /**
   * 页面的初始数据
   */

  data: {
    inputValue: '',
    src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    danmulist: [{
        text: '66666',
        color: '#f40',
        time: 1
      }, {
        text: '太赞了！！',
        color: '#f00',
        time: 3
      }, {
        text: '你看我是什么颜色？',
        color: '#0f0',
        time: 2
      }, {
        text: '冲冲冲',
        color: '#00f',
        time: 3
      },

    ]
  },

  /**
   * 获取视频
   */
  bindBtnTap() {
    let self = this;
    // 微信api：拍摄视频或从手机相册里选视频
    wx.chooseVideo({
      // 视频来源：相册、相机
      sourceType: ['albun', 'camera'],
      // 拍摄视频最长时间，单位秒
      maxDuration: 60,
      // 默认拉起的是前置摄像头还是后置摄像头
      camera: ['front', 'back'],
      // 回调函数
      success(res) {
        self.setData({
          src: res.tempFilePath
        })
      }
    })
  },

  /**
   * 输入弹幕
   */
  bindInpBlur(e) {
    this.data.inputValue = e.detail.value;
  },
  /**
   * 发送弹幕
   */
  sendDanmu() {
    this.videoContext.sendDanmu({
      text: this.data.inputValue,
      color: getRandomColor()
    });
    this.setData({
      inputValue: ''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 获取video的上下文
    this.videoContext = wx.createVideoContext('danmuVideo');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})