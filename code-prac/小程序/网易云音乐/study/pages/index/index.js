// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '初始化数据',
    userInfo: {}, //初始化用户数据
  },
  /**
   * 自定义事件绑定
   */
  handleTap() {
    console.log('hello world')
    wx.navigateTo({
      url: '/pages/logs/index',
    })
  },
  handleGetUserInfo(res) {
    console.log(res)
    if(res.detail.userInfo) {
      this.setData({
        userInfo: res.detail.userInfo
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('我加载啦')
    wx.getUserInfo({
      success: (res) => { // 要用箭头函数，回调函数被调用时，是wx页面实例调的
        console.log('获取授权成功', res)
        this.setData({
          userInfo: res.userInfo
        })
      },
      fail: (err) => {
        console.log('获取授权失败', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log('我准备啦')

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('我显示啦')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    console.log('我隐藏啦')

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    console.log('我卸载啦')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})