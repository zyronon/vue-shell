const { localStorage } = window

export default {
    set(key, value) {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        localStorage.setItem(key, value)
    },
    get(key, default2 = '') {
        const value = localStorage.getItem(key) || default2
        try {
            return JSON.parse(value)
        } catch (e) {
            return value
        }
    },
    remove(key) {
        localStorage.removeItem(key)
    },
}
