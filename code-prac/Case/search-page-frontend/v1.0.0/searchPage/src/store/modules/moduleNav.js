import {IMGSTATETWO} from '../mutations-types'
export default {
  state: {

  },
  mutations: {
    [IMGSTATETWO](state) {
      if(this.state.imgState) {
        this.state.imgState = false
      }
      // this.state.imgState = !this.state.imgState
      // console.log(this.state.imgState )
    }
  }

}
