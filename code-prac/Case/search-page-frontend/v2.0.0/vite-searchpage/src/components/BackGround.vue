<script setup name="BackGround">
import { getBackgroundData } from "@/api/home.js";
import { useCountStore } from "@/stores/count.js";
import { storeToRefs } from "pinia";
import { useLocalStorage, useStorage } from "@vueuse/core";
import { reactive } from "vue";
/**
 * @url 存储获取的图片url链接
 * @
 */
const state = reactive({
  url: "",
});

/**
 * @Logic 获取一次服务器图片数据，并将新的图片url，缓存本地localStorage
 * @Role 游客
 */
function getBgData() {
  getBackgroundData().then(
    (res) => {
      state.url = res.data.imgBase;
      localStorage.setItem("defaultImage", res.data.imgBase);
    },
    (error) => {
      console.log(error);
    }
  );
}

/**
 * @Logic 给getBgData添加调用限制条件：先检查本地localStorage是否有defaultImage字段，如果有，则不用再发请求，直接用本地的url。
 * @Scene 避免每次刷新页面，都重新请求。
 * @Boundary localStorage是否有defaultImage字段
 * @Role 游客
 */
function getCacheBgData() {
  let defaultImage = localStorage.getItem("defaultImage");
  if (!defaultImage) {
    getBgData();
  } else {
    state.url = localStorage.getItem("defaultImage");
  }
}

const getConfigData = function () {
  // 获取配置信息
  let localAuth = this.$store.state.token.userAuth;
  localAuth &&
    getUserConfig(localAuth).then(
      (res) => {
        console.log(res.data);
        this.config.vague = res.data.Vague ? true : false;
      },
      (error) => {
        console.log(error);
      }
    );
};

getCacheBgData();
</script>
<template>
  <div class="image-page">
    <el-image :src="state.url" fit="cover" class="el-image-cus">
      <template #placeholder>
        <!-- loading类在公共样式中定义，展现加载动画 -->
        <div class="loading"></div>
      </template>
      <template #error>
        <!-- 若请求图片失败，展现加载动画，不用加提示框 -->
        <div class="loading"></div>
      </template>
    </el-image>
  </div>
  <!-- <context-menu :propsContextVisible="true" :propsContextLeft="100" :propsContextTop="100"/> -->
</template>
<style scoped lang="scss">
.image-page {
  :deep(.el-image-cus) {
    display: block;

    width: 100vw;
    height: 100vh;
    // 设置图片不可拖拽
    img {
      -webkit-user-drag: none;
    }
  }
}
</style>