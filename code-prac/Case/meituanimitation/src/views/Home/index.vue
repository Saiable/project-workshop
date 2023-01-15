<template>
  <div class="home">
    <div class="content">content</div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer/index.vue";
export default {
  components: {
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>