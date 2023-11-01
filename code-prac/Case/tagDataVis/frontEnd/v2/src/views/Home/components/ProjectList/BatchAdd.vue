<script setup>
import { projectIdCheckApi, addBatchApi } from "@/api/home.js";
const addProjectFormRef = ref();

const batchAddState = reactive({
  visible: ref(false),
  form: reactive({
    project_id: "",
    project_batch_id: "",
    intro: "",
    description: "",
    start_time: "",
    end_time: "",
    tools: "",
    tools_path: "",
    tag_related_files: "",
    file_type: "",
    file_number: 0,
    category_nums: "",
    solved: "",
    source_file_path: "",
    tag_result_path: "",
    backup_name: "",
  }),
});
const getBatchListProp = inject('getBatchListProp')

const props = defineProps(["project_id"]);
// console.log(props.project_id)
const addProjectRules = reactive({
  project_id: {
    validator: addProjectIdCheck,
    trigger: "blur",
  },
});
function projectAdd() {
  batchAddState.visible = true;
}
function handleAddClose() {
  batchAddState.visible = false;
}
// 新增项目时，对project_id进行前端校验，需为4位数字。

function addProjectIdLengthCheck(project_id) {
  const pattern = /^\d{4}$/; // 正则表达式，表示4位数字
  if (pattern.test(project_id)) {
    // 输入为4位数字
    return true;
  } else {
    // 输入不符合要求
    return false;
  }
}

function addProjectIdCheck(rule, value, callback) {
  if (value == "") {
    callback(new Error("项目编码不能为空"));
  }
  if (!addProjectIdLengthCheck(value)) {
    callback(new Error("项目编码需为4位数字"));
  } else {
    projectIdCheckApi({ project_id: value }).then(
      (res) => {
        console.log(res);
        if (res.data.exists) {
          callback(new Error(res.message));
        } else {
          callback();
        }
      },
      (error) => {
        callback(new Error("后台校验接口错误"));
        reject(error);
      }
    );
  }
}

function comfirmAddBatch(formEl) {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // 表单校验通过，构造数据发送请求
      let data = {
        project_id: props.project_id,
        project_batch_id: batchAddState.form.project_batch_id,
        intro: batchAddState.form.intro,
        description: batchAddState.form.description,
        start_time: batchAddState.form.start_time,
        end_time: batchAddState.form.end_time,
        tools: batchAddState.form.tools,
        tools_path: batchAddState.form.tools_path,
        tag_related_files: batchAddState.form.tag_related_files,
        file_type: batchAddState.form.file_type,
        file_number: batchAddState.form.file_number,
        category_nums: batchAddState.form.category_nums,
        solved: batchAddState.form.solved,
        source_file_path: batchAddState.form.source_file_path,
        tag_result_path: batchAddState.form.tag_result_path,
        backup_name: batchAddState.form.backup_name,
      };
      console.log(data);
      addBatchApi(data).then(
        (res) => {
          batchAddState.visible = false;
          console.log(res);

          // 更新列表数据源
          getBatchListProp()

          ElMessage({
            message: '任务新增成功',
            type: 'success',
          })
        },
        (error) => {
          reject(error);
          ElMessage.error('任务新增失败')
        }
      );
    } else {
      batchAddState.visible = true;
    }
  });
}
</script>

<template>
  <div>
    <el-button type="primary" @click="projectAdd()">新增任务</el-button>
    <el-dialog
      v-model="batchAddState.visible"
      title="新增任务"
      width="60%"
      :before-close="handleAddClose"
    >
      <el-form
        :model="batchAddState.form"
        label-width="140px"
        status-icon
        ref="addProjectFormRef"
        :inline="false"
        label-position="right"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="任务编码" prop="project_batch_id">
              <el-input v-model="batchAddState.form.project_batch_id" />
            </el-form-item>
            <el-form-item label="是否解决" prop="solved">
              <el-input v-model="batchAddState.form.solved" />
            </el-form-item>
            
            <el-form-item label="使用工具" prop="tools">
              <el-input v-model="batchAddState.form.tools" />
            </el-form-item>
            <el-form-item label="工具路径" prop="tools_path">
              <el-input v-model="batchAddState.form.tools_path" />
            </el-form-item>
            <el-form-item label="相关文件" prop="tag_related_files">
              <el-input v-model="batchAddState.form.tag_related_files" />
            </el-form-item>
            <el-form-item label="文件类型" prop="file_type">
              <el-input v-model="batchAddState.form.file_type" />
            </el-form-item>
            <el-form-item label="文件数量" prop="file_number">
              <el-input v-model="batchAddState.form.file_number" />
            </el-form-item>
            <el-form-item label="任务类型" prop="category_nums">
              <el-input v-model="batchAddState.form.category_nums" />
            </el-form-item>
            <el-form-item label="标注结果文件路径" prop="tag_result_path">
              <el-input v-model="batchAddState.form.tag_result_path" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务简介" prop="intro">
              <el-input v-model="batchAddState.form.intro" type="textarea" />
            </el-form-item>
            <el-form-item label="任务详情" prop="description">
              <el-input
                v-model="batchAddState.form.description"
                type="textarea"
                :rows="7"
              />
            </el-form-item>
            <el-form-item label="开始时间" prop="start_time">
              <!-- <el-input v-model="state.form.projectAdd.timestamp" /> -->
              <el-date-picker
                v-model="batchAddState.form.start_time"
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
                v-model="batchAddState.form.end_time"
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>

            <el-form-item label="工作文件路径" prop="source_file_path">
              <el-input v-model="batchAddState.form.source_file_path" />
            </el-form-item>

            <el-form-item label="备份文件路径" prop="backup_name">
              <el-input v-model="batchAddState.form.backup_name" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleAddClose()">取消</el-button>
          <el-button type="primary" @click="comfirmAddBatch(addProjectFormRef)">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>