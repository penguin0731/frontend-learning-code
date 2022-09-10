const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scanLogs: []
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取缓存中的列表
    wx.getStorage({
      key: 'scanLogs',
      success: (res) => {
        console.log(res);
        this.setData({
          scanLogs: (res.data || []).map(n => {
            n.date = util.formatTime(new Date(n.date))
            return n;
          })
        })
      },
    })
  },
})