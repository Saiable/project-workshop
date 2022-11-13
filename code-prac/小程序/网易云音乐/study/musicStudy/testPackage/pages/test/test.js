// test/test.js
import request from '../../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      userName: 'sai',
      useAge: 18
    }
  },
  // 获取用户openId的回调
  handleGetOpenId() {
    // 1.获取登录凭证,wx.login()
    wx.login({
      success: async (res) => {
        console.log(res)
        let code = res.code

        // 2.将登录凭证发送给服务器，后台需要额外提供一个接口，和微信的服务器通信
        let result = await request('/getOpenId', {code})
        console.log(result)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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