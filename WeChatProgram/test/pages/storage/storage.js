// pages/storage/storage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 设置缓存
   * 以kv结构存储，大小上限为10M
   * 数据缓存分为同步和异步双接口调用
   */
  setStorage() {
    wx.setStorage({
      key: 'name',
      data: 'jack',
      success() {
        console.log('the storage is saved');
      }
    })
  },

  /**
   * 移除指定缓存
   */
  removeStorage() {
    wx.removeStorage({
      key: 'name',
      success: function() {
        console.log('the storage is removed');
      },
    })
  },

  /**
   * 获取指定缓存
   */
  getStorage() {
    wx.getStorage({
      key: 'name',
      success: function (res) {
        console.log(res);
      },
    })
  },

  /**
   * 获取所有缓存
   */
  getStorageInfo() {
    wx.getStorageInfo({
      success: function(res) {
        console.log(res);
      }
    });
  },

  /**
   * 清楚所有缓存
   */
  clearStorage() {
    // wx.clearStorageSync() //同步清除
    wx.clearStorage();
    // wx.clearStorage({
    //   success() {
    //     console.log('all storages is cleared')
    //   }
    // })
  }
})