<template>
  <div class="food-list" v-if="index === 0">
    <van-tree-select
      v-model:main-active-index="activeIndex"
      height="88vw"
      :items="items"
      @click-nav="navClick"
    >
      <template #content>
        <div v-for="(item, index) in subItems" class="item-bg">
          <ListItem
            :item="item"
            :handleAdd="handleAdd"
            :handleStepperChange="handleStepperChange"
          />
        </div>
      </template>
    </van-tree-select>
  </div>
  <div v-else>
    {{ foodData.content }}
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import FoodListItem from "../FoodListItem/index.vue";
import ListItem from "@/components/ListItem/index.vue";
export default {
  props: ["index", "foodData"],
  components: {
    FoodListItem,
    ListItem,
  },
  setup(props) {
    let data = reactive({
      activeIndex: ref(0),
      items: [],
      subItems: [],
    });
    const initData = () => {
      let newArray = [];
      props.foodData?.items?.forEach((item, index) => {
        newArray.push({
          text: item.text,
        });
        if (data.activeIndex === index) {
          data.subItems = item.children;
        }
      });
      data.items = newArray;
    };
    initData();

    const navClick = (index) => {
      data.activeIndex = index;
      initData();
    };

    const handleAdd = (id) => {
      data.subItems.forEach((item, index) => {
        if (item.id === id) {
          item.add = false;
          item.num += 1;
        }
      });
    };
    const handleStepperChange = (value, detail) => {
      data.subItems.forEach((item, index) => {
        if (item.id === detail.name) {
          item.num = value;
        }
      });
    };
    return {
      ...toRefs(data),
      navClick,
      handleAdd,
      handleStepperChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.food-list {
  margin-top: 20px;
  .item-bg {
    padding: 10px;
  }
  :deep(.van-tree-select__item--active) {
    color: #ffc400;
  }
  :deep(.van-sidebar-item--select::before) {
    background-color: #ffc400;
  }
}
</style>