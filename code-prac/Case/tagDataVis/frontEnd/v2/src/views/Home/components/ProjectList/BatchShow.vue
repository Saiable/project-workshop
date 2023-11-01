<script setup>
import {
  batchListApi,
} from "@/api/home.js";
import BatchModify from "./BatchModify.vue";

let state = reactive({
  batchListState: [],
  batchListGenState: [],
});

const props = defineProps(['item'])
const activeNames = ref(["1"]);
const handleChange = (val) => {};

let batchListGenState = inject('batchListGenState')



</script>

<template>
  <div v-for="(item2, index2) in batchListGenState">
    <el-collapse
      :key="item2.id"
      v-model="activeNames"
      @change="handleChange"
      v-if="Number(props.item.form.project_id) == item2.form.project_id "
    >
      <el-collapse-item>
        <template #title>
          batch {{ item2.form.project_batch_id }} {{ item2.form.intro }}
          <!-- <el-icon v-for="num in item2.category_nums">
            <component :is="state.iconState[num]" />
          </el-icon> -->
        </template>
        <BatchModify :batchListGenState="batchListGenState" :project_batch_id="item2.form.project_batch_id" :project_id="item2.form.project_id"/>
        <div>任务描述：{{ item2.form.description }}           

        </div>
        <div>
          <span
            >起止时间：{{ item2.form.start_time }} -
            {{ item2.form.end_time }}</span
          >
        </div>
        <div>
          <span>工具：{{ item2.form.tools }} </span>
          <span>
            工具路径：<a :href="item2.form.tools_path" target="blank">{{
              item2.form.tools_path
            }}</a>
          </span>
        </div>

        <div>
          <span>相关文件：{{ item2.form.tag_related_files }} </span>
          <span>文件类型：{{ item2.form.file_type }} </span>
          <span>文件数量：{{ item2.form.file_number }} </span>

        </div>


        <div>
          <span>任务性质：{{ item2.form.category_nums }} </span>
          <span>是否完成：{{ item2.form.solved }} </span>

        </div>
        <div>
          <span>工作文件路径：{{ item2.form.source_file_path }} </span>
          <span>标注结果路径：{{ item2.form.tag_result_path }} </span>
          <span>备份文件路径：{{ item2.form.backup_name }} </span>
        </div>
        
      </el-collapse-item>
    </el-collapse>
  </div>
</template>