// pages/recordDemo/recordDemo.js
const recorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext();
Page({
  timer: null,
  /**
   * 页面的初始数据
   */
  data: {
    isSpeaking: true,
    voices: [],
    j: 1, //帧动画的初始图片
  },

  /**
   * 按下按钮
   */
  touchdown() {
    // 录音开始
    console.log('手指按下');
    const options = {
      duration: 10000, //指定录音的时长，单位ms
      sampleRate: 16000, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 96000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      frameSize: 50 //指定帧大小，单位kb
    }
    // 麦克风的帧动画
    speaking.call(this);
    this.setData({
      isSpeaking: true
    });
    
    // 录音开始
    recorderManager.start(options);

  },

  /**
   * 放开按钮
   */
  touchup() {
    // 录音停止
    console.log('手指抬起');
    // 关闭麦克风
    this.setData({
      isSpeaking: false
    });
    clearInterval(this.timer);
    recorderManager.stop();
    recorderManager.onStop(res => {
      let _this = this;
      // 临时路径
      let tempFilePath = res.tempFilePath;
      console.log('tempFilePath:' + tempFilePath);
      // 持久保存
      wx.saveFile({
        tempFilePath,
        success(res) {
          // 持久路径
          // 本地文件存储大小限制在100M
          let saveFilePath = res.savedFilePath;
          console.log('saveFilePath:' + saveFilePath);
        }
      });
      // 获取录音列表
      wx.getSavedFileList({
        success(res) {
          let voices = [];
          console.log(res);
          for (let i = 0; i < res.fileList.length; i++) {
            // 格式化时间
            let createTime = formatDate(res.fileList[i].createTime);
            // 将音频大小B转为KB
            let size = (res.fileList[i].size / 1024).toFixed(2);
            // 建立对象，存储于voices
            let voice = {
              filePath: res.fileList[i].filePath,
              createTime,
              size
            }
            voices.push(voice);
          }
          _this.setData({
            voices
          });
        },
        fail(res) {
          wx.showToast({
            title: '提示',
            content: '录音的姿势不对',
            showCancel: false,
            success(res) {
              if (res.comfirm) {
                console.log("你已经知道")
                return;
              }
            }
          })
        }
      });
    })
  },

  /**
   * 选择播放
   */
  gotoPlay(e) {
    let filePath = e.currentTarget.dataset.key;
    console.log(filePath);
    // 点击开始播放
    innerAudioContext.autoplay = true;
    innerAudioContext.src = filePath;
    innerAudioContext.onPlay(res => {
      console.log(res);
      wx.showToast({
        title: '开始播放',
        icon: 'success',
        duration: 1000
      });
    });
    innerAudioContext.onError(res => {
      console.log(res);
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

function formatDate(time) {
  let myDate = new Date(time * 1000);
  let year = myDate.getFullYear();
  let month = myDate.getMonth() + 1 > 9 ? myDate.getMonth() + 1 : '0' + (myDate.getMonth() + 1);
  let date = myDate.getDate() > 9 ? myDate.getDate() : '0' + myDate.getDate();
  let H = myDate.getHours() > 9 ? myDate.getHours() : '0' + myDate.getHours();
  let M = myDate.getMinutes() > 9 ? myDate.getMinutes() : '0' + myDate.getMinutes();
  let S = myDate.getSeconds() > 9 ? myDate.getSeconds() : '0' + myDate.getSeconds();
  return `${year}-${month}-${date} ${H}:${M}:${S}`;
}

// 麦克风帧动画
function speaking() {
  let _this = this;
  // 话筒帧动画
  let i = 1;
  this.timer = setInterval(() => {
    i++;
    i = i % 5;
    _this.setData({
      j: i
    })
  }, 200);
}