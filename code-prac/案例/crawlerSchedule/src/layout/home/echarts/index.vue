<template>
  <div class="container-chart">
    <Header :name="name" @refreshData="refreshData" />
    <div class="context">
      <PageCard iconfontL="icon-tishi" name="统计">
        <template v-slot:text>
          <div class="total-number">
            <div class="text-container">
              <span>总数:</span>
              <span class="text">{{ totalNumber }}</span>
            </div>
          </div>
        </template>
      </PageCard>

      <PageCard iconfontL="icon-tishi" name="告警" v-show="alarmData.length">
        <template v-slot:text>
          <div>
            <div class="alarm-container" v-show="alarmData.length">
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
        :height="500"
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
          :height="500"
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
        dataZoom: [],
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
          bottom: "10%",
          containLabel: true,
          // y2: 350,
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              interval: 0,
              rotate: -38,
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
      demoBarOptions: {
        xAxis: {
          type: "category",
          data: [
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
            "Mon123123213",
            "Tue123123213",
            "Wed123123213",
            "Thu123123213",
            "Fri123123213",
            "Sat123123213",
            "Sun123123213",
          ],
          axisLabel: {
            interval: 0,
            rotate: -38,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [
              120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130,
              120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130,
              120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130,
              120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130,
              120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130,
              120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130,
              120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130,
              120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130,
              120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130,
              120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130,
              120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130,
              120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130,
              120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130,
              120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130,
              120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130,
            ],
            type: "bar",
          },
        ],
        dataZoom: [
          {
            type: "slider",
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 15,
            textStyle: {
              color: "#ccd7d7",
            },
          },
        ],
        grid: {
          y2: 150,
        },
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
          formatter: (name) => {
            if (name.length > 7) {
              let res = name.slice(0, 7) + "...";
              // console.log(res);
              return res;
            } else {
              return name;
            }
            // console.log(params)
          },
          type: "scroll",
          orient: "vertical",
          right: 0,
          top: 40,
          bottom: 20,
        },
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            // console.log(params);
            let res = params[0].axisValueLabel;
            function getHtml(param) {
              let str =
                '<div style="float: left"><span style="background: ' +
                param.color +
                '; width: 11px; height: 11px; border-radius: 11px;float: left; margin: 5px 3px;"></span>' +
                param.seriesName +
                ":" +
                param.data +
                "&emsp;&emsp;</div>";
              return str;
            }
            let flag = false;
            res += '<div style="clear: both">';
            for (let i = 0; i < params.length; i++) {
              res += getHtml(params[i]);
              if (params.length > 11 && i % 2 == 1) {
                res += '</div><div style="clear: both">';
              }
              if (params.length <= 11) {
                res += '</div><div style="clear: both">';
              }
            }
            res += "</div>";
            return res;
          },
        },
      },
      demoLineOptions: {
        xAxis: {
          data: ["A", "B", "C", "D", "E"],
        },
        yAxis: {},
        series: [
          {
            name: "AA123123123AA123123123AA123123123AA123123123",
            data: [10, 22, 28, 43, 49],
            type: "line",
          },
          {
            name: "中文文件名测试长度",
            data: [5, 4, 3, 5, 10],
            type: "line",
          },
          {
            name: "CC",
            data: [22, 28, 43, 49, 11],
            type: "line",
          },
          {
            name: "DD",
            data: [3, 5, 10, 87, 3],
            type: "line",
          },
          {
            name: "EE",
            data: [12, , 10, 22, 28, 43],
            type: "line",
          },
          {
            name: "FF",
            data: [3, 5, 10, 87, 2],
            type: "line",
          },
          {
            name: "GG",
            data: [22, 28, 43, 49, 23],
            type: "line",
          },
          {
            name: "HH",
            data: [5, 4, 33, 5, 10],
            type: "line",
          },
          {
            name: "II",
            data: [28, 22, 21, 43, 49],
            type: "line",
          },
          {
            name: "JJ",
            data: [3, 5, 10, 6, 34],
            type: "line",
          },
          {
            name: "KK",
            data: [43, 49, 34, 21, 44],
            type: "line",
          },
          {
            name: "LL",
            data: [32, 21, 54, 23, 21],
            type: "line",
          },
          {
            name: "MM",
            data: [28, 43, 49, 54, 67],
            type: "line",
          },
          {
            name: "NN",
            data: [5, 12, 34, 5, 10],
            type: "line",
          },
          {
            name: "OO",
            data: [43, 49, 54, 56, 87],
            type: "line",
          },
          {
            name: "PP",
            data: [10, 34, 23, 54, 87],
            type: "line",
          },
          {
            name: "QQ",
            data: [10, 22, 28, 37, 45],
            type: "line",
          },
          {
            name: "RR",
            data: [5, 4, 3, 5, 10],
            type: "line",
          },
          {
            name: "SS",
            data: [10, 66, 44, 33, 49],
            type: "line",
          },
          {
            name: "TT",
            data: [23, 34, 12, 44, 10],
            type: "line",
          },
          {
            name: "UU",
            data: [10, 22, 28, 43, 49],
            type: "line",
          },
        ],
        legend: {
          formatter: (name) => {
            if (name.length > 7) {
              let res = name.slice(0, 7) + "...";
              // console.log(res);
              return res;
            } else {
              return name;
            }
            // console.log(params)
          },
          type: "scroll",
          orient: "vertical",
          right: 0,
          top: 40,
          bottom: 20,
          data: [
            "AA123123123AA123123123AA123123123AA123123123",
            "中文文件名测试长度",
            "CC",
            "DD",
            "EE",
            "FF",
            "GG",
            "HH",
            "II",
            "JJ",
            "KK",
            "LL",
            "MM",
            "NN",
            "OO",
            "PP",
            "QQ",
            "RR",
            "SS",
            "TT",
            "UU",
          ],
          // pageTextStyle: {
          //   width: 10,
          //   overflow: "truncate",
          //   // color: '#333'
          // },
        },
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            // console.log(params);
            let res = params[0].axisValueLabel;

            function getHtml(param) {
              let str =
                '<div style="float: left"><span style="background: ' +
                param.color +
                '; width: 11px; height: 11px; border-radius: 11px;float: left; margin: 5px 3px;"></span>' +
                param.seriesName +
                ":" +
                param.data +
                "&emsp;&emsp;</div>";
              return str;
            }

            let flag = false;
            res += '<div style="clear: both">';
            for (let i = 0; i < params.length; i++) {
              res += getHtml(params[i]);
              if (params.length > 11 && i % 2 == 1) {
                res += '</div><div style="clear: both">';
              }
              if (params.length <= 11) {
                res += '</div><div style="clear: both">';
              }
            }
            res += "</div>";
            return res;
          },
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
      counterChartAIns: {},
      echartsAMounted: false,
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
    refreshData() {
      // console.log(hasValue);
      if (this.echartsAMounted) {
        this.showLoadingA = true;
        this.getAllCounter();
      }
      if (this.echartsMounted) {
        this.showLoadingB = true;
        this.getCounterByDays();
      }

      this.alarmData = [];
      this.getAlarmAdmin();
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
            console.log(res);
            this.showLoadingA = false;
            let xAxisData = this.getKeys(res.data.data);
            let seriesData = this.getValues(res.data.data);
            // let number = 0;
            // seriesData.forEach((item) => {
            //   number += item;
            // });
            this.totalNumber = res.data.total;
            // console.log(number);
            // console.log(res.data);
            // this.$set(this.optionsAllCounter.xAxis[0], "data", xAxisData);
            // this.$set(this.optionsAllCounter.series[0], "data", seriesData);
            this.optionsAllCounter.xAxis[0].data = xAxisData;
            this.optionsAllCounter.series[0].data = seriesData;

            if (this.echartsAMounted) {
              this.counterChartAIns.dispose();
            }
            // demoBarOptions
            let dataZoom = {
              type: "slider",
              show: true,
              xAxisIndex: [0],
              start: 0,
              end: 15,
              textStyle: {
                color: "#ccd7d7",
              },
            };

            if (xAxisData.length > 20) {
              this.optionsAllCounter.dataZoom.push(dataZoom);
            }
            this.counterChartAIns = this.initChart(
              "chartA",
              this.optionsAllCounter
              // this.demoBarOptions
            );
            this.echartsAMounted = true;

            // console.log(this.counterChartAIns);
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
            let temp = [];
            //这里的i++,换成了i=i+8,循环开始
            // let arr = this.demoLineOptions.legend.data;
            let arr = this.lineOptions.legend.data;
            for (let i = 0; i < arr.length; i = i + 8) {
              //当判断i+8是否小于总数组的长度时，成立了就从（i,i+8）开始截取保存到res数组中，其实就是截取数组的前8个对象
              if (i + 8 < arr.length) {
                temp.push(arr.slice(i, i + 8));
              } else {
                //这里长度不足8的对象也保存在res数组中，截取i的长度
                temp.push(arr.slice(i));
              }
            }
            temp.forEach(function (item) {
              //八条对象的数组在后面添加你要添加的内容
              return item.length === 8 ? item.push("") : item;
            });
            //这里定义一个空数组，并用apply指向这个空数组，concat将多个数组合并成一个数组
            let result = [].concat.apply([], temp);
            // console.log(result);
            this.lineOptions.legend.data = result;

            this.echartsInstance = this.initChart(
              "chartB",
              this.lineOptions
              // this.demoLineOptions
              // temp
            );
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
      getAlarmAdmin().then(
        (res) => {
          if (res.errcode == 200) {
            let keys = this.getKeys(res.data);
            let values = this.getValues(res.data);
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
      font-size: 18px;
      .text-container {
        .text {
          font-size: 30px;
        }
      }
    }
  }
  .alarm-container {
    position: relative;
    width: 100%;
    .alarm-text {
      margin-bottom: 10px;
      text-align: center;
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
