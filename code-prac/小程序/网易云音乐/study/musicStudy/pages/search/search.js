// pages/search/search.js
import request from '../../utils/request.js'
let isSend = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderContent: '', //placeholder默认值
    hotList: '', // 热搜榜数据
    searchContent: '', // 用户输入的表单项数据
    searchList: [], // 模糊匹配的数据
    // isSend: 'false', // 是否发送请求
    historyList: [], // 搜索历史记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getInitData()
    this.getSearchHistory()
  },
  // 获取初始化数据
  async getInitData() {

    let placeHolderData = await request('/search/default')
    let hostListData = await request('/search/hot/detail')
    this.setData({
      placeholderContent: placeHolderData.data.showKeyword,
      hotList: hostListData.data
    })
  }, 
  // 获取本地搜索记录
  getSearchHistory() {
    let historyList = wx.getStorageSync('searchHistory')
    if(historyList) {
      this.setData({
        historyList
      })
    }
  },
  // 清空搜索内容
  clearSearchContent() {
    this.setData({
      searchContent: '',
      searchList: []
    })
  },
  // 清空历史记录
  deleteHistory() {
    wx.showModal({
      // title: '清空',
      content: '确定清空全部历史记录？',
      success: (res) => {
        if(res.confirm) {
          // 清空data中的historyList
          this.setData({
            historyList: []
          })
          // 移除本地缓存
          wx.removeStorageSync('searchHistory')
        }
      }
    })
  },
  // 表单项内容发生改变的回调
  handleInputChange(event) {
    // console.log(event)
    // 更新searchContent的状态
    if(!event.detail.value) {
      this.setData({
        searchList: []  // 置空配合wx:if
      })
      return
    }
    this.setData({
      searchContent: event.detail.value.trim()
    })
    if(isSend) return
    isSend = true
    this.getSearchList()
    // 函数节流
    setTimeout(() => {
      isSend = false
    }, 3000)

  },
  async getSearchList() {
    let {searchContent, historyList} = this.data
    // 发请求获取关键字模糊匹配数据
    let searchListData = await request('/search', {keywords: searchContent, limit: 10})
    // console.log(searchListData)
    this.setData({
      searchList: searchListData.result.songs
    })
    // 添加搜索记录
    if(historyList.indexOf(searchContent) !== -1) {
      historyList.splice(historyList.indexOf(searchContent), 1)
    }
    historyList.unshift(searchContent)

    this.setData({
      historyList
    })
    // 搜索记录需要存到本地
    wx.setStorageSync('searchHistory', historyList)
  },
  // 
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