<script setup>
import { getMergeConfig } from "@/api/home.js";
import { Document, SetUp, Clock } from "@element-plus/icons-vue";
let state = reactive({
  taskState: [],
  iconState: ["Document", "SetUp", "Clock", "Edit", "Box"],
  dateState: {
    start: "",
    end: "",
  },
});
getMergeConfig().then(
  (res) => {
    state.taskState = res;
    // console.log(state.taskState);
  },
  (err) => {
    console.log(err);
  }
);
const activeNames = ref(["1"]);
const handleChange = (val) => {
  // console.log(val);
};
</script>

<template>
  <div>
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in state.taskState"
          :key="index"
          :timestamp="item.timestamp"
          placement="top"
        >
          <el-card shadow="hover">
            <h4>{{ item.project }}</h4>
            <div>
              <el-collapse
                v-for="(item2, index2) in item.tag"
                :key="index2"
                v-model="activeNames"
                @change="handleChange"
              >
                <el-collapse-item>
                  <template #title>
                    batch {{ item2.batch }} {{ item2.intro }}
                    <el-icon v-for="num in item2.category_nums">
                      <component :is="state.iconState[num]" />
                    </el-icon>
                  </template>
                  <div>
                    任务描述：{{ item2.desc }}
                  </div>
                  <div>
                    <span
                      >起止时间：{{ item2.start_time }} -
                      {{ item2.end_time }}</span
                    >
                  </div>
                  <div>
                    <span>工具：{{ item2.tools }}</span>
                    <span> 工具路径：<a :href="item2.tools_path" target="blank">{{ item2.tools_path }}</a> </span>
                  </div>
                  <div></div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  width: 20px;
  height: 20px;
  color: rebeccapurple;
}
</style>