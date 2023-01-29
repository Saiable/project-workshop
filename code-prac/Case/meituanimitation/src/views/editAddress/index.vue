<template>
  <Header :title="address" />
  <van-address-edit
    :area-list="areaList"
    show-delete
    show-set-default
    show-search-result
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @save="onSave"
    @delete="onDelete"
    :address-info="addressInfo"
  />
</template>

<script>
import Header from "@/components/Header/index.vue";
import { computed, onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { showDialog } from "vant";
import router from "@/router";
export default {
  components: {
    Header,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const data = reactive({
      areaList: {
        province_list: {
          11000: "广东省",
          12000: "浙江省",
        },
        city_list: {
          110100: "广州市",
          110200: "深圳市",
          120100: "杭州市",
          120200: "宁波市",
        },
        county_list: {
          110101: "天河区",
          110102: "海珠区",
          120102: "上城区",
          130102: "下城区",
        },
      },
      addressInfo: {},
    });
    const onSave = (content) => {
      // 新增和编辑
      if (route.query.type === "add") {
        store.commit("addaddress", content);
      } else {
        store.commit("editaddress", content);
      }
      showDialog({
        message: "保存成功",
      });
      setTimeout(() => {
        router.back();
      }, 0);
    };
    const onDelete = (content) => {
      store.commit("deleteaddress", content);
      showDialog({
        message: "删除成功",
      });
    };
    const address = computed(() => {
      return route.query.type === "add" ? "地址新增" : "地址编辑";
    });
    const initAddressInfo = () => {
      store.state.userAddress.map((item) => {
        if (Number(item.id) === Number(route.query.id)) {
          data.addressInfo = item;
        }
      });
    };
    onMounted(() => {
      initAddressInfo();
    });
    return {
      ...toRefs(data),
      onSave,
      onDelete,
      address,
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
</style>