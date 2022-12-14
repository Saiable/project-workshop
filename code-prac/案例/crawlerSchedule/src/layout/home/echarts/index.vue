<template>
  <div class="container-chart">
    <Header :name="name" />
    <div class="context">
      <PageCard iconfontL="icon-tishi" name="统计">
        <template v-slot:text>
          <!-- <span>
            This view displays real-time statistics about the spider jobs
          </span> -->
          <div class="total-number">
            <div class="text-container">
              <span>总数:</span>
              <span class="text">{{ totalNumber }}</span>
            </div>
            <div
              class="alarm-container"
              v-show="alarmData.length"
            >
              <!-- <el-table
                :data="alarmData"
                style="width: 100%"
                :show-header="false"
              >
                <el-table-column
                  prop="fileName"
                ></el-table-column>
                <el-table-column
                  prop="nums"
                  label="数量"
                  sortable
                ></el-table-column>
              </el-table> -->
              <div class="alarm-text">告 警</div>

              <ul class="item-container">
                <li class="item" v-for="(item, index) in alarmData">
                  {{ item.fileName }}
                </li>
              </ul>
            </div>
          </div>
        </template>
      </PageCard>
      <!-- 所有的爬虫任务 -->
      <PageCard
        iconfontL="icon-tubiao-zhuzhuangtu"
        name="爬虫总数"
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
          name="单个爬虫数量"
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
import {
  getAllCounter,
  getCounterByDays,
  getAlarmAdmin,
} from "@/api/crawler.js";
export default {
  name: "Echarts",
  data() {
    return {
      name: "统计",
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
      showLoadingC: true,
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
      alarmData: [
        // {
        //   fileName: "测试1：6条",
        //   // nums: 6,
        // },
        // {
        //   fileName: "测试1：6条",
        //   // nums: 6,
        // },
        // {
        //   fileName: "测试1：6条",
        //   // nums: 6,
        // },
        // {
        //   fileName: "测试2：5条",
        //   // nums: 5,
        // },
        // {
        //   fileName: "测试3：3条",
        //   // nums: 3,
        // },
        // {
        //   fileName: "测试4：1条",
        //   // nums: 1,
        // },
        // {
        //   fileName: "测试5：2条",
        //   // nums: 2,
        // },
        // {
        //   fileName: "测试6：0条",
        //   // nums: 0,
        // },
        // {
        //   fileName: "测试7：6条",
        //   // nums: 6,
        // },
      ],
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
    this.getAlarmAdmin();
  },
  methods: {
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
                // stack: "x",
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
            // console.log(this.lineOptions);
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
    // 获取告警信息
    getAlarmAdmin() {
      this.showLoadingC = true;
      getAlarmAdmin().then(
        (res) => {
          this.showLoadingC = false;
          if (res.errcode == 200) {
            // console.log(res.data);
            let keys = this.getKeys(res.data);
            let values = this.getValues(res.data);
            // console.log(keys, values);
            keys.forEach((item, index) => {
              this.alarmData.push({
                fileName: item + ": " + values[index] + "条",
              });
            });
          } else {
            this.$message({
              message: "告警数据获取失败",
              type: "error",
            });
          }
        },
        (err) => {
          console.log(err);
          this.$message({
            message: "告警数据获取失败",
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
      display: flex;
      justify-content: space-between;
      // font-family: electronicFont;
      font-size: 18px;
      // float: right;
      .text-container {
        .text {
          font-size: 30px;
        }
      }

      .alarm-container {
        position: relative;

        // position: absolute;
        // top: -20px;
        // right: 0;
        width: 40%;

        .alarm-text {
          // position: absolute;
          margin-bottom: 10px;
          text-align: center;
          // font-weight: 500;
          font-size: 25px;
        }
        .item-container {
          border-top: 1px solid rgba(128, 128, 128, 0.774);
          border-bottom: 1px solid rgba(128, 128, 128, 0.774);
          .item {
            display: inline-block;
            width: calc(100% / 5);

            padding: 10px 5px;
            text-align: center;
          }
        }

        // .td-table:first-child {
        //   border-top: 1px solid rgba(128, 128, 128, 0.774);
        // }
        // .td-table:last-child {
        //   border-bottom: 1px solid rgba(128, 128, 128, 0.774);
        // }
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
