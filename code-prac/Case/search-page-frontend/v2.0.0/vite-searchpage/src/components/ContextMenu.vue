<script setup name="ContextMenu">
const props = defineProps({
  propsContextVisible: {
    type: Boolean,
    required: true,
    default() {
      return false;
    },
  },
  propsContextLeft: {
    type: Number,
    required: true,
    default() {
      return 0;
    },
  },
  propsContextTop: {
    type: Number,
    required: true,
    default() {
      return 0;
    },
  },
});
</script>

<template>
  <div
    v-show="propsContextVisible"
    :style="{ left: propsContextLeft + 'px', top: propsContextTop + 'px' }"
    class="contextmenu z-1000 absolute"
  >
    <slot name="item" class="item"></slot>
  </div>
</template>

<style scoped lang="scss">
.contextmenu {
    width:100px;
    height:300px;
    background: pink;
}
</style>