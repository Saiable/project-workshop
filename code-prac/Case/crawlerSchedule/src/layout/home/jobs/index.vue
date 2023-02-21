<template>
  <div class="container">
    <Header :name="name" @refreshData="refreshData" />

    <div class="outer">
      <div class="outer-container">
        <div class="header">
          <i class="iconfont icon-jihuatiaodu"></i>
          任务
        </div>
        <div class="control">
          <div class="group">
            <!-- 暂时不需要细分控制每个按钮的状态 -->
            <!-- <li class="item" :class="limited.start"> -->
            <button class="item" data-item="start" @click="handleStart">
              <i class="iconfont icon-daochu1024-15"></i>
              <span>开启</span>
            </button>
            <!-- <li class="item" :class="limited.stop" @click="stopJobs"> -->
            <button class="item" data-item="stop" @click="handleStop">
              <i class="iconfont icon-lujing"></i>
              <span>停止</span>
            </button>
            <!-- <li class="item" :class="limited.restart"> -->
            <button class="item" data-item="restart" @click="handleRestart">
              <i class="iconfont icon-shuaxin1"></i>
              <span>重启</span>
            </button>
            <li class="input">
              <el-input
                v-model="intervalsInput"
                placeholder="间隔s"
                title="间隔s"
                clearable
                style="width: 100px"
                size="mini"
                @blur="checkNumberInput"
                @clear="clearNumberInput"
              ></el-input>
            </li>
            <!-- <li class="item" :class="limited.pause"> -->
            <li class="item" v-show="false">
              <i class="iconfont icon-zanting"></i>
              <span>Pause</span>
            </li>
            <!-- <li class="item" :class="limited.resume"> -->
            <li class="item" v-show="false">
              <i class="iconfont icon-daochu1024-15"></i>
              <span>Resume</span>
            </li>
            <!-- <li class="item" :class="limited.remove"> -->
            <li class="item" v-show="false">
              <i class="iconfont icon-shanchu"></i>
              <span>Remove</span>
            </li>
          </div>
          <div class="item item-add" v-show="false">
            <i class="iconfont icon-add"></i>
            <span>Add Jobs</span>
          </div>
        </div>
        <div class="search">
          <i class="iconfont icon-sousuotianchong" @click="inputChange"></i>
          <input
            type="text"
            class="search-input"
            placeholder="Search ..."
            v-model="searchInput"
            @keyup.enter="inputChange"
            @keyup.esc="clearInput"
          />
        </div>
        <div class="list">
          <template v-if="!allSpiderDataCopy.length">
            <div class="loading"></div>
          </template>
          <template v-else>
            <el-table
              ref="multipleTable"
              :data="allSpiderData"
              style="width: 100%"
              stripe
              max-height="730"
              @selection-change="handleSelectionChange"
              :default-sort="{ prop: 'job_id', order: 'descending' }"
              @expand-change="handleExpandChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column
                prop="job_id"
                label="任务ID"
                sortable
              ></el-table-column>
              <el-table-column
                prop="job_name"
                label="任务名称"
              ></el-table-column>
              <el-table-column
                prop="job_chinese_name"
                label="任务中文名"
                sortable
              ></el-table-column>
              <el-table-column
                prop="executor"
                label="executor"
              ></el-table-column>
              <el-table-column
                prop="next_run_time"
                label="下轮运行时间"
                sortable
              ></el-table-column>
              <el-table-column prop="is_running" label="运行状态" sortable>
                <template slot-scope="scope">
                  <i
                    class="iconfont icon-pachong"
                    :style="{
                      color: scope.row.is_running ? '#5cb85c' : '#d9534f',
                      fontSize: '20px',
                    }"
                  ></i>
                </template>
              </el-table-column>
              <el-table-column prop="is_scheduling" label="调度状态" sortable>
                <template slot-scope="scope">
                  <i
                      class="iconfont icon-renwutiaodu"
                      :style="{
                      color: scope.row.is_scheduling ? '#ccb84c' : '#8c8383',
                      fontSize: '20px',
                    }"
                  ></i>
                </template>
              </el-table-column>
              <el-table-column type="expand" width="55">
                <template slot-scope="props">
                  <!-- <span>{{ props.row}}</span> -->
                  <div class="loading" v-show="!singleBarX.length"></div>
                  <div class="expand-container">
                    <SelectCard
                      class="select-card"
                      @selectGetValue="selectGetValue"
                      @selectChange="selectChange(props.row)"
                    />
                    <div
                      class="expand-chart"
                      style="width: 100%; height: 300px"
                      :ref="props.row.job_id"
                      v-show="singleBarX.length"
                    ></div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getAllAdmin,
  getCounterByName,
  addSpider,
  deleteSpider,
} from "@/api/crawler.js";
import Header from "@/components/Header/index.vue";
import SelectCard from "@/components/SelectCard/index.vue";
import throttle from "lodash/throttle";

