const ls = localStorage;

export default {
    get(key) {
        try {
            return JSON.parse(ls.getItem(key));
        } catch {
            return ls.getItem(key);
        }
    },
    set(key, value) {
        ls.setItem(key, JSON.stringify(value));
    },
    remove(key) {
        ls.removeItem(key);
    },
    clear() {
        ls.clear();
    }
}