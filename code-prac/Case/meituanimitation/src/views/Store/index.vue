<template>
  <div class="store-details">
    <Header title="店铺" />
    <div class="content">
      <div class="img"></div>
      <div class="food-sort">
        <div class="name">
          {{ title }}
          <img :src="img" alt="" class="store-img" />
        </div>
        <van-tabs color="#ffc400">
          <van-tab :title="item.name" v-for="(item, index) in storeData">
            <FoodList :index="index" :foodData="item.data" />
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <van-action-bar>
      <!-- <van-action-bar-icon icon="chat-o" text="客服" dot /> -->
      <van-action-bar-icon
        icon="cart-o"
        text="购物车"
        :badge="store.state.cartList.length"
        @click="goCart"
      />
      <van-action-bar-icon icon="shop-o" text="店铺" badge="12" />
      <van-action-bar-button
        type="warning"
        text="加入购物车"
        @click="handleAddCart"
      />
      <van-action-bar-button type="danger" text="立即购买" @click="goBuy" />
    </van-action-bar>
  </div>
</template>

<script>
import Header from "@/components/Header/index.vue";
import FoodList from "./components/FoodList/index.vue";
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { showToast } from "vant";

export default {
  components: {
    Header,
    FoodList,
  },
  setup() {
    let store = useStore();
    let router = useRouter();
    let data = reactive({
      title: "鱼拿酸菜鱼",
      img: "https://img2.baidu.com/it/u=4290189414,4097634281&fm=253&fmt=auto&app=138&f=JPEG?w=448&h=448",
      storeData: [
        {
          name: "点菜",
          data: {
            content: "点菜",
            items: [
              {
                text: "热销套餐",
                children: [
                  {
                    pic: "https://img1.baidu.com/it/u=1577254714,2022287643&fm=253&fmt=auto&app=120&f=JPEG?w=899&h=500",
                    title: "隆江猪脚饭",
                    num: 0,
                    price: 25.0,
                    id: 0,
                    add: true,
                  },
                  {
                    pic: "https://img1.baidu.com/it/u=1577254714,2022287643&fm=253&fmt=auto&app=120&f=JPEG?w=899&h=500",
                    title: "隆江猪脚饭",
                    num: 0,
                    price: 32.0,
                    id: 1,
                    add: true,
                  },
                ],
              },
              {
                text: "热销套餐",
                children: [
                  {
                    pic: "https://img2.baidu.com/it/u=4027544918,4023969048&fm=253&fmt=auto&app=138&f=JPEG?w=666&h=500",
                    title: "无骨酸菜鱼",
                    num: 0,
                    price: 13.0,
                    id: 3,
                    add: true,
                  },
                  {
                    pic: "https://img2.baidu.com/it/u=4027544918,4023969048&fm=253&fmt=auto&app=138&f=JPEG?w=666&h=500",
                    title: "无骨酸菜鱼",
                    num: 0,
                    price: 14.0,
                    id: 4,
                    add: true,
                  },
                ],
              },
            ],
          },
        },
        {
          name: "评价",
          data: {
            content: "评价",
          },
        },
        {
          name: "商家",
          data: {
            content: "商家",
          },
        },
      ],
    });
    const handleAddCart = (type) => {
      const newList = store.state.cartList || [];
      data.storeData.forEach((item) => {
        item.data.items?.forEach((item) => {
          item.children.forEach((item) => {
            if (item.num > 0) {
              newList.push(item);
            }
          });
        });
      });
      if (newList.length === 0) {
        showToast("请选择商品");
        return;
      }
      store.commit("addCart", newList);

      type === "buy" ? goCart() : "";
    };
    const goCart = () => {
      router.push("/cart");
    };

    const goBuy = () => {
      handleAddCart("buy");
    };
    return {
      ...toRefs(data),
      handleAddCart,
      store,
      goCart,
      goBuy,
    };
  },
};
</script>

<style lang="scss" scoped>
.store-details {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    overflow-y: auto;
    .img {
      background: url("https://cube.elemecdn.com/A/DA/E182B507B4EDE9F87B86BF4400545png.png")
        no-repeat center/cover;
      width: 100%;
      height: 150px;
    }
    .food-sort {
      height: 500px;
      background-color: #fff;
      margin-top: -30px;
      border-radius: 20px 20px 0 0;
    }
    .sort {
      margin-top: 10px;
    }
    .name {
      display: flex;
      padding: 20px;
      justify-content: space-between;
      font-size: 18px;
      .store-img {
        width: 80px;
        height: 80px;
        border-radius: 10px;
        margin-top: -30px;
      }
    }
  }
}
</style>