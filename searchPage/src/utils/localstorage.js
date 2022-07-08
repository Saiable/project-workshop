export default {
  navigation: {
    get navigationHistory() {
      return localStorage.getItem('navigationHistory')
    },
    set navigationHistory(value) {
      return localStorage.setItem('navigationHistory', value)
    }
  },
  defaultImage: {
    get defaultImage() {
      return localStorage.getItem('defaultImage')
    },
    set defaultImage(value) {
      return localStorage.setItem('defaultImage', value)
    }
  }
}
