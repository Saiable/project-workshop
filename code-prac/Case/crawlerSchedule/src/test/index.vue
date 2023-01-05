<template>
  <div
    class="box"
    ref="box"
  >
    <!-- 头部盒子 -->
    <header>
      <h1>爬虫监控可视化</h1>
      <Time class="showTime" />
    </header>
    <section class="mainbox">
      <div class="column">
        <div class="panel">
          <h2>爬虫数量</h2>
          <div
            class="chart"
            ref="chartA"
          >
            图表
          </div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel">
          <h2>爬虫数量</h2>
          <div
            class="chart"
            ref="chartB"
          >
            图表
          </div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel">
          <h2>爬虫数量</h2>
          <div class="chart">图表</div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <div class="column">
        <!-- no模块制作 -->
        <div class="no">
          <div class="no-hd">
            <ul>
              <li>125811</li>
              <li>100000</li>
            </ul>
          </div>
          <div class="no-bd">
            <ul>
              <li>爬取页面总数</li>
              <li>昨日爬取总数</li>
            </ul>
          </div>
        </div>
        <!-- 地图模块 -->
        <div class="map">
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
          <div class="chart"></div>
        </div>
      </div>
      <div class="column">
        <div class="panel">
          <h2>爬虫数量</h2>
          <div class="chart">图表</div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel">
          <h2>爬虫数量</h2>
          <div class="chart">图表</div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel">
          <h2>爬虫数量</h2>
          <div class="chart">图表</div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </section>
    <div class="test"></div>
  </div>
</template>

<script>
import Time from "@/components/Time.vue"
export default {
  name: "test",
  data() {
    return {
      optionsA: {
        color: ["#2f89cf"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "0%",
          top: "10px",
          right: "0%",
          bottom: "4%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [ "旅游行业","教育培训", "游戏行业", "医疗行业", "电商行业", "社交行业", "金融行业" ],
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12",
            },
            //  x轴样式不显示
            axisLine: {
              show: false,
              // 如果想要设置单独的线条样式
              // lineStyle: {
              //    color: "rgba(255,255,255,.1)",
              //    width: 1,
              //    type: "solid"
              // }
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12",
            },
            //  x轴样式不显示
            axisLine: {
              // show: false,
              // 如果想要设置单独的线条样式
              lineStyle: {
                 color: "rgba(255,255,255,.1)",
                 width: 1,
                 type: "solid"
              }
            },
          },
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "45%",
            data: [200, 300, 300, 900, 1500, 1200, 600], // 动态通过ajax请求获取
            itemStyle: {
          // 修改柱子圆角
          barBorderRadius: 5
        }
          },
        ],
      },
    }
  },
  components: {
    Time,
  },
  mounted() {
    // this.$nextTick(function() {
    //   let charts = this.$refs.chart // this.$refs不支持获取数组对象
    //   console.log(typeof charts,charts)
    //   charts.forEach((item, index) => {
    //     this.initChart(item, this.options[index])
    //   })
    // })
      this.$nextTick(function() {
        this.initChart(this.$refs.chartA, this.optionsA)
      })

  },
  methods: {
    initChart(target, options) {
      let myChart = this.$echarts.init(target)
      myChart.setOption(options)
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
  },
}
</script>

<style lang="less" scoped>
@import url("./css/index.less");
</style>
