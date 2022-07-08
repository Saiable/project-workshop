<template>
  <div class="z-100">
    <div v-if="getBase">
      <img :src="getBase" class="bgbox" :class="blurImage" />
    </div>
    <div v-else class="transition-bg"></div>
  </div>
</template>

<script>
import { getBackgroundData } from "@/api/home";
import { getUserConfig } from "@/api/userinfo";

export default {
  name: "BackGround",
  data() {
    return {
      backgroundData: {
        imgBase: ''
      },
      config: {
        vague: true,
      },
    };
  },
  computed: {
    getBase: function () {
      return this.backgroundData.imgBase;
    },
    blurImage() {
      let isVague = this.$store.state.token.userAuth ? this.config.vague : true;
      return {
        // 只要input和time其中有一个为true，就始终激活模糊
        focus: isVague
          ? this.$store.state.isClick.input || this.$store.state.isClick.time
          : false,
      };
    },
    remoteImageState() {
      return this.$store.state.changeImage.remoteImage;
    },
    localImageState() {
      return this.$store.state.changeImage.localImage;
    },
    reactiveLocalImg() {
      return this.$store.state.localstorage.localstorage.defaultImage.defaultImage
    }
  },
  watch: {
    remoteImageState(newValue, oldValue) {
      if (newValue != oldValue) {
        this.getBackgroundData();
      }
    },
    localImageState(newValue, oldValue) {
      if (newValue != oldValue) {
        // this.updateLocalImage();
        // console.log('picture',this.$store.state.localstorage.localstorage.defaultImage.defaultImage)
        console.log('localImage')
        this.backgroundData = {
          // imgBase: localStorage.getItem("defaultImage"),
          imgBase: this.reactiveLocalImg
        };
      }
    },
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.getLoalImage();
      this.getConfigData();
    },
    getLoalImage() {
      // 第一次加载图片，如果本地没有，调用接口获取图片
      let defaultImage = localStorage.getItem("defaultImage");
      if (!defaultImage) {
        this.getBackgroundData();
      } else {
        //  如果本地有，从localStorage取值
        this.backgroundData.imgBase = localStorage.getItem("defaultImage");
      }
    },
    getBackgroundData() {
      // 获取服务器图片数据并存本地
      getBackgroundData().then(
        (res) => {
          this.backgroundData = res.data;
          // console.log(this.backgroundData)
          localStorage.setItem("defaultImage", this.backgroundData.imgBase);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // 更新本地图片数据
    updateLocalImage() {
      this.backgroundData = {
        imgBase: localStorage.getItem("defaultImage"),
      };
    },
    getConfigData() {
      // 获取配置信息
      let localAuth = this.$store.state.token.userAuth;
      localAuth &&
        getUserConfig(localAuth).then(
          (res) => {
            console.log(res.data)
            this.config.vague = res.data.Vague? true : false;
            
          },
          (error) => {
            console.log(error);
          }
        );
    },
  },
};
</script>

<style scoped>
</style>
