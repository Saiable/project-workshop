export default {

    state: {
        parentNavInfo: {},
        index: 0,
        //changeNavName: '',
        parentId: 0,
    },

    mutations: {
        saveParentNavInfo(state, payload) {
            state.parentNavInfo = payload
            //console.log(state.parentNavInfo)
        },
        saveIndex(state, payload) {
            state.index = payload
            console.log(state.index)
        },
        //savaNavName(state, payload) {
        //    state.changeNavName = payload
        //    // console.log(this.state.changeNavName)
        //},
        saveParentId(state, payload) {
            state.parentId = payload
            console.log('父导航id',state.parentId)
        }


    }
}

