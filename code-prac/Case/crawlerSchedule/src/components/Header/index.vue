<template>
  <div class="container-header">
    <div class="text">
      {{ name }}
      <i
        class="iconfont icon-shuaxin1"
        @click="refreshData()"
        title="刷新"
      ></i>
    </div>
    <div class="account">
      <i class="iconfont icon-1zhanghu"></i>
      <span>管理员</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    refreshData() {
      console.log("refreshData");
      this.$emit('refreshData')
    },
  },
};
</script>
<style lang="less" scoped>
.container-header {
  position: sticky;
  top: 0;
  right: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  z-index: 100;

  // margin-bottom: 24px;
  .text {
    height: 60px;
    line-height: 60px;
    margin-left: 24px;
    font-size: 24px;
    font-weight: 300;
    .iconfont {
      color: #30426a;
      cursor: pointer;
      &:hover {
        color: #1e2b47;
      }
    }
  }
  .account {
    position: absolute;
    margin-right: 24px;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    .iconfont {
      margin-right: 5px;
    }
  }
}
</style>