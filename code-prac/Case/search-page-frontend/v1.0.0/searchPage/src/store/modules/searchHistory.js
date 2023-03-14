import state from "@/utils/searchHistory";
import {SETSEARCHHISTORY} from "../mutation-types";

export default  {
    state,
    mutations: {
        [SETSEARCHHISTORY](state, history) {
            state.searchHistory = history
            //console.log('store', history)
        },
        //[LOGIN_OUT](state) {
        //    state.userAuth = ''
        //},
    }
}

