<template>
  <div class="mine">
    <div class="content">content</div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer/index.vue";
export default {
  components: {
    Footer
  }
};
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