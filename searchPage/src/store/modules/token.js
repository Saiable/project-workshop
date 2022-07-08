import state from "@/utils/auth";
import {LOGIN_IN, LOGIN_OUT} from "../mutation-types";

export default  {
  state,
  mutations: {
    [LOGIN_IN](state, auth) {
      state.userAuth= auth
    },
    [LOGIN_OUT](state) {
      state.userAuth = ''
    },
  }
}

