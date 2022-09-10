// pages/compass/compass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    direction: '--',
    angle: '--',
    rotate: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 开始罗盘的操作
    // 微信开启罗盘数值操作
    wx.onCompassChange((res)=>{
      let angle = res.direction.toFixed(2); //保留两位小数
      let radio = res.direction.toFixed(0);
      console.log(angle, radio);
      this.setData({
        direction: this.check(radio),
        angle,
        rotate: 360-radio
      });
    })
    // 判断手机是否有陀螺仪
    setTimeout(() => {
      if(this.data.direction == '--' && this.data.angle == '--') {
        wx.showToast({
          title: '没有电子罗盘',
          icon: 'loading',
          duration: 3000,
          mask: true
        })
      }
    }, 3000);
  },

  /**
   * 判断方向
   */
  check(radio) {
    if (15 < radio && radio <= 75) {
      return '东北';
    }else if(75 < radio && radio < 105) {
      return '正东';
    }else if(105 <= radio && radio <= 165) {
      return '东南';
    }else if(165 < radio && radio < 195) {
      return '正南';
    }else if(195 <= radio && radio <= 255) {
      return '西南';
    }else if(255 < radio && radio < 285) {
      return '正西';
    }else if(285 <= radio && radio <= 345) {
      return '西北';
    }else {
      return '正北'
    }
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
    return {
      title: '我现在在面向' + this.data.direction + '方向上，点我使用指南针，为您指引方向',
      path: '/pages/compass/compass'
    }
  }
})