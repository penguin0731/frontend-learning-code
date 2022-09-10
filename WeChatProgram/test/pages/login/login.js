// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  login() {
    wx.login({
      success(res) {
        console.log(res);
        // 向后台发送请求
        wx.request({
          url: 'www.xxx.com', //公司后台服务器接口
          data: {
            code: res.code
          },
          success(res) {
            let openid = res.openid;
            let session_key = res.session;
            // 存储到stroage
            wx.setStorage({
              key: 'wxUserInfo',
              data: {
                openid,
                session_key
              },
            })
          },
          fail(err) {
            console.log('fail', err);
          },
          complete(res) {
            console.log('complete', res);
          }
        })
      }
    })
  },

  /**
   * 登录
   */
  wxlogin() {
    this.login()
  },

  /**
   * 获取公司信息
   */
  getCompanyInfo() {
    // 从缓存获取用户登录状态
    wx.getStorage({
      key: 'wxUserInfo',
      success: function(res) {
        let userOpenid = res.openid;
        let userSession_key = res.session_key;

        // 验证登录状态是否过期
        wx.checkSession({
          success(res) {
            this.send();
          },
          fail() {// 过期了
            // 重新登录
            this.login();
          }
        });
      },
    })
  },

  /**
   * 向服务器发送请求
   */
  send() {
    wx.request({
      url: 'http://www.xxx.com/companyInfo',
      data: {
        openid: userOpenid,
        session_key: userSession_key
      },
      success(res) {
        // 业务处理服务器数据
      }
    })
  },

  /**
   * 获取当前账户信息
   */
  getAppId() {
    const accountInfo = wx.getAccountInfoSync();
    console.log(accountInfo);
  },

  /**
   * 获取用户信息
   */
  handleGetUserInfo(e) {
    console.log(e.detail.userInfo)
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