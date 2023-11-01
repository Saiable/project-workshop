<script setup>
import {
  Document,
  SetUp,
  Clock,
  Crop
} from "@element-plus/icons-vue";
const router = useRouter()
const path = ref(router.currentRoute.value.path.split('/').pop())
console.log(path)

// let sourceFileData;


const handleOpen = (key, keyPath) => {
//   console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
//   console.log(key, keyPath);
};
</script>
<template>
  <div class="home-container">
    <el-row class="row">
      <el-col :span="4">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          :default-active="path"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          :router="true"
        >
          <el-menu-item index="SourceFile">
            <el-icon><location /></el-icon>
            <span>源文件来源</span>
          </el-menu-item>
          <el-menu-item index="TagTask">
            <el-icon><Crop /></el-icon>
            <span>业务标注数据</span>
          </el-menu-item>
          <el-menu-item index="BackUp">
            <el-icon><document /></el-icon>
            <span>数据备份</span>
          </el-menu-item>
          <el-menu-item index="UpdateLog">
            <el-icon><setting /></el-icon>
            <span>更新日志</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" class="col-right">
        <el-scrollbar height="96vh">
          <router-view></router-view>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.home-container {
  :deep(.el-menu) {
    height: 100vh;
  }
  .col-right {
    padding: 10px;
  }
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>