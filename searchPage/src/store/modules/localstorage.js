
import localstorage from "@/utils/localstorage";
import {SETNAVIGATIONHISTORY, REACTIMAGE} from "../mutation-types";

export default  {
  state: {
    localstorage
  },
  mutations: {
    [SETNAVIGATIONHISTORY](state, history) {
      console.log(localstorage)
      state.localstorage.navigation.navigationHistory = history
      //console.log('store', history)
    },
    [REACTIMAGE](state, history) {
      console.log(localstorage)
      state.localstorage.defaultImage.defaultImage = history
      //console.log('store', history)
    },
  }
}
