/*
 * @Author: your name
 * @Date: 2021-12-21 21:44:16
 * @LastEditTime: 2021-12-28 07:12:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \book02\src\store\modules\moduleImg.js
 */
import {
  IMGSTATE
} from '../mutations-types'

export default {
  state: {
    // 保存页面加载时的背景图片，保证其他页面一样的
    // 这里没有复用background组件
    backgroundImageBase: '',
  },
  mutations: {
    [IMGSTATE](state) {
      if (this.state.imgState == false) {
        this.state.imgState = true
      } else {
        this.state.imgState = !this.state.imgState
      }
      // console.log(this.state.imgState)
    },
    mu_bgImageBase(state, data) {
      this.state.backgroundImageBase = data
    }

  }

}
