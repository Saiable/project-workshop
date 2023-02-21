<template>
  <Header title="账号管理" />
  <div>
    <van-field v-model="name" label="昵称" placeholder="请输入昵称" />
    <van-field v-model="sign" label="个性签名" placeholder="请输入个性签名" />
    <van-field v-model="password" label="密码" placeholder="请输入密码" />
  </div>
  <div class="btn">
    <van-button
      type="primary"
      color="#fc400"
      round
      block
      class="save-btn"
      @click="save"
      >保存</van-button
    >
    <van-button
      type="primary"
      color="#fc400"
      round
      block
      class="save-btn"
      @click="loginOut"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import Header from "@/components/Header/index.vue";
import { reactive, toRefs } from "vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";
export default {
  components: {
    Header,
  },
  setup() {
    const router = useRouter();
    const data = reactive({
      name: "",
      sign: "",
      password: "",
    });
    const save = () => {
      if (data.name && data.password) {
        let userInfo = JSON.parse(localStorage.userInfo);
        let newUserInfo = {
          user: data.name || userInfo.name,
          password: data.password || userInfo.password,
        };
        localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
        showToast("修改成功");
        router.push("mine");
      } else {
        showToast("请输入内容");
      }
    };
    const loginOut = () => {
      localStorage.removeItem("isLogin");
      showToast("退出成功");
      router.push("login");
    };

    return {
      save,
      loginOut,
      ...toRefs(data),
    };
  },
};
</script>

<style lang="scss" scoped>
.btn {
  :deep(.van-button--primary) {
    background-color: #ffc400;
    border-color: #ffc400;
  }
}

.save-btn {
  width: 80%;
  margin: 20px auto;
}
</style>