export default {
  name: "Jobs",
  data() {
    return {
      name: "任务列表",
      allSpiderData: [],
      allSpiderDataCopy: [], // 数据副本，用作搜索数据恢复
      multipleSelection: [],
      // limited: {
      //   start: "green-pale",
      //   stop: "red-pale",
      //   restart: "blue-pale",
      //   pause: "blue-pale",
      //   resume: "blue-pale",
      //   remove: "red-pale",
      // },
      singleBarX: [],
      singleBarY: [],
      status: {
        start: false,
        stop: false,
        restart: false,
        pause: false,
        resume: false,
        remove: false,
      },
      expandStatus: {},
      selectValue: {},
      isExpend: false,
      echartInstance: {},
      defaultInterval: "3600", // 不会被操作
      intervalsInput: "3600",
      searchInput: "",
    };
  },
  watch: {
    searchInput(newValue) {
      if (newValue == "") {
        this.allSpiderData = this.allSpiderDataCopy;
      }
    },
    // 暂时不需要细分控制各按钮的状态
    // multipleSelection: {
    //   deep: true, // 开启深度监视
    //   handler(newValue, oldValue) {
    //     // console.log(newValue, oldValue);
    //     if (newValue.length) {
    //       this.limited.stop = "";
    //       this.limited.restart = "";
    //       this.limited.remove = "";
    //       this.limited.pause = "";
    //       this.status.stop = true;
    //       this.status.restart = true;
    //       this.status.remove = true;
    //       this.status.pause = true;
    //     } else {
    //       this.limited.stop = "red-pale";
    //       this.limited.restart = "blue-pale";
    //       this.limited.remove = "red-pale";
    //       this.limited.pause = "blue-pale";
    //       this.status.stop = false;
    //       this.status.restart = false;
    //       this.status.remove = false;
    //       this.status.pause = false;
    //     }
    //   },
    // },
  },
  components: {
    Header,
    SelectCard,
  },
  methods: {
    refreshData() {
      this.intervalsInput = this.defaultInterval;
      this.getAllAdmin();
      this.clearInput()
    },
    // 获取所有的爬虫Jobs列表
    getAllAdmin() {
      getAllAdmin().then(
        (res) => {
          // console.log(res);
          if (res.data) {
            this.allSpiderData = res.data;
            this.allSpiderDataCopy = res.data;
          } else {
            this.$message({
              message: "数据获取失败",
              type: "error",
            });
          }
        },
        (err) => {
          console.log(err);
          this.$message({
            message: "数据获取失败",
            type: "error",
          });
        }
      );
    },
    // 获取单个爬虫的历史数据
    getCounterByName(name, nums = 7, target) {
      // if (this.singleBarX.length == 0) {
      getCounterByName(name, nums).then(
        (res) => {
          if (res.data) {
            // console.log(res.data);
            let value = res.data[name];
            this.singleBarX = this.getKeys(value);
            this.singleBarY = this.getValues(value);
            // resolve([this.singleBarX, this.singleBarY])
            setTimeout(() => {
              let barOption = {
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
              };
              // console.log(this.singleBarX, this.singleBarY);
              if (this.singleBarX.length > 0) {
                barOption.xAxis[0].data = this.singleBarX;
                barOption.series[0].data = this.singleBarY;

                this.echartInstance[target] = this.initChart(target, barOption);
              }
            }, 0);
          } else {
            this.$message({
              message: "数据获取失败",
              type: "error",
            });
          }
        },
        (err) => {
          console.log(err);
          this.$message({
            message: "数据获取失败",
            type: "error",
          });
        }
      );
      // }
    },
    // 开启爬虫
    addSpider(data) {
      addSpider(data).then(
        (res) => {
          // console.log(res);
          if (res.errcode == 200) {
            this.$message({
              message: "操作成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "操作失败",
              type: "error",
            });
          }
        },
        (err) => {
          console.log(err);
          this.$message({
            message: "操作失败",
            type: "error",
          });
        }
      );
    },
    // 停止爬虫
    deleteSpider(data) {
      deleteSpider(data).then(
        (res) => {
          // console.log(res);
          if (res.errcode == 200) {
            this.$message({
              message: "操作成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "操作失败",
              type: "error",
            });
          }
        },
        (err) => {
          console.log(err);
          this.$message({
            message: "操作失败",
            type: "error",
          });
        }
      );
    },
    // 重启爬虫
    restartSpider(data) {
      deleteSpider(data)
        .then((res) => {
          if (res.errcode == 200) {
            addSpider(data).then((res2) => {
              if (res2.errcode == 200) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                });
                this.refreshData();
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "操作失败",
            type: "error",
          });
        });
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection);
      // console.log(this.multipleSelection);
    },
    handleExpandChange(row, rows) {
      let isExpend = rows.some((r) => r.job_id === row.job_id);
      this.isExpend = isExpend;
      let name = row.job_chinese_name,
        target = row.job_id,
        nums = 7;

      if (isExpend) {
        // if (this.singleBarX.length == 0) {
        // }
        this.getCounterByName(name, nums, target);

        // setTimeout(() => {}, 100);
      } else {
        this.echartInstance[target].dispose();
      }

      // console.log(barOption);
      // console.log(isExpend,'isExpend')
    },
    selectGetValue(val) {
      // console.log(val);
      this.selectValue.nums = val;
      // this.selectValue = val;
    },
    selectChange(valParenet) {
      // console.log(valParenet);
      this.selectValue.name = valParenet.job_chinese_name;
      this.selectValue.target = valParenet.job_id;
      // console.log(this.selectValue)
      let { name, nums, target } = this.selectValue;
      console.log(name, nums, target);
      this.echartInstance[target].dispose();
      this.getCounterByName(name, nums, target);
    },
    handleControl() {
      if (this.multipleSelection.length) {
        return this.multipleSelection.map((item) => {
          return item.job_chinese_name;
        });
      }
    },
    handleStart() {
      let name = this.handleControl();
      if (name) {
        // console.log(name);

        let data = {
          py_names: name,
          intervals: this.intervalsInput || this.defaultInterval,
        };
        this.addSpider(data);
        this.refreshData();
      }
    },
    handleStop() {
      let name = this.handleControl();
      if (name) {
        // console.log(name);

        let data = {
          py_names: name,
          intervals: this.intervalsInput || this.defaultInterval,
        };
        this.deleteSpider(data);
        this.refreshData();
      }
    },
    handleRestart() {
      let name = this.handleControl();
      if (name) {
        // console.log(name);

        let data = {
          py_names: name,
          intervals: this.intervalsInput || 0,
        };
        this.restartSpider(data);
      }
    },
    checkNumberInput() {
      if (this.intervalsInput >= 0) {
        // console.log("输入合法");
        return;
      } else {
        this.$message({
          message: "请输入正数，默认间隔为3600s",
          type: "error",
        });
        this.intervalsInput = this.defaultInterval;
        return;
      }
    },
    clearNumberInput() {
      this.intervalsInput = ""; // 空串转为数字，是0
      this.checkNumberInput();
    },
    inputChange() {
      let arg = this.searchInput;
      let filter = this.allSpiderDataCopy.filter((item, index, arr) => {
        if (
          item.job_chinese_name.indexOf(arg) > -1 ||
          item.job_id.indexOf(arg) > -1
        ) {
          return item;
        }
      });
      if (filter.length == 0) {
        this.allSpiderData = [];
        this.$message({
          message: "搜索结果为空",
          type: "warn",
        });
        return;
      } else {
        this.allSpiderData = filter;
        this.$message({
          message: "搜索成功",
          type: "success",
        });
      }
      if (arg.length == 0) {
        this.allSpiderData = this.allSpiderDataCopy;
      }
    },
    clearInput() {
      if (this.searchInput) {
        this.searchInput = "";
      }
    },
  },
  mounted() {
    this.getAllAdmin();
  },
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;

  .outer {
    position: relative;
    width: 100%;
    padding-right: 10px;
    margin-top: 24px;
    .outer-container {
      position: absolute;
      left: 24px;
      width: calc(100vw - 300px);
      box-shadow: 0px 0px 2px 1px rgba(95, 94, 94, 0.2);
    }
    .header {
      height: 45px;
      padding: 0 20px;
      background-color: #f3f3f3;
      font-size: 20px;
      line-height: 45px;
      color: #767676;
      .iconfont {
        font-size: 16px;
      }
    }
    .control {
      //   display: flex;
      position: relative;
      height: 50px;
      width: 100%;
      line-height: 50px;
      background-color: #fff;
      padding: 0 20px;
      border-bottom: 1px solid rgba(190, 190, 190, 0.575);

      .group {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        // padding: 0;
        // list-style: none;

        display: flex;
        // float: left;
        // width: 210px;
        height: 28px;
        line-height: 28px;
        .item {
          border: none;
          outline: none;
          // width: 70px;
          padding: 0 8px;
          color: #fff;
          .iconfont {
            margin-right: 4px;
          }
        }
        .input {
          margin-left: 10px;
        }

        .item:nth-child(1) {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          background-color: #5cb85c;
          cursor: pointer;
        }
        .item:nth-child(2) {
          background-color: #d9534f;
          cursor: pointer;
        }
        .item:nth-child(3) {
          background-color: #337ab7;
          cursor: pointer;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
        .item:nth-child(4) {
          background-color: #337ab7;
          cursor: pointer;
        }
        .item:nth-child(5) {
          background-color: #337ab7;
        }
        .item:nth-child(6) {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          background-color: #d9534f;
          cursor: pointer;
        }
        .item.green-pale {
          background-color: #a2d8a2;
          cursor: auto;
        }
        .item.red-pale {
          background-color: #c7918f;
          cursor: auto;
        }
        .item.blue-pale {
          background-color: #88aac9;
          cursor: auto;
        }
      }

      .item-add {
        // float: right;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 28px;
        padding: 0 8px;
        margin-right: 20px;
        line-height: 28px;
        background-color: #337ab7;
        border-radius: 4px;
        color: #fff;
        .iconfont {
          margin-right: 4px;
        }
      }
    }
  }
  .search {
    display: flex;
    height: 38px;
    line-height: 38px;
    padding: 0 24px;
    background-color: #fff;
    border-bottom: 1px solid rgba(190, 190, 190, 0.575);

    .search-input {
      width: 100%;
      background-color: #fff;
      margin-left: 5px;
      border: none;
      outline: none;
      letter-spacing: 1px;
      font-size: 18px;
    }
  }
  .list {
    position: relative;
    height: 730px;
    background-color: #fff;
    .expand-container {
      position: relative;
      .select-card {
        position: absolute;
        top: 10px;
        right: 18px;
        z-index: 99;
      }
      .expand-chart {
        padding: 15px;
      }
    }
  }
}
</style>