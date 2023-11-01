<script setup>
import { getMergeConfig } from "@/api/home.js";
let state = reactive({
  backupState: [],
  tableData: []
});
getMergeConfig().then(
  (res) => {
    for(let i in res) {
      // console.log(res[i]['tag'])
      for(let j in res[i]['tag']) {
        const externalData = res[i]['tag'][j]['external_data'][0]
        externalData['backup_name'] = externalData['backup_name'].split('/').pop()

        state.tableData.push(externalData)
        state.tableData = state.tableData.filter(item => {
          return item['backup_name'] !== ''
        })
      }
    }
    // console.log(state.tableData)
  },
  (err) => {
    console.log(err);
  }
);

</script>

<template>
  <el-table :data="state.tableData" style="width: 100%">
    <el-table-column prop="backup_name" label="备份文件名" width="180" />
    <el-table-column prop="source_file_path" label="工作文件路径"/>
    <el-table-column prop="tag_result_path" label="结果文件路径" />
  </el-table>
</template>
  
