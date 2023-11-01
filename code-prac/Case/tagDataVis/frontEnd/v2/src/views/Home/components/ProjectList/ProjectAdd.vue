<script setup>
import { projectIdCheckApi, addProjectApi } from "@/api/home.js";
// const props = defineProps(['getProjectListProp'])
const getProjectListProp = inject('getProjectListProp')
const addProjectFormRef = ref();

const projectAddState = reactive({
  visible: ref(false),
  form: reactive({
    project_id: "",
    name: "",
    description: "",
    timestamp: "",
  }),
});
const addProjectRules = reactive({
  project_id: {
    validator: addProjectIdCheck,
    trigger: "blur",
  },
});
function projectAdd() {
  projectAddState.visible = true;
}
function handleAddClose() {
  projectAddState.visible = false;
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

function comfirmAddProject(formEl) {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // 表单校验通过，构造数据发送请求
      let data = {
        project_id: projectAddState.form.project_id,
        name: projectAddState.form.name,
        description: projectAddState.form.description,
        timestamp: projectAddState.form.timestamp,
      };
      console.log(data);
      addProjectApi(data).then(
        (res) => {
          projectAddState.visible = false;
          console.log(res);
          // 更新列表数据源
          // getProjectList();
          getProjectListProp()
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      projectAddState.visible = true;
    }
  });
}


</script>

<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="projectAdd()">新增项目</el-button>
        <el-dialog
          v-model="projectAddState.visible"
          title="新增项目"
          width="30%"
          :before-close="handleAddClose"
        >
          <el-form
            :model="projectAddState.form"
            label-width="120px"
            :rules="addProjectRules"
            status-icon
            ref="addProjectFormRef"
          >
            <el-form-item label="项目编码" prop="project_id">
              <el-input v-model="projectAddState.form.project_id" />
            </el-form-item>
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="projectAddState.form.name" />
            </el-form-item>
            <el-form-item label="项目时间" prop="timestamp">
              <!-- <el-input v-model="state.form.projectAdd.timestamp" /> -->
              <el-date-picker
                v-model="projectAddState.form.timestamp"
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>
            <el-form-item label="项目描述" prop="description">
              <el-input
                v-model="projectAddState.form.description"
                type="textarea"
              />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="handleAddClose()">取消</el-button>
              <el-button
                type="primary"
                @click="comfirmAddProject(addProjectFormRef)"
              >
                确认
              </el-button>
            </span>
          </template>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>