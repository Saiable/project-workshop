export default  {
  state: {
    subNavInfo: {},
    subIndex: 0,
    changeSubNavName: '',
  },
  mutations: {
    saveSubNavInfo(state, payload) {
      state.subNavInfo = payload
      //console.log(state.subNavInfo)
    },
    saveSubIndex(state, payload) {
      state.subIndex = payload
      // console.log(this.state.index)
    },
    saveSubNavName(state, payload) {
      state.changeSubNavName = payload
      // console.log(this.state.changeNavName)
    }
  }
}

