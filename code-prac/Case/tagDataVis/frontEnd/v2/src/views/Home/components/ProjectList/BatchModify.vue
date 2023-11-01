<script setup>
import { batchUpdateApi } from "@/api/home.js";

const props = defineProps(["batchListGenState", "project_batch_id", "project_id"]);

let innerState = props.batchListGenState
//确认修改项目
function summitPerModify(batchItem) {
  batchItem.visible = false;
  // 构造请求参数
  let data = {
    id: batchItem.form.id,
    project_batch_id: batchItem.form.project_batch_id || "", // 如果库中为null，则前端中的key根本就不展示，需要给个空串
    intro: batchItem.form.intro || "",
    description: batchItem.form.description || "",
    start_time: batchItem.form.start_time || "",
    end_time: batchItem.form.end_time || "",
    tools: batchItem.form.tools || "",
    tools_path: batchItem.form.tools_path || "",
    tag_related_files: batchItem.form.tag_related_files || "",
    file_type: batchItem.form.file_type || "",
    file_number: batchItem.form.file_number || 0,
    category_nums: batchItem.form.category_nums || "",
    solved: batchItem.form.solved || "",
    source_file_path: batchItem.form.source_file_path || "",
    tag_result_path: batchItem.form.tag_result_path || "",
    backup_name: batchItem.form.backup_name || "",
  };

  batchUpdateApi(data).then(
    (res) => {
      console.log(res);
      // getProjectListProp();
    },
    (error) => {
      reject(error);
    }
  );
}
function cancelModify(batchItem) {
  batchItem.visible = false
}
</script>
<template>
  <div v-for="batchItem in innerState">
      <!-- [{{batchItem.project_batch_id  }},  {{props.project_batch_id}},    {{batchItem.form.project_id }},  {{props.project_id}}] -->
    <div v-if="batchItem.project_batch_id == props.project_batch_id && batchItem.form.project_id == props.project_id">
      <el-button type="primary" @click="batchItem.visible = true">修改任务{{ props.project_batch_id}}</el-button>
    <el-dialog
      v-model="batchItem.visible"
      title="修改任务"
      width="60%"
    >
      <el-form
        :model="batchItem.form"
        label-width="140px"
        status-icon
        ref="addProjectFormRef"
        :inline="false"
        label-position="right"
      >
      <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="任务编码" prop="project_batch_id">
              <el-input v-model="batchItem.form.project_batch_id" />
            </el-form-item>
            <el-form-item label="是否解决" prop="solved">
              <el-input v-model="batchItem.form.solved" />
            </el-form-item>
            
            <el-form-item label="使用工具" prop="tools">
              <el-input v-model="batchItem.form.tools" />
            </el-form-item>
            <el-form-item label="工具路径" prop="tools_path">
              <el-input v-model="batchItem.form.tools_path" />
            </el-form-item>
            <el-form-item label="相关文件" prop="tag_related_files">
              <el-input v-model="batchItem.form.tag_related_files" />
            </el-form-item>
            <el-form-item label="文件类型" prop="file_type">
              <el-input v-model="batchItem.form.file_type" />
            </el-form-item>
            <el-form-item label="文件数量" prop="file_number">
              <el-input v-model="batchItem.form.file_number" />
            </el-form-item>
            <el-form-item label="任务类型" prop="category_nums">
              <el-input v-model="batchItem.form.category_nums" />
            </el-form-item>
            <el-form-item label="标注结果文件路径" prop="tag_result_path">
              <el-input v-model="batchItem.form.tag_result_path" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务简介" prop="intro">
              <el-input v-model="batchItem.form.intro" type="textarea" />
            </el-form-item>
            <el-form-item label="任务详情" prop="description">
              <el-input
                v-model="batchItem.form.description"
                type="textarea"
                :rows="7"
              />
            </el-form-item>
            <el-form-item label="开始时间" prop="start_time">
              <!-- <el-input v-model="state.form.projectAdd.timestamp" /> -->
              <el-date-picker
                v-model="batchItem.form.start_time"
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>
            <el-form-item label="结束时间" prop="end_time">
              <!-- <el-input v-model="state.form.projectAdd.timestamp" /> -->
              <el-date-picker
                v-model="batchItem.form.end_time"
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>

            <el-form-item label="工作文件路径" prop="source_file_path">
              <el-input v-model="batchItem.form.source_file_path" />
            </el-form-item>

            <el-form-item label="备份文件路径" prop="backup_name">
              <el-input v-model="batchItem.form.backup_name" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelModify(batchItem)">取消</el-button>
          <el-button
            type="primary"
            @click="summitPerModify(batchItem)"
          >
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
    </div>

  </div>
</template>