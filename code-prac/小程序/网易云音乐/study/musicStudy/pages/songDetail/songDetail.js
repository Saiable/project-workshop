// pages/songDetail/songDetail.js
import request from '../../utils/request.js'
import PubSub from 'pubsub-js'
import moment from 'moment'

// 获取全局实例
const appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false, // 是否播放
    song: {}, // 歌曲详情对象
    musicId: '', // 音乐id
    musicLink: '', // 音乐链接
    currentTime: '00:00', // 实时时间
    durationTime: '00:00', // 总时长
    currentWidth: 0, // 实时进度条的宽度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let musicId = options.musicId
    this.getMusicInfo(musicId)
    this.setData({
      musicId
    })
    // console.log(appInstance)
    // 判断当前页面音乐是否在播放
    if(appInstance.globalData.isMusicPlay && appInstance.globalData.musicId == musicId) {
      // 修改当前音乐播放状态为true
      this.setData({
        isPlay: true
      })
    }

    // 创建控制音乐播放的实例
    this.backgroundAudioManager = wx.getBackgroundAudioManager()
    // 监视音乐播放/暂停
    this.backgroundAudioManager.onPlay(() => {
      this.changePlayState(true)
      // 修改全局音乐播放的状态
      appInstance.globalData.musicId = musicId

    })
    this.backgroundAudioManager.onPause(() => {
      this.changePlayState(false)

    })
    this.backgroundAudioManager.onStop(() => {
      this.changePlayState(false)
    })
    // 监听音乐实时播放的进度
    this.backgroundAudioManager.onTimeUpdate(() => {
      // console.log('总时长：', this.backgroundAudioManager.duration)
      // console.log('实时时长', this.backgroundAudioManager.currentTime)
      let currentTime = moment(this.backgroundAudioManager.currentTime * 1000).format('mm:ss') // 单位是s，要转换成ms
      let currentWidth = this.backgroundAudioManager.currentTime/this.backgroundAudioManager.duration * 450 // 比例计算，450是总长度

      this.setData({
        currentTime,
        currentWidth
      })
    })
    // 监听音乐播放自然结束
    this.backgroundAudioManager.onEnded(() => {
      // 自动切换至下一首音乐，并且自动播放
      PubSub.publish('switchType','next')
      // 将实时进度条切换成0
      this.setData({
        currentWidth: 0,
        currentTime: '00:00'
      })
    })
  },
  // 修改播放状态
  changePlayState(isPlay) {
    this.setData({
      isPlay
    })
    appInstance.globalData.isMusicPlay = isPlay
  },
  // 获取音乐详情的回调函数
  async getMusicInfo(musicId) {
    let song = await request('/song/detail', {ids: musicId})
    // song.songs[0].dt 单位是ms
    let durationTime = moment(song.songs[0].dt).format('mm:ss')
    this.setData({
      song: song.songs[0],
      durationTime
    })
    // 动态修改窗口标题
    wx.setNavigationBarTitle({
      title: this.data.song.name,
    });
  },
  // 控制音乐播放/暂停的逻辑函数
  handleMusicPlay() {
    // this.setData({
    //   isPlay: !this.data.isPlay
    // })
    let isPlay = !this.data.isPlay
    let { musicId, musicLink} = this.data
    this.musicControl(isPlay, musicId, musicLink)
  },
  // 控制音乐播放/暂停的功能函数
  async musicControl(isPlay, musicId, musicLink) {
    if(isPlay) { // 音乐播放
      if(!musicLink) {
        let musicLinkData = await request('/song/url', {id: musicId})
        musicLink = musicLinkData.data[0].url
        this.setData({
          musicLink
        })
      }
      

      this.backgroundAudioManager.src = musicLink
      this.backgroundAudioManager.title = this.data.song.name
    } else { // 暂停音乐
      this.backgroundAudioManager.pause()
    }
  },
  // 点击切歌的回调
  handleSwitch(event) {
    // 获取切歌的类型
    let type = event.currentTarget.id
    // 关闭当前播放的音乐
    this.backgroundAudioManager.stop()

    // 订阅来自recommendSong页面发布的musicId的消息
    PubSub.subscribe('musicId', (msg, musicId) => { // 不能放在切歌的回调中，每点击一次就会订阅一次（PubSub底层用数组存储回调的），订阅完需要取消订阅

      // console.log(musicId)
      // 更新musicId
      this.setData({
        musicId 
      })
      appInstance.globalData.musicId = musicId
      // 获取音乐详情信息
      this.getMusicInfo(musicId)
      // 自动播放当前音乐
      this.musicControl(true, musicId)
      // 每订阅完一次，取消订阅
      PubSub.unsubscribe('musicId')

    })
    // 发布消息给recommendSong页面
    PubSub.publish('switchType', type)
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