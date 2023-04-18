<template>
  <div class="image-box">
    <el-image :src="url" fit="cover" class="bg-image">
      <template #placeholder>
        <div class="loading"></div>
      </template>
      <template #error>
        <div class="image-loading-error"></div>
      </template>
    </el-image>
  </div>
  <context-menu :propsContextVisible="true" :propsContextLeft="100" :propsContextTop="100"/>

</template>

<script setup name="BackGround">
import { getBackgroundData } from "@/api/home.js";

let url = ref("");

function getBgData() {
  // 获取服务器图片数据并存本地
  // get server image data and save locally
  getBackgroundData().then(
    (res) => {
      url.value = res.data.imgBase;
      // localStorage最大限制为5M
      // localstorage's max size is 5M
      // if (true) {
      //   localStorage.setItem("defaultImage", backgroundData.imgBase);
      // } else {
      //   console.log("超出限制，重新请求");
      // }
      // console.log(url);
    },
    (error) => {
      console.log(error);
    }
  );
}
getBgData();


function getLoalImage() {}
</script>

<style scoped lang="scss">
.image-box {
  :deep(.bg-image) {
    display: block;

    width: 100vw;
    height: 100vh;
    .image-loading-error {
      width: 100%;
      height: 100%;
      background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
    }
  }
}

.bgbox {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  object-fit: cover;

  width: 100%;
  height: 100%;

  transition: transform 0.25s, filter 0.25s;
  &.focus {
    filter: blur(5px);
    transform: scale(1.04);
  }
}
// .bgbox.focus {
//   filter: blur(5px);
//   transform: scale(1.04);
// }
</style>