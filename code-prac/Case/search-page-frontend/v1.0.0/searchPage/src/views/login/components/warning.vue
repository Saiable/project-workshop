<template>
  <div class="warning item z-200">
    <div v-show="isBlur">
      <i v-if="!validateResProps.res" 
        class="iconfont icon-jinggao" 
        @mouseenter="showMes=true"
        @mouseleave="showMes=false"
        ></i>
      <i v-else class="iconfont iconfont icon-ai52"></i>
    </div>
    <div v-show="showMes" class="validate-message">{{ validateResProps.message }}</div>
  </div>
</template>   

<script>
export default {
  name: "warning",
  props: {
    // 接受父组件传过的值，res表示input校验的结果，message表示校验未通过的错误信息
    validateResProps: {
      type: Object,
      default() {
        return {
          res: false,
          message: "",
        };
      },
    },
    // 用来控制input失去焦点时，触发小图标的显示，无论是校验成功还是失败，显示的是外层的div
    isBlur: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      // 管理错误信息的显隐，由icon图标的鼠标移入移出事件控制
      showMes: false
    }
  }
};
</script>

<style scoped>
/* 警告样式开始 */

.warning .icon-jinggao {
  color: rgb(255, 167, 5);
  font-size: 20px;
  cursor: pointer;
}
/* 警告样式结束 */
/* 通过样式开始 */
.warning .icon-ai52 {
  color: rgb(0, 192, 102);
  font-size: 20px;
}
/* 通过样式结束 */

/* 文本提示样式开始 */
.validate-message {
  position: absolute;
  transform: translateX(-50%);
  left: 10px;
  top:35px;
  width: 100px;
  
  padding: 5px;
  border-radius: 10px;
  background-color: rgba(255,255,255,.9);
  box-shadow: 2px 2px 2px rgba(255,255,255,.5);

  color: rgb(53, 53, 53);
  font-size: 12px;

}
/* 文本提示样式结束 */
</style>