<template>
  <div class="container-chart">
    <Header :name="name" />
    <div class="context">
      <PageCard iconfontL="icon-tishi" name="About Statistics" v-show="true">
        <template v-slot:text>
          <span>
            This view displays real-time statistics about the spider jobs
          </span>
          <div class="total-number">
            <span>Total:</span>
            <span class="text">{{ totalNumber }}</span>
          </div>
        </template>
      </PageCard>
      <!-- 所有的爬虫任务 -->
      <PageCard
        iconfontL="icon-tubiao-zhuzhuangtu"
        name="Spider Counter"
        class="charts-container"
        :showloading="showLoadingA"
        :height="300"
      >
        <div slot="chart" class="chart" ref="chartA"></div>
      </PageCard>
      <!-- 按天查看爬虫任务，默认是7天 -->
      <div class="days-container">
        <div class="select" v-show="selectShow">
          <el-select
            v-model="selectValue"
            placeholder="7 days"
            @change="selectChange"
          >
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <PageCard
          iconfontL="icon-tubiao-zhuzhuangtu"
          name="Spider Counter By Days"
          class="charts-container"
          :showloading="showLoadingB"
          :height="300"
          @collapse="collapse"
        >
          <div slot="chart" class="chart" ref="chartB"></div>
        </PageCard>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header/index.vue";
import PageCard from "@/components/PageCard/index.vue";
import { getAllCounter, getCounterByDays } from "@/api/crawler.js";
export default {
  name: "Echarts",
  data() {
    return {
      name: "Statistics",
      optionsAllCounter: {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} 条",
              //   align: "center",
            },
          },
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: "60%",
            data: [],
          },
        ],
      },
      lineOptions: {
        xAxis: {
          data: [],
          // data: ["A", "B", "C", "D", "E"],
        },
        yAxis: {},
        series: [
          // {
          //   data: [10, 22, 28, 43, 49],
          //   type: "line",
          //   stack: "x",
          // },
          // {
          //   data: [5, 4, 3, 5, 10],
          //   type: "line",
          //   stack: "x",
          // },
        ],
        legend: {
          data: [],
        },
        tooltip: {
          trigger: "axis",
        },
      },
      showLoadingA: true,
      showLoadingB: true,
      selectOptions: [
        {
          value: "7",
          label: "7 days",
        },
        {
          value: "14",
          label: "14 days",
        },
        {
          value: "30",
          label: "30 days",
        },
      ],
      selectValue: "7",
      selectShow: true,
      echartsInstance: {},
      echartsMounted: false,
      totalNumber: 0,
    };
  },
  components: {
    Header,
    PageCard,
  },
  watch: {},
  mounted() {
    this.getAllCounter();
    this.getCounterByDays();
  },
  methods: {
    getKeys(obj) {
      let arr = [];
      for (let key in obj) {
        arr.push(key);
      }
      return arr;
    },
    getValues(obj) {
      let arr = [];
      for (let key in obj) {
        arr.push(obj[key]);
      }
      return arr;
    },
    initChart(ref, options) {
      let myChart = this.$echarts.init(this.$refs[ref]);
      myChart.setOption(options);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
      return myChart;
    },
    collapse(value) {
      this.selectShow = value;
    },
    selectChange(val) {
      // console.log(val);
      this.getCounterByDays(val);
    },
    getAllCounter() {
      this.showLoadingA = true;
      getAllCounter().then(
        (res) => {
          if (res.data) {
            this.showLoadingA = false;
            let xAxisData = this.getKeys(res.data);
            let seriesData = this.getValues(res.data);
            let number = 0;
            seriesData.forEach((item) => {
              number += item;
            });
            this.totalNumber = number;
            // console.log(number);
            // console.log(res.data);
            // this.$set(this.optionsAllCounter.xAxis[0], "data", xAxisData);
            // this.$set(this.optionsAllCounter.series[0], "data", seriesData);
            this.optionsAllCounter.xAxis[0].data = xAxisData;
            this.optionsAllCounter.series[0].data = seriesData;

            this.initChart("chartA", this.optionsAllCounter);
          } else {
            this.$message({
              message: "获取数据失败",
              type: "error",
            });
          }
        },
        (err) => {
          console.log(err);
          this.$message({
            message: "获取数据失败",
            type: "error",
          });
        }
      );
    },
    getCounterByDays(days = 7) {
      this.showLoadingB = true;
      getCounterByDays(days).then(
        (res) => {
          if (res.data) {
            this.showLoadingB = false;
            // console.log(res);
            // let xAxisData = this.getKeys(res.data);
            // this.lineOptions.xAxis.data = xAxisData
            let series = [];

            let seriesData = this.getValues(res.data);
            let xAxisData = this.getKeys(seriesData[0]); // 横坐标
            let legend = this.getKeys(res.data);

            // console.log(legend);
            seriesData.forEach((item, index) => {
              series.push({
                name: legend[index],
                data: this.getValues(item),
                type: "line",
                stack: "x",
              });
            });
            // console.log(series) // 纵坐标

            // console.log(res.data);
            // console.log(xAxisData, series)
            this.lineOptions.xAxis.data = xAxisData;
            this.lineOptions.series = series;
            this.lineOptions.legend.data = legend;

            if (this.echartsMounted) {
              this.echartsInstance.dispose();
            }
            this.echartsInstance = this.initChart("chartB", this.lineOptions);
            this.echartsMounted = true;
          } else {
            this.$message({
              message: "获取数据失败",
              type: "error",
            });
          }
        },
        (err) => {
          console.log(err);
          this.$message({
            message: "获取数据失败",
            type: "error",
          });
        }
      );
    },
  },
};
</script>

<style scoped lang="less">
.container-chart {
  .context {
    padding: 24px;
    .total-number {
      font-family: electronicFont;
      font-size: 18px;
      float: right;
      .text {
        font-size: 30px;
      }
    }
    .charts-container {
      position: relative;
      margin-top: 24px;
    }
  }
  .chart {
    width: 100%;
    height: 300px;
  }
  .days-container {
    position: relative;
    .select {
      position: absolute;
      top: 70px;
      right: 18px;
      z-index: 99;
    }
  }
}
</style>
