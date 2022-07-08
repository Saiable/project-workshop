export default {
  get userAuth() {
    return localStorage.getItem('Authorization')
  },
  set userAuth(value) {
    localStorage.setItem('Authorization', value)
  }
}
