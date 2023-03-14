/*
 * @Author: your name
 * @Date: 2021-11-15 22:35:59
 * @LastEditTime: 2021-12-28 06:56:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \book02\src\store\index.js
 */
// /store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import changeImage from "./modules/change-image"
import moduleImg from './modules/moduleImg'
import moduleNav from "./modules/moduleNav";
import token from "./modules/token";
import isClick from './modules/is-click';
import moduleConfig from "./modules/moduleConfig";
import moduleParentNav from "./modules/moduleParentNav";
import moduleSubNav from "./modules/moduleSubNav";
import searchHistory from "./modules/searchHistory";
import localstorage from "./modules/localstorage";
//1.安装插件
Vue.use(Vuex)

//2.创建对象
const store = new Vuex.Store({
  state: {
    // 记录input激活状态，激活input是为了高斯模糊
    // input激活和高斯模糊，绑定在一起了
    inputActive: false,
    // 默认为false，表示img没有模糊样式这个类
    // 用来控制点击时间，是否模糊
    imgState: false,
    // 记录icon激活状态
    iconShow: false,
    //  记录天气组件状态
    weatherShow: false,
    //  记录日历组件状态
    calendarShow: false,
    //记录天气和日历的互斥显示状态
    //  记录slicebar状态
    slideIconHover: false,
  //  记录time被点击了，控制input
    timeIsClick: false,
    //  记录time被点击，控制Nav
    timeClickNav: false,
  //  记录input的显示
    searchOptShow: true,
  //  记录Nav中Margin的状态
    changeMargin: false,
    // 控制nav展示时，也处理模糊状态
    navblur: false,
  },
  mutations,
  actions,
  getters,
  modules: {
    changeImage,
    moduleImg,
    // moduleNav,
    token,
    moduleConfig, // record user configdata
    moduleParentNav,
    moduleSubNav,
    isClick,
    searchHistory,
    localstorage
  }
})

//3.导出store独享
export default store
