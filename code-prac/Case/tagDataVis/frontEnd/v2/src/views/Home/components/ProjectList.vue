<script setup>
import { Document, SetUp, Clock } from "@element-plus/icons-vue";
import ProjectAdd from "./ProjectList/ProjectAdd.vue";
import ProjectShow from "./ProjectList/ProjectShow.vue";

import {
  getProjectListApi,
  batchListApi,
} from "@/api/home.js";

let state = reactive({
  taskState: [],
  taskGenState: [],
  batchListState: [],
  batchListGenState: [],
  iconState: ["Document", "SetUp", "Clock", "Edit", "Box"],
  dateState: {
    start: "",
    end: "",
  },
});
// 基于服务器数据，为适配element数据格式，重新生成了一份
function _generateFormState() {
  state.taskGenState = [] // 置空是为了解决：修改项目更新数据时，报key重复的问题
  for (let i = 0; i < state.taskState.length; i++) {
    let item = {
      id: state.taskState[i].id,
      visible: false, // 用作控制修改组件中的dialog的显隐
      timestamp: state.taskState[i].timestamp, // 用作el-timeline排序
      form: state.taskState[i],
    };
    state.taskGenState.push(item);
  }
  // 对时间进行降序
  state.taskGenState.sort(function (a, b) {
    return a.timestamp < b.timestamp ? 1 : -1;
  })

}

// 获取所有的项目， 同时基于服务器数据， 为适配element数据格式， 重新生成了一份
function getProjectList() {
  getProjectListApi().then(
    (res) => {
      // console.log(res);
      if (res.code == 200) {
        state.taskState = res.data;
        _generateFormState();
      }
    },
    (err) => {
      console.log(err);
      // reject(err);
    }
  );
}
getProjectList();
provide('getProjectListProp',getProjectList)


function _generateBatchListFormState() {
  for (let i = 0; i < state.batchListState.length; i++) {
    let item = {
      id: state.batchListState[i].id,
      visible: ref(false),
      project_batch_id: state.batchListState[i].project_batch_id,
      form: state.batchListState[i],
    };
    state.batchListGenState.push(item);
  }
}

// 获取batch_list
function batchList() {
  batchListApi().then(res => {
    // console.log(res)
    if(res.code == 200) {
      state.batchListState = res.data
      _generateBatchListFormState()
      // console.log(state.batchListGenState)
    }
  }, error => {
    reject(error)
  })
}
batchList()
provide('batchListGenState', state.batchListGenState)
provide('getBatchListProp',batchList)


</script>

<template>
  <div>
    <div class="project-manage">
      <ProjectAdd />
    </div>
    <ProjectShow :taskGenStateProp="state.taskGenState"/>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  width: 20px;
  height: 20px;
  color: rebeccapurple;
}

.project-manage {
  :deep(.el-row) {
    margin: 5px 0 10px 14px;
  }
}


</style>