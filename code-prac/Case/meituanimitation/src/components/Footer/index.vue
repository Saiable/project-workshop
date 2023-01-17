<template>
  <van-tabbar v-model="active" active-color="#ffc400">
    <van-tabbar-item replace to="/home" icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item replace to="/order" icon="coupon-o">订单</van-tabbar-item>
    <van-tabbar-item replace to="/mine" icon="manager-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const active = ref(0);
    return { active };
  },
};
</script>

<style lang="scss" scoped>
</style>