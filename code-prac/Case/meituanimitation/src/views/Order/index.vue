<template>
  <div class="order">
    <Header title="订单" />
    <van-tabs color="#ffc400">
      <van-tab :title="item" v-for="(item, index) in navData">
        <div v-for="(i, index) in store.state.orderListEnd" v-if="item === '全部' && store.state.orderListEnd.length">
          <van-card :num="i.num" :price="i.price" :title="i.title" :thumb="i.pic" />
        </div>
        <div v-else>
          <Empty />
        </div>
      </van-tab>
    </van-tabs>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header/index.vue";
import Footer from "@/components/Footer/index.vue";
import Empty from "@/components/Empty/index.vue";
import { reactive, toRefs } from 'vue';
import { useStore } from "vuex";
export default {
  components: {
    Header,
    Footer,
    Empty
  },
  setup() {
    const store = useStore();
    const data = reactive({
      navData: ['全部', '交易完成', '代付款', '代发货', '已发货']
    })

    return {
      ...toRefs(data),
      store,
    }
  }
};
</script>

<style lang="scss" scoped>
.order {
  display: flex;
  flex-direction: column;
  height: 100%;

  .content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>