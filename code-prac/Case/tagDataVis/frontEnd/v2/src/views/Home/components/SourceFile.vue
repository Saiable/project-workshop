<script setup>
import { getMergeConfig } from "@/api/home.js";
import {
  Document,
  SetUp,
  Clock,
} from "@element-plus/icons-vue";
let sourceData = reactive([]);
let sourceFileData = reactive([]);

getMergeConfig().then((res) => {
  res.map((item, index) => {
    sourceData.push(item["file"]);
  });

  for (let i in sourceData) {
    for (let j in sourceData[i]) {
      sourceFileData.push(sourceData[i][j]);
    }
  }
});
</script>

<template>
  <el-space wrap>
    <el-card
      v-for="(item, index) in sourceFileData"
      :key="index"
      class="box-card"
      shadow="hover"
    >
      <el-descriptions :title="item.project" :column="4" border>
        <el-descriptions-item label="源文件名称">
          <template #label>
            <div class="cell-item">
              <el-icon><Document /></el-icon>
              源文件名称
            </div> </template
          >{{ item.filename }}
        </el-descriptions-item>
        <el-descriptions-item label="源文件来源">
          <template #label>
            <div class="cell-item">
                <el-icon><SetUp /></el-icon>
                源文件来源
            </div> </template
          >{{ item.file_origin }}</el-descriptions-item
        >
        <el-descriptions-item label="获取时间"><template #label>
            <div class="cell-item">
                <el-icon><Clock /></el-icon>
                获取时间
            </div> </template
          >{{
          item.get_file_time
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </el-space>
</template>

<style lang="scss" scoped>
.box-card {
  cursor: pointer;
}
.cell-item {
  display: flex;
  align-items: center;
}
</style>