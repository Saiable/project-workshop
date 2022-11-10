// pages/recommendSong.js
import request from '../../utils/request.js'
import PubSub from 'pubsub-js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '', // 天
    month: '', //月,
    recommendList: [], // 推荐列表数据
    index: 0, //点击音乐的下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // 判断用户是否登录
    let userInfo = wx.getStorageSync('userinfo')
    if(!userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        success: function() {
          // 成功的回调中，跳转至登录界面
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      })
    }


    // 更新时间
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    })

    // 获取每日推荐歌曲数据
    this.getRecommendList()

    // 订阅消息
    PubSub.subscribe('switchType', (msg, type) => {
      let {recommendList, index} = this.data
      // console.log(msg, type)
      if(type === 'prev') { // 上一首
        (index === 0) && (index = recommendList.length)
        index -= 1
      } else { // 下一首
        (index === recommendList.length - 1) && (index = -1)
        index += 1
      }

      this.setData({
        index
      })
      let musicId = recommendList[index].id
      // 将id回传给detail页面
      PubSub.publish('musicId', musicId)
    })
  },
  // 获取用户每日推荐数据
  async getRecommendList() {
    let recommendListData = await request('/recommend/songs')
    // console.log(recommendListData)
    this.setData({
      recommendList: recommendListData.data.dailySongs
    })
  },
  // 跳转至歌曲详细信息页面
  toSongDetail(event) {
    let {song, index} = event.currentTarget.dataset
    this.setData({
      index
    })
    // 路由跳转传参，支持query参数
    wx.navigateTo({
      url: `/pages/songDetail/songDetail?musicId=${song.id}`
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