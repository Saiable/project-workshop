<template>
  <div class="order">
    <div class="content">content</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.order {
  display: flex;
  height: 100%;
  .content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>