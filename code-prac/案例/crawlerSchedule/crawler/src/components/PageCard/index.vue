<template>
  <div class="container-page-card">
    <div class="header">
      <i class="icon-left iconfont" :class="iconfontL"></i>
      <span>{{ name }}</span>

      <i
        class="icon-right iconfont icon-tongyong_shangla"
        @click="collapse"
        v-if="isCollapse"
      ></i>
      <i
        class="icon-right iconfont icon-tongyong_xiala"
        @click="collapse"
        v-else
      ></i>
    </div>
    <div
      class="content"
      :style="{ height: this.height + 'px', display: this.dataDisplay }"
    >
    <!-- 不能用v-if-else,否则echarts对应的dom还未生成就实例化了 -->
      <div class="loading" v-show="showloading"></div>

      <template v-show="!showloading">
        <slot name="text" class="text"></slot>
        <slot name="chart" class="chart"></slot>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "PageCard",
  data() {
    return {
      dataDisplay: this.display,
    };
  },
  props: {
    iconfontL: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    showloading: {
      type: Boolean,
    },
    height: {
      type: Number | String,
    },
    display: {
      type: String,
      default: "block",
    },
  },
  computed: {
    isCollapse() {
      return this.dataDisplay == "none" ? false : true;
    },
  },
  methods: {
    collapse() {
      if (this.dataDisplay == "none") {
        this.dataDisplay = "block";
      } else {
        this.dataDisplay = "none";
      }
      this.$emit('collapse', this.isCollapse)
    },
  },
};
</script>
<style lang="less" scoped>
.container-page-card {
  box-shadow: 0px 0px 2px 1px rgba(95, 94, 94, 0.2);
  .header {
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    border-bottom: 1px solid rgba(95, 94, 94, 0.2);
    .iconfont {
      font-size: 20px;
    }
    .icon-left {
      margin-right: 10px;
    }
    .icon-right {
      float: right;
      cursor: pointer;
    }
  }
  .content {
    padding: 24px;
    background-color: #fff;
    .loading {
      margin-top: 70px;
      z-index: 99;
    }
    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>