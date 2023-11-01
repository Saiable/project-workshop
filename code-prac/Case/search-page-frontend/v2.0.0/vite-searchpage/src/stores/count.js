export const useCountStore = defineStore('main', () => {
    // State
    const count = ref(0);
    // getter
    const doubleCount = computed(() => count.value * 2)
    // actions
    const increment = function () {
        count.value++
    }

    return {
        count,
        doubleCount,
        increment
    }
})