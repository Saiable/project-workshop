// pages/personal.js
import request from '../../utils/request'

let startY = 0,
  moveY = 0,
  moveDistance = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(0)',
    coverTransition: '',
    userInfo: {}, // 用户个人信息
    recentPlayList: [], // 用户播放记录
  },

  /**
   * 生命周期函数--监听页面加载，只执行一次
   */
  onLoad(options) {
    try {
      let localUserInfo = wx.getStorageSync('userinfo')
      // console.log(localUserInfo)
      if(localUserInfo) {
        // 更新userInfo状态
        this.setData({
          userInfo: JSON.parse(localUserInfo)
        })
      }

      // 获取用户播放记录
      this.getUserRecentPlayList(this.data.userInfo.userId)
    } catch(err) {
      console.log(err)
    }
    
  },
  async getUserRecentPlayList(userId) {
    let recentPlayListData = await request('/user/record',{uid: userId, type: 0})
    // console.log(recentPlayListData)
    let index = 0
    // 构造数组每一项，添加id
    let recentPlayList= recentPlayListData.allData.splice(0, 10).map(item => {
      item.id = index++
      return item
    })
    this.setData({
      recentPlayList
    })
  },
  handleTouchStart(event) {
    // console.log('handleTouchStart')
    console.log(event)
    this.setData({
      coverTransition: ''
    })
    // 获取手指起始坐标
    startY = event.touches[0].clientY


  },
  handleTouchMove(event) {
    // console.log('handleTouchMove')
    moveY = event.touches[0].clientY
    moveDistance = moveY - startY
    // 动态更新coverTransform的状态值
    if(moveDistance <= 0) {
      return
    }
    if(moveDistance >= 80) {
      moveDistance = 80
    }
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`
    })
  },
  handleTouchEnd() {
    // console.log('handleTouchEnd')
    this.setData({
      coverTransform: 'translateY(0rpx)',
      coverTransition: 'transform 0.5s linear'
    })
  },
  // 跳转到登录页面
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

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