<template>
  <div class="mine">
    <div class="content">content</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.mine {
  display: flex;
  height: 100%;
  .content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>