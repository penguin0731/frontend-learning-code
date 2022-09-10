// pages/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: 'Let\'s chat',
    headLeft: 'https://www.lgstatic.com/thumbnail_300x300/i/image2/M01/37/BC/CgoB5lzmTciATaZZAAHQFegVPBE112.png',
    headRight: '',
    says: [
      {
        'robot': '你好',
        'isay': '嘻嘻'
      }
    ]
  },

  /**
   * 发送事件处理函数
   */
  converStation(e) {
    let that = this,
        obj = {},
        isay = e.detail.value.says,
        says = this.data.says,
        length = says.length,
        key = '354ed63dd1804daaa00f478182175a9c';
    wx.request({
      url: 'http://www.tuling123.com/openapi/api?key=' + key + '&info=' + isay,
      success(res) {
        console.log(res);
        let tuling = res.data.text;
        obj.robot = tuling;
        obj.isay = isay;
        says[length] = obj;
        that.setData({
          says: says
        })
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
    let that = this;
    wx.getUserInfo({
      success(e) {
        // console.log(e);
        that.setData({
          headRight: e.userInfo.avatarUrl
        })
      }
    })
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