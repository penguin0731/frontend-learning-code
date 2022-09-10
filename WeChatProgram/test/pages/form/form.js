// pages/form/form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '',
    date: '',
    time: '',
    index: 0,
    items: [{
        name: 'tom',
        value: 'CHA',
        checked: true
      },
      {
        name: 'marry',
        value: 'CHA',
        checked: true
      },
      {
        name: 'jack',
        value: 'USA',
        checked: false
      },
      {
        name: 'alice',
        value: 'UK',
        checked: false
      }
    ],
    radioItems: [{
        name: 'tom',
        value: '中国'
      },
      {
        name: 'jack',
        value: '饿国',
        checked: true
      },
      {
        name: 'lili',
        value: '韩国'
      }
    ],
    multiIndex: [0,0,0],
    multiArr: [
      ['中国','北京'],
      ['美国', '华盛顿'],
      ['韩国', '首尔', '日本', '东京'],
    ],
    country: ['中国','美国','日本','英国']
  },

  switchChange(e) {
    console.log(e.detail.value);
  },
  
  /**
   * 滑动选择器
   */
  sliderChange(e) {
    console.log(e.detail.value);
  },

  /**
   * 省市区选择器
   */
  bindRegionChange(e) {
    console.log(e.detail.value);
    this.setData({
      city: e.detail.value
    })
  },

  /**
   * 日期选择器
   */
  bindDatehange(e) {
    console.log(e.detail.value);
    this.setData({
      date: e.detail.value
    })
  },

  /**
   * 时间选择器
   */
  bindTimeChange(e) {
    console.log(e.detail.value);
    this.setData({
      time: e.detail.value
    })
  },

  /**
   * 多项选择器改变列的选项时触发
   */
  bindMultiPickerColumnChange(e) {
    console.log('修改的列为' + e.detail.column + ',修改的值为' + e.detail.value);
  },

  /**
   * 多项选择器确定选项时触发
   */
  bindMultiPickerChange(e) {
    console.log(e);
  },

  /**
   * 滚动选择器确定选项时触发
   */
  bindPickerChange(e) {
    console.log(e.detail.value);
    this.setData({
      index: e.detail.value
    })
  },

  radioChange(e) {
    console.log(e);
    var checked = e.detail.value;
    var changed = {}
    for(var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true;
      }else{
        changed['radioItems[' + i + '].checked'] = false;
      }
    }
    this.setData(changed);
    console.log(changed);
  },

  /**
   * 提交事件
   */
  formSubmit(e) {
    console.log(e.detail.value);
    // 获取数据
    // 处理数据
    // 提交数据
  },

  /**
   * 重置事件
   */
  formReset() {

  },

  checkbind(e) {
    console.log(e);
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