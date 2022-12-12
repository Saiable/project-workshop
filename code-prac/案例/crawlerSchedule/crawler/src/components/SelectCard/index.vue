<template>
  <div class="select-card-container">
    <el-select
      v-model="dataSelectValue"
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
</template>
<script>
export default {
  name: "SelectCard",
  data() {
    return {
      dataSelectValue: '7',
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
    };
  },
  // props: {
  //   selectValue: String,
  //   default: "7",
  // },
  methods: {
    selectChange(val) {
      // console.log(this.dataSelectValue);
      this.$emit("selectGetValue", val);
      this.$emit("selectChange");
      //   this.getCounterByDays(val);
    },

  },
};
</script>
<style lang="less" scoped>

</style>
