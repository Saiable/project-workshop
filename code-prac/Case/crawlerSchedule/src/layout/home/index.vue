<template>
  <div class="container-header">
    <div class="sidebar">
      <div class="header">
        <div class="header-top">
          <span
            class="text"
            @click="toHome()"
            :class="$route.path === '/home/echarts' ? 'is-active' : ''"
          >
            <span class="spider iconfont icon-tupianpachong-02"></span>
            爬虫监控平台
          </span>
          <span class="fold iconfont icon-qiehuanbaogaomingxi"></span>
        </div>
        <div class="header-content">
          <ul class="outer">
            <li
              class="item"
              @click="toJobs()"
              :class="$route.path === '/home/jobs' ? 'is-active' : ''"
            >
              任务
              <span class="iconfont icon-shouye"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="schedule">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      alive: ["echarts"],
    };
  },

  methods: {
    toHome() {
      this.$router.push({
        name: "echarts",
      });
    },
    toJobs() {
      // console.log(this.$route.path);

      this.$router.push({
        name: "jobs",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.container-header {
  display: flex;

  .sidebar {
    width: 250px;
    height: 100vh;
    background: #30426a;
    position: fixed;
    top: 0;
    left: 0;
    .header-top {
      padding: 15px 25px;
      color: #b2bfdc;

      .iconfont {
        font-size: 24px;
        margin-right: 5px;
      }

      .text {
        font-size: 20px;
        cursor: pointer;
      }

      .fold {
        font-size: 20px;
        float: right;
        color: #fff;
      }
      &:hover {
        color: #fff;
      }
      .is-active {
        color: #fff;
      }
    }

    .header-content {
      color: #fff;
      a {
        text-decoration: none;
        color: #b2bfdc;
      }

      .outer {
        // padding: 0 30px;
        // width: 100%;
        height: 100%;
        cursor: pointer;
        &:hover {
          background-color: #2d3e63;
          a {
            color: #fff;
          }
        }
      }

      .item {
        // width: 100%;

        height: 36px;
        line-height: 36px;
        font-size: 16px;
        color: #b2bfdc;
        padding: 0 30px;
        &:hover {
          color: #fff;
        }

        .iconfont {
          float: right;
          font-size: 18px;
        }
      }
      .is-active {
        color: #fff;
        background-color: #2d3e63;
        border-left: 4px solid #fff;
      }
    }
  }

  .content {
    width: calc(100vw - 250px);
    height: 100vh;
    margin-left: 250px;
    background-color: #f3f3f3;

    .schedule {
      width: 100%;
      // height: calc(100vh - 60px);
    }
  }
}
</style>
>
