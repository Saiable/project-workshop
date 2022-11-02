// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [], // 导航的标签数据（命名和接口保持一致）
    navId: 0, // 导航的标识,
    videoList: [], // 视频标签数据，现在视频链接数据要通过vid额外发请求获取了
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取导航标签数据
    this.getVideoGroupListData()
  },
  async getVideoGroupListData() {
    let videoGroupListData = await request('/video/group/list')
    this.setData({
      videoGroupList: videoGroupListData.data.slice(0, 14),
      navId: videoGroupListData.data[0].id
    })
 
    // 拿到navId后，获取视频列表数据
    this.getVideoList(this.data.navId)
  },
  // 点击切换导航的回调
  changeNav(event) {
    let navId = Number(event.currentTarget.id)
    this.setData({
      navId
    })
  },
  // 获取视频列表数据
  async getVideoList(navId) {
    if(!navId) return

    let videoListData = await request('/video/group', {id: navId, offset: 0}) // 还要传一个offset参数
    console.log(videoListData)
    let index = 0

    // let videoList = await Promise.all(videoListData.datas.map(async item => {
    //   item.id = index++
    //   let urlInfo = await request('/video/url', {id: item.data.vid})
    //   item.dealedUrl = urlInfo.urls[0].url
    //   return item
    // }))

    // let videoList = videoListData.datas.map(async item => {
    //   item.id = index++
    //   return item
    // })

    this.setData({
      videoList: videoListData
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