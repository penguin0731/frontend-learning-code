// pages/person/person.js
Page({
  personName: '',
  password: '',
  gender: '',
  hobby: '',
  birth: '',
  studyYears: '',
  isMember: '',
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 获取姓名
   */
  inputValue(e) {
    this.personName = e.detail.value;
  },

  /**
   * 获取密码
   */
  passwordValue(e) {
    this.password = e.detail.value;
  },

  /**
   * 获取性别
   */
  genderRadio(e) {
    this.gender = e.detail.value == 0 ? 'female' : 'male';
  },

  /**
   * 获取爱好
   */
  hobbyCheckbox(e) {
    this.hobby = e.detail.value.join() ? e.detail.value.join() : '无爱好';
  },

  /**
   * 获取生日
   */
  bitrthPicker(e) {
    var arr = e.detail.value.split('-');
    this.birth = arr[0] + '年' + arr[1] + '月' + arr[2] + '日';
  },

  /**
   * 获取学习时间
   */
  studyYearsSlider(e) {
    this.studyYears = e.detail.value;
  },

  /**
   * 是否是会员
   */
  isMemberSwitch(e) {
    this.isMember = e.detail.value;
  },

  /**
   * 提交
   */
  regFormSubmit() {
    let memberData = {
      personName: this.personName,
      password: this.password,
      gender: this.gender,
      hobby: this.hobby,
      birth: this.birth,
      studyYears: this.studyYears,
      isMember: this.isMember
    }
    //向服务器提交（含云端）
    console.log(memberData);
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