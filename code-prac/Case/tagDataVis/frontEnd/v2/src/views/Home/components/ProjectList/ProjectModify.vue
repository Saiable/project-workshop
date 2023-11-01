<script setup>
import { projectUpdateApi } from "@/api/home.js";

const props = defineProps(["item", "index"]);
const getProjectListProp = inject('getProjectListProp')

let innerState = props.item
//确认修改项目
function summitPerModify() {
  innerState.visible = false;
  // 构造请求参数
  let data = {
    id: innerState.form.id,
    project_id: innerState.form.project_id || "", // 如果库中为null，则前端中的key根本就不展示，需要给个空串
    name: innerState.form.name || "",
    description: innerState.form.description || "",
    timestamp: innerState.form.timestamp || "",
  };

  projectUpdateApi(data).then(
    (res) => {
      console.log(res);
      getProjectListProp();
    },
    (error) => {
      reject(error);
    }
  );
}
function cancelModify() {
  innerState.visible = false
}
</script>
<template>
  <div>
    <el-button type="primary" @click="innerState.visible = true"
      >修改项目</el-button
    >
    <el-dialog v-model="innerState.visible" title="修改项目" width="30%">
      <el-form :model="innerState.form" label-width="120px">
        <el-form-item label="项目编码">
          <el-input v-model="innerState.form.project_id" disabled />
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="innerState.form.name" />
        </el-form-item>
        <el-form-item label="项目时间">
          <!-- <el-input v-model="innerState.form.timestamp" /> -->
          <el-date-picker
            v-model="innerState.form.timestamp"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input
            v-model="innerState.form.description"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelModify()">取消</el-button>
          <el-button type="primary" @click="summitPerModify()">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>