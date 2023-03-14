import {TIMECLICK, COVERCLICK, INPUTCLICK, SLIDEBARHOVER, SHOWWEATHWE, SHOWCANLENDAR, SHOWCARD, CLICKLOGINOUT} from "../mutation-types";

export default {
  state: {
    input: false, // 点击input输入框时，对应的状态
    time: false, // 点击time模块对应的状态
    sliderBar: false, // 侧边栏模块对应的状态,hover事件触发
    weather: false, // 点击天气组件对应的状态
    calendar: false, // 点击日历组件对应的状态
    card: false,// 点击个人信息的状态
    loginOut: false, // 点击登出时
  },
  mutations: {
    [CLICKLOGINOUT] (state) {
      state.loginOut = true
    },
    [INPUTCLICK](state) {
      state.input = true // 激活input状态
      state.sliderBar  = false // 取消侧边栏激活状态
      state.weather = false // 取消天气激活状态
      state.calendar = false // 取消日历激活状态
      state.card = false // 取消个人信息激活状态
    },
    [COVERCLICK](state) {
      state.input = false // 取消input激活状态
      state.time = false // 取消time激活状态
      state.sliderBar = false // 取消slidebar激活状态
      state.weather = false // 取消天气激活状态
      state.calendar = false // 取消日历激活状态
      state.card = false // 取消个人信息激活状态
    },
    [TIMECLICK](state) {
      state.time = !state.time // time激活状态的双向切换
      state.sliderBar  = false // 取消侧边栏激活状态
      state.card = false // 取消个人信息激活状态
    },
    [SLIDEBARHOVER](state) {
      // 只有在Input和time未激活时，才调出slideBar
      if(!state.input && !state.time) {
        state.sliderBar = true
      }
    },
    [SHOWWEATHWE](state) {
      state.calendar = false
      state.weather = !state.weather
      state.card = false // 取消个人信息激活状态
    },
    [SHOWCANLENDAR](state) {
      state.weather = false
      state.calendar = !state.calendar
      state.card = false // 取消个人信息激活状态
    },
    [SHOWCARD](state) {
      state.card = !state.card
    }
  }
}
