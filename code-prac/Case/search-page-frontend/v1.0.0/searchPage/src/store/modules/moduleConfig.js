export default {
  state: {
    vague: true,
    switchWallpaper: true,
  },
  mutations: {
    mu_modifyVague(state, val) {
      this.state.vague = val ? true : false
    },
    mu_modifySwitchWallpaper(state, val) {
      this.state.switchWallpaper = val ? true : false
    },

  }
}
