export default {
    get searchHistory() {
        return localStorage.getItem('searchHistory')
    },
    set searchHistory(value) {
        localStorage.setItem('searchHistory', value)
    }
}
