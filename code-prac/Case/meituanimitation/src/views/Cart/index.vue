<template>
  <div class="cart">
    <Header title="购物车" :edit="true" />
    <CartDetail v-if="isShow" :changeShow="changeShow"></CartDetail>
    <Empty v-else />
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer/index.vue";
import Empty from "@/components/Empty/index.vue";
import Header from "@/components/Header/index.vue";
import CartDetail from "./components/CartDetail.vue";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
export default {
  components: {
    Footer,
    Empty,
    CartDetail,
  },
  setup() {
    const isShow = ref(true);
    const store = useStore();
    const init = () => {
      if (store.state.cartList.length === 0) {
        isShow.value = false;
      }
    };
    onMounted(() => {
      init();
    });
    const changeShow = () => {
      isShow.value = false
    };
    return {
      isShow,
      changeShow 
    }
  },
};
</script>

<style lang="scss" scoped>
.cart {
  display: flex;
  flex-direction: column;
  height: 100%;
  // .content {
  //   flex: 1;
  //   overflow-y: auto;
  // }
}
</style>