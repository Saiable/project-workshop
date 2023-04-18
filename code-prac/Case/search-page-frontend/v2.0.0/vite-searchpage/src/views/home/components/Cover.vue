<script setup name="Cover">
function myContextMenu($event) {}
</script>

<template>
  <div class="cover size-100 absolute" @contextmenu.prevent="myContextMenu($event)"></div>
</template>
<style lang="scss" scoped>
.cover {
  //   background-image: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.1) 80%),
  //     radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 100%);

  opacity: 0;
}
</style>