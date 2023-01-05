// pages/login.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '', // 手机号
    password: '', // 用户密码
    checked: false, // 是否同意协议
    sheetShow: false, // 控制上拉菜单
  },

  phoneLogin() {
    if(this.data.checked) {
      console.log('跳转登录页')
    } else {
      console.log('弹出提示框')
      this.setData({
        sheetShow: true
      })
    }
  },
  // 关闭上拉菜单
  onClose() {
    this.setData({ sheetShow: false });
  },
  onChange(event) {
    this.setData({
      checked: event.detail
    })
    // console.log(this.data.checked)
  },
  getPhoneNumber(e) {
    console.log(e)
  },
  handleInput(event) { // 收集表单数据
    // let type = event.currentTarget.id // phone || password 通过id传值
    let type = event.currentTarget.dataset.type
    console.log(type, event.detail.value)
    this.setData({
      [type]: event.detail.value
    })
  },
  async login() { // 登录的回调
    // 收集表单项数据
    let { phone, password } = this.data
    // 前端验证
    if (!phone) {
      // 提示用户
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return
    }

    // 定义正则
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return
    }

    if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return
    }

    // 后端验证
    let res = await request('/login/cellphone', { phone, password })
    // 实际开发中，要考虑多种状态码的情况
    console.log('login', res)
    switch (res.code) {
      case 200:
        wx.showToast({
          title: '登录成功'
        })
        // 本地存储个人信息
        wx.setStorage({
          key: 'userinfo',
          data: JSON.stringify(res.profile)
        })
        let cookie = res.cookie.split(';;').find(item => item.indexOf('MUSIC_U') !== -1)
        console.log(cookie)
        wx.setStorage({
          key: 'cookie',
          // data: res.cookie,
          data: cookie,
        })
        // 跳转到个人中心
        wx.reLaunch({ // perosnal获取本地数据放在了onload里，用reLauch方法保证onload回调会重新执行，当然也可以不把读取用户数据的方法放在onLoad里，放在onShow里面（性能不太好，每次页面显示都会执行）
          url: '/pages/personal/personal'
        })
        break
      case 400:
        wx.showToast({
          title: '手机号或密码错误',
          icon: 'none'
        })
        break
      case 502:
        wx.showToast({
          title: '手机号或密码错误',
          icon: 'none'
        })
        break
      default:
        wx.showToast({
          title: res.message || '登录失败，请重新登录',
          icon: 'none'
        })

    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log('我加载啦')
    // wx.getUserInfo({
    //   success: (res) => { // 要用箭头函数，回调函数被调用时，是wx页面实例调的
    //     console.log('获取授权成功', res)
    //     // this.setData({
    //     //   userInfo: res.userInfo
    //     // })
    //   },
    //   fail: (err) => {
    //     console.log('获取授权失败', err)
    //   }
    // })
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