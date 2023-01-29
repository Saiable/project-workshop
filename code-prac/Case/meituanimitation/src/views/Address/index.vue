<template>
  <Header title="地址管理" />
  <van-address-list
    :list="list"
    disabled-text="以下地址超出配送范围"
    default-tag-text="默认"
    @add="onAdd"
    @edit="onEdit"
  />
</template>

<script>
import Header from "@/components/Header/index.vue";
import { reactive, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  components: {
    Header,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const onAdd = () => {
      router.push({
        path: "editaddress",
        query: {
          type: "add",
        },
      });
    };
    const onEdit = (item) => {
      router.push({
        path: "editaddress",
        query: {
          id: item.id,
          type: "edit",
        },
      });
    };
    const data = reactive({
      list: [],
    });
    const initAddress = () => {
      data.list = store.state.userAddress.map((item) => {
        return {
          id: item.id,
          name: item.name,
          tel: item.tel,
          address: `${item.province}${item.city}${item.county}${item.addressDetail}`,
          isDefault: item.isDefault,
        };
      });
    };
    onMounted(() => {
      initAddress();
    });
    return {
      onAdd,
      onEdit,
      ...toRefs(data),
    };
  },
};
</script>

<style lang="scss" scoped>
:deep(.van-button) {
  background-color: #ffc400;
  border-color: #ffc400;
}

:deep(.van-switch-on) {
  background-color: #ffc400;
}

:deep(.van-radio__icon) {
  display: none;
}
</style>