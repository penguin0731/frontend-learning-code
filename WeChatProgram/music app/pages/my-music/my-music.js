const _items = ['播放列表', '歌曲', '专辑', '歌手'];
const _songsList = [{
  dataUrl: 'http://mpge.5nd.com/2018/2018-5-10/85111/1.mp3',
  name: '哑巴',
  singer: '薛之谦',
  coverImgUrl: 'http://img.5nd.com/86/photo/2018album/20185/85111.jpg'
}, {
  dataUrl: 'http://stream.qqmusic.tc.qq.com/138549169.mp3',
  name: '你还要我怎样',
  singer: '薛之谦',
  coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R90x90M000000aWdOx24i3dG.jpg'
}, {
  dataUrl: 'http://stream.qqmusic.tc.qq.com/137903929.mp3',
  name: '微微一笑很倾城',
  singer: '杨洋',
  coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R90x90M000003RxTdZ0sJLwo.jpg'
}, {
  dataUrl: 'http://stream.qqmusic.tc.qq.com/132636799.mp3',
  name: '演员',
  singer: '薛之谦',
  coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R90x90M000003y8dsH2wBHlo.jpg'
}];
const _albumList = [{
  name: '寂寞不痛',
  singer: 'A-Lin',
  image: ''
},]


Page({

  /**
   * 页面的初始数据
   */
  data: {
    songsList: _songsList,
    musicGroupName: _items[0],
    actionSheetHidden: true,
    actionSheetItems: _items,
    listTemplateName: 'music-play-list',
    templateData: '',
    playing: false,
    playBar: {
      coverImgUrl: '',
      name: ''
    }
  },

  /**
   * 点击播放事件
   */
  play(e) {
    let that = this;
    let num = e.currentTarget.dataset.num;
    let res = this.data.songsList[num];
    // 修改
    this.setData({
      // 修改播放轴
      playBar: res,
      playingSonsNum: num,
      playing: true
    });
    wx.playBackgroundAudio({
      dataUrl: res.dataUrl,
      name: res.name,
      singer: res.singer,
      coverImgUrl: res.coverImgUrl,
      complete(res) {
        that.setData({
          playing: true
        })
      }
    })
  },

  /**
   * 列表选择
   */
  actionSheetTap() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  /**
   * action-sheet的显示隐藏
   */
  actionSheetChange() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  /**
   * item的单机
   */
  bindItemTap(e) {
    // 单击链接的操作
    // 获知现在点击的菜单
    let _listTemplateName = '';
    let _templateData = '';
    let sheetItem = e.currentTarget.dataset.sheetItem;

    // 判断打开模板页面
    switch(sheetItem) {
      case '播放列表': 
        _listTemplateName = 'music-play-list';
        break;
      case '歌曲':
        _listTemplateName = 'songs-list';
        _templateData = _songsList;
        break; 
      case '专辑':
        _listTemplateName = 'album-list';
        _templateData = _alnumList;
        break; 
      case '歌手':
        _listTemplateName = 'singer-list';
        _templateData = _singerList
        break;
    }

    // 显示隐藏
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
      listTemplateName: _listTemplateName,
      templateData: _templateData
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