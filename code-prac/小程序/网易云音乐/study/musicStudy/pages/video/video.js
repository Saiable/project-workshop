// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [], // 导航的标签数据（命名和接口保持一致）
    navId: 0, // 导航的标识,
    videoList: [], // 视频标签数据，现在视频链接数据要通过vid额外发请求获取了,
    videoId:'', //video的id标识
    videoUpdateTime: [], // 记录video播放时长
    isTrigger: false, // 标识下拉刷新是否被触发
    offset: 0, // 下拉刷新控制偏移量
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
      navId,
      videoList: []
    })
    wx.showLoading({
      title: '加载中',
    });
      
    // 动态获取当前导航对应的视频数据
    this.getVideoList(navId)
  },
  // 获取视频列表数据
  async getVideoList(navId, offset = this.data.offset) {
    if(!navId) return

    try {
      let videoListData = await request('/video/group', {id: navId, offset}) // 这个接口有时候会报302,然后就导致获取视频url的接口有问题，undefined.map会报错

      // console.log(videoListData)
      let index = 0
      let videoList = await Promise.all(videoListData.datas.map(async item => {
        // index++
        // let temp = offset 
        // let distance = temp * 8 - 1

        let temp = offset - 1
        index++
        item.id = temp += index
        let urlInfo = await request('/video/url', {id: item.data.vid})
        item.dealedUrl = urlInfo.urls[0].url
        return item
      }))
      if(offset === 0) {
        this.setData({
          videoList,
          isTrigger: false, // 关闭下拉刷新
        })
      } else {
        this.setData({
          isTrigger: false, // 关闭下拉刷新
        })
        return videoList // 把视频数据交出去，实际上更新数据的逻辑，放在外面会好一点
      }
      // 关闭消息提示框
      wx.hideLoading()
    } catch(err) {
      console.log(err)
      wx.showToast({
        title: '资源转移，请稍后再试',
        icon: 'none'
      })
    }
  },
  // 播放视频的回调
  handlePlay(event) {
    // console.log('play')
    /**
     * 1.播放的回调中，需要找到上一个播放的视频
     * 2.在播放新视频之前，关闭上一个播放的视频
     * 关键：
     *    1.如何找到上一个视频的实例对象：将属性添加到this身上
     *    2.如何确定点击播放的视频和正在播放的视频，不是同一个视频：每次都保存在vid并比较
     * 
     * 通过给this身上只绑定一个属性，并且控制代码顺序，可以实现上面的效果
     * 这就是单例模式：
     *  1.需要创建多个对象的场景下，通过一个变量接收，始终保持只有一个对象
     *  2.节省内存空间
     */
    let vid = event.currentTarget.id

    // 图片标签相关代码1
    // 点击图片时，拿到传过来对应的视频id，更新data中的videoId的状态
    this.setData({
      videoId: vid
    })

    // 关闭上一个播放的视频
    // this.vid !== vid && this.videoContext && this.videoContext.stop()
    // this.vid // 在挂载之前，拿到的id，就是上一次id
    // this.vid = vid // 第一次播放时，把vid挂载到this上
    // 创建控制video标签的实例对象
    this.videoContext =  wx.createVideoContext(vid)

    // 判断是否有播放记录，如果有，跳转至指定位置
    let {videoUpdateTime} = this.data
    let videoItem = videoUpdateTime.find(item => item.vid === vid)
    if(videoItem) {
      this.videoContext.seek(videoItem.currentTime)
    }
    // 图片标签相关代码2
    // 点击图片后，视频应自动播放
    this.videoContext.play()
  },
  // 监听视频播放进度的回调
  handleTimeUpdate(event) {
    // console.log(event)
    let videoTimeObj = {
      vid: event.currentTarget.id,
      currentTime: event.detail.currentTime
    }

    let {videoUpdateTime} = this.data
    // 判断videoUpdateTime中，是否有当前视频的播放记录
    let videoItem = videoUpdateTime.find(item => item.vid ===  videoTimeObj.vid)
    if(videoItem) {
      videoItem.currentTime = videoTimeObj.currentTime
    } else {
      videoUpdateTime.push(videoTimeObj)
    }
    // 更新播放状态
    this.setData({
      videoUpdateTime
    })
  },
  // 监听视频播放结束
  handleEnded(event) {
    console.log('播放结束')
    // 移出当前播放视频的对象
    let {videoUpdateTime} = this.data
    let index = videoUpdateTime.findIndex(item => item.vid === event.currentTarget.id)
    videoUpdateTime.splice(index, 1)
    this.setData({
      videoUpdateTime
    })
  },
  // 监听下拉刷新事件
  handleRefresher() {
    // console.log('下拉刷新')
    // 再次发请求，获取视频列表的数据
    this.getVideoList(this.data.navId)
  },
  // 监听上拉触底事件
  async handleToLower() {
    // console.log('下拉')
    /**
     * 数据分页
     * 1.前端分页
     * 2.后端分页
     * 备注：网易云音乐没有开放的分页的接口
     */
    let newVideoList = await this.getVideoList(this.data.navId, this.data.offset+=8)
    let videoList = this.data.videoList
    // console.log(videoList)
    // 将新数据更新到原有视频列表中
    videoList.push(...newVideoList)
    // console.log(videoList)
    this.setData({
      videoList
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
    console.log('页面的下拉')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log('页面的触底')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage({from}) {
  //   if(from === 'button') {
  //     return {
  //       title: '来自button的转发',
  //       page: '/pages/video/video',
  //       imageUrl: '/static/images/nvsheng.jpg'
  //     }
  //   } else {
  //     return {
  //       title: '来自menu的转发',
  //       page: '/pages/video/video',
  //       imageUrl: '/static/images/nvsheng.jpg'
  //     }
  //   }
  }
})