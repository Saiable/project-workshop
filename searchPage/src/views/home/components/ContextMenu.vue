<template>
  <div class="contextmenu-outer">
    <ul
      v-show="propsContextVisible"
      :style="{left: propsContextLeft+'px',top: propsContextTop + 'px'}"
      class="contextmenu z-1000"
    >
      <li @click="changeRemoteImage">切换壁纸</li>
      <li>
        <el-upload
          class="avatar-uploader"
          action="thisIsElementUIBug"
          :show-file-list="false"
          :on-change="changeLocalImage"
        >上传壁纸
        </el-upload>
      </li>
    </ul>
  </div>
</template>

<script>
  import {REMOTEIMAGE, LOCALIAMGE, REACTIMAGE} from '@/store/mutation-types'
  export default {
    name: "ContextMenu",
    props: {
      propsContextVisible: {
        type: Boolean,
        required: true,
        default () {
          return false
        }
      },
      propsContextLeft: {
        type: Number,
        required: true,
        default() {
          return 0
        }
      },
      propsContextTop: {
        type: Number,
        required: true,
        default() {
          return 0
        }
      }
    },
    methods: {
      changeRemoteImage() {
        this.$emit('updateContextVisible', false)
        this.$store.commit(REMOTEIMAGE)
      },
      changeLocalImage(file) {
        //上传头像
        this.getBase64(file.raw).then(res => {
          // localStorage.setItem('defaultImage', res)
          this.$store.commit(REACTIMAGE,res)
        }, error => {
          console.log(error)
        })
        this.uploadImage()
      },
      uploadImage() {
        this.$emit('updateContextVisible', false)
        this.$store.commit(LOCALIAMGE)
      },
      getBase64(file) {
        //把图片转成base64编码
        return new Promise(function (resolve, reject) {
          let reader = new FileReader();
          let imgResult = "";
          reader.readAsDataURL(file);

          reader.onload = function () {
            imgResult = reader.result;
          };
          reader.onerror = function (error) {
            reject(error);
          };
          reader.onloadend = function () {
            resolve(imgResult);
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
