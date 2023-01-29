<template>
  <div class="header">
    <van-icon name="arrow-left" class="icon" @click="toBack" />
    <div>{{ title }}</div>
    <div class="edit" v-show="edit" @click="handleEdit">{{ store.state.edit ? '编辑' : '完成' }}</div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { showToast } from "vant";
export default {
  props: ["title", "edit"],
  setup() {
    const router = useRouter();
    const store = useStore();
    const toBack = () => {
      router.back();
    };
    const handleEdit = () => {
      if (store.state.cartList.length) {
        store.commit('edit')
        store.commit('changeDelete')
      } else {
        showToast('请添加商品到购物车')
      }
    };
    return {
      toBack,
      handleEdit,
      store
    };
  },
};
</script>
    
<style lang="scss" scoped>
.header {
  background-color: #fff;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #d7d7d7;
  font-size: 18px;

  .edit {
    font-size: 16px;
    position: absolute;
    right: 15px;
    font-weight: normal;
  }

  .icon {
    position: absolute;
    left: 10px;
  }
}
</style>