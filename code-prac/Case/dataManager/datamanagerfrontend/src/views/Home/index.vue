<template>
  <div class="home">
    <div class="header">
      <el-row>
        <el-col :span="4">
          <div>语料管理</div>
        </el-col>
        <el-col :span="16">
          <div></div>
        </el-col>
        <el-col :span="4">
          <div>新增记录</div>
        </el-col>
      </el-row>
    </div>

    <div class="content">
      <el-table :data="logData" style="width: 100%">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="task" label="task" width="180" />
        <el-table-column prop="desc" label="描述" />
        <el-table-column prop="tagPath" label="前台标注路径" />
        <el-table-column prop="dataPath" label="后台数据路径" />
        <el-table-column prop="backup.fileName" label="备份" />
      </el-table>
    </div>
  </div>
</template>

<script>
import LogData from "@/log/log.json";
export default {
  data() {
    return {
      logData: LogData,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>