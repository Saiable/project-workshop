<template>
  <div class="cart-detail">
    <div class="content">
      <van-checkbox-group v-model="checked" @change="groupChange">
        <div v-for="(item, index) in store.state.cartList">
          <ListItem :item="item" :handleStepperChange="handleStepperChange" :showCheckBox="true" />
        </div>
      </van-checkbox-group>
    </div>
    <van-submit-bar :price="allPrice" button-text="结算" @submit="onSubmit" class="submit-all" button-color="#ffc400"
      v-if="store.state.isDelete">
      <van-checkbox v-model="submitChecked" checked-color="#ffc400" @click="chooseAll">全选</van-checkbox>
    </van-submit-bar>
    <div class="buy" v-else>
      <div class="left">
        <van-checkbox v-model="submitChecked" checked-color="#ffc400" @click="chooseAll">全选</van-checkbox>
      </div>
      <div class="delete" @click="handleDelete">删除</div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ListItem from "@/components/ListItem/index.vue";
import { showToast } from 'vant';
export default {
  props: [
    "changeShow"
  ],
  components: {
    ListItem,
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const data = reactive({
      checked: [],
      submitChecked: true,
    });
    const handleStepperChange = (value, detail) => {
      store.state.cartList.map((item) => {
        if (item.id === detail.name) {
          item.num = value;
        }
      });
    };
    const init = () => {
      data.checked = store.state.cartList.map((item) => item.id);
    };
    onMounted(() => {
      init();
    });
    const onSubmit = () => {
      if (data.checked.length) {
        store.commit('pay', updatePrice())
        router.push({
          path: 'createOrder',
          query: {
            list: data.checked
          }
        })
      } else {
        showToast('请选择要结算的商品')
      }  
    };
    const chooseAll = () => {
      if (data.checked.length !== store.state.cartList.length) {
        init();
      } else {
        data.checked = [];
      }
    };
    const groupChange = (res) => {
      if (res.length === store.state.cartList.length) {
        data.submitChecked = true;
      } else {
        data.submitChecked = false;
      }
      data.checked = res;
    };
    const allPrice = computed(() => {
      let countList = updatePrice()
      let sum = 0;
      countList.forEach((item) => {
        sum += item.num * item.price;
      });
      return sum * 100;
    });
    const updatePrice = (type) => {
      return store.state.cartList.filter((item) => {
        return type === 'delete' ? !data.checked.includes(item.id) : data.checked.includes(item.id)
      });
    }
    const handleDelete = () => {
      // 部分删除
      // 全部删除
      if (data.checked.length) {
        store.commit('delete', updatePrice('delete'));
        // 删除操作后，都是未选中状态
        data.checked = []
        // 没有数据的时候，兜底操作；兜底样式在父组件中
        if (!store.state.cartList.length) {
          props.changeShow()
          store.commit('eidt', 'delete')
        }
      } else {
        showToast('请选择要删除的商品')
      }
    };
    return {
      ...toRefs(data),
      store,
      handleStepperChange,
      onSubmit,
      chooseAll,
      groupChange,
      allPrice,
      handleDelete,
    };
  },
};
</script>

<style lang="scss" scoped>
.cart-detail {
  font-size: 14px;
  flex: 1;
  position: relative;
  overflow-y: auto;
  padding: 20px 20px 55px;

  .submit-all {
    position: fixed;
    bottom: 48px;
  }

  .buy {
    position: fixed;
    bottom: 48px;
    right: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-radius: 10px;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;

    .left {
      display: flex;
      align-items: center;
    }

    .delete {
      color: #fff;
      background-color: #ffc400;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      width: 110px;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
  }
}
</style>