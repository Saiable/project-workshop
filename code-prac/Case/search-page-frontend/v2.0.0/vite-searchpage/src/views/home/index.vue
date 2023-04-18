<script setup name="HomeIndex">
import Cover from './components/Cover.vue';
import ls from '@/utils/db.js';
// console.log(ls)
</script>
<template>
    <div class="home">
        <Cover />
        <back-ground />
    </div>
</template>
<style scoped lang="scss">
.home {
    width: 100vw;
    height: 100vh;
}
</style>