<template>
  <div class="mine">
    <Header title="我的" />
    <div class="content">
      <div class="user-info">
        <div class="info">
          <img src="@/assets/logo.png" alt="" />
          <div class="user-desc">
            <span>昵称：{{ name }}</span>
            <span class="name">个性签名：{{ describe }}</span>
          </div>
        </div>
      </div>
      <ul class="user-list">
        <li class="van-hairline-bottom" @click="go('order')">
          <span>我的订单</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline-bottom" @click="go('address')">
          <span>地址管理</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline-bottom" @click="go('userinfoedit')">
          <span>账号管理</span>
          <van-icon name="arrow" />
        </li>
      </ul>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header/index.vue";

import Footer from "@/components/Footer/index.vue";
import { reactive, toRefs } from 'vue';
import {useRouter} from "vue-router";
export default {
  components: {
    Footer,
    Header,
  },
  setup() {
    const router = useRouter();
    const data = reactive({
      name: "sai",
      describe: "战胜自己才是命运的强者"
    })
    const go = (path) => {
      router.push(path)
    }
    return {
      ...toRefs(data),
      go
    }
  }
};
</script>

<style lang="scss" scoped>
.mine {
  display: flex;
  height: 100%;
  flex-direction: column;
  .content {
    flex: 1;
    overflow-y: auto;
    .user-info {
      width: 94%;
      margin: 10px;
      height: 115px;
      background: linear-gradient(90deg, #ffc400, #c7c351);
      box-shadow: 0 2px 5px #ffc400;
      border-radius: 6px;
      .info {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
        padding: 25px 20px;
        box-sizing: border-box;
        img {
          border-radius: 50%;
          margin-top: 4px;

        }
        .user-desc {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          line-height: 20px;
          font-size: 14px;
          color: #fff;
          .van-icon-setting-o {
            font-size: 16px;
            vertical-align: -3px;
            margin-right: 4px;
          }

        }

      }
    }
    .user-list {
      padding: 0 20px;
      margin-top: 20px;
      background-color: #fff;
      li {
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        .van-icon-arrow {
          margin-top: 13px;
        }
      }
    }
  }
}
</style>