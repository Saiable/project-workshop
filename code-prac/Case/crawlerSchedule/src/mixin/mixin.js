export const mixin1 = {
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
      let myChart = this.$echarts.init(this.$refs[ref], null, {
        renderer: "svg",
      });
      myChart.setOption(options);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
      return myChart;
    },
    getGridTop(legendData) {
      var DEFAULT_LINE_NUM = 6; // 采用默认grid.top值的默认线条数目；
      var DEFAULT_GRID_TOP_PECENTAGE = 18; // 默认的grid.top百分比（整数部分）；
      var DELTA_GRID_TOP_PECENTAGE = 5; // 超出默认线条数时的grid.top百分比增量（整数部分）；
      var MAX_GRID_TOP_PECENTAGE = 60; // 最大的grid.top百分比（整数部分）；
      var LINE_NUM_EACH_ROW = 5;
      var topInt;
      var gridTop;
      var len = legendData.length;

      // 如果图例太多，需要调整option中的grid.top值才能避免重叠
      topInt = len > DEFAULT_LINE_NUM
          ? DEFAULT_GRID_TOP_PECENTAGE
          + DELTA_GRID_TOP_PECENTAGE * (Math.ceil((len - DEFAULT_LINE_NUM) / LINE_NUM_EACH_ROW))
          : DEFAULT_GRID_TOP_PECENTAGE;

      if (topInt >= MAX_GRID_TOP_PECENTAGE) {
        topInt = MAX_GRID_TOP_PECENTAGE;
      }

      gridTop = topInt + "%";
      console.log(gridTop)
      return gridTop;
    },
    getGridByHeight(legendData) {
      // console.log(legendData)
      let str = legendData.join('')
      let n = Math.ceil( str.length / 70)
      let res = (n* 2) + '%'
      // console.log(res)
      return [n, res]
    },
  },
};
