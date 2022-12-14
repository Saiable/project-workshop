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
  },
};
