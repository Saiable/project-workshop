export default {
  mu_activeBgbox(state) {
    // inputActive用作background组件，动态绑定focus类
    // true表示激活模糊
    // 我们这里一开始是，直接将Input是否激活，和是否模糊，绑定到一个变量上了
    // 不同组件的状态，最好提供一种可分离的状态定义
    this.state.inputActive = true
    this.state.iconShow = true
    // console.log($store.state.imgState)
  },
  // 点击遮罩层触发的事件，
  mu_deactiveBgbox(state) {
    // 记录input输入框状态和搜索图标状态
    if (this.state.inputActive) {

      this.state.inputActive = false
      this.state.iconShow = false
    }
    if (this.state.mu_timeIsClick) {
      this.state.mu_timeIsClick = false
    }
  },
  mu_deactiveSlideBar(state) {
    if (this.state.slideIconHover) {
      this.state.slideIconHover = false
      this.state.weatherShow = false
      this.state.calendarShow = false

    }
  },
  mu_changeWeather(state) {
    this.state.calendarShow = false
    this.state.weatherShow = true
  },
  mu_changeCalendar(state) {
    this.state.weatherShow = false
    this.state.calendarShow = true

  },
   mu_changeHover(state) {
    this.state.slideIconHover = true
  },
  mu_timeIsClick(state) {
    this.state.timeIsClick = true
  },
  // mu_deactiveNav(state) {
  //   if(this.state.timeClickNav == true)
  //   this.state.timeClickNav = false
  // },
  mu_showNav(state) {
    this.state.timeClickNav = !this.state.timeClickNav
  },
  mu_showInput(state) {
    this.state.searchOptShow = !this.state.searchOptShow
  },
  mu_changeMargin(state) {
    this.state.changeMargin = !this.state.changeMargin
  },
  mu_recoverMargin(state) {
    if (this.state.timeClickNav == false) {
      this.state.changeMargin = false
    }
  },
  mu_deactiveNav(state) {
    this.state.timeClickNav = false
    this.state.searchOptShow = true
  },
  // mu_navBlur(state) {
  //   this.state.navblur = !this.state.navblur
  // }
}
