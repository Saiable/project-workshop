<script setup>
import ProjectModify from "./ProjectModify.vue";
import BatchShow from "./BatchShow.vue";
import BatchAdd from "./BatchAdd.vue";

const props = defineProps(["taskGenStateProp"]);

</script>

<template>
  <div>
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in taskGenStateProp"
        :key="item.id"
        :timestamp="item.form.timestamp"
        placement="top"
      >
        <el-card shadow="hover">
          <div class="project-container">
            <div class="title">{{ item.form.name }}</div>
            <div class="operation">
              <ProjectModify
                :item="item"
                :index="index"
              />
              <BatchAdd :project_id="item.form.project_id"/>
            </div>
          </div>
          <div class="project-description">
            {{ item.form.description }}
          </div>
          <BatchShow :item="item"/>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<style lang="scss" scoped>
.project-container {
  display: flex;
  justify-content: space-between;
  .title {
    font-weight: 200;
    font-size: 18px;
  }

  .operation {
    display: flex;
    width: 200px;
    justify-content: space-evenly;
  }
}
.project-description {
  margin-top: 6px;
  margin-bottom: 18px;
}
</style>