<template>
  <div>
    <div class="classbody" :style="{backgroundImage:'url('+$store.state.backgroundImageBase+')'}">
      <slot></slot>
    </div>
  </div>

</template>

<script>
  export default {
    name: "ImageCpn",

  }
</script>

<style scoped>
  .classbody {
    margin: 0;
    padding: 0;
    align-items: center;
    background-color: #e9e9e9;
    /* background: url(); */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: grid;
    height: 100vh;
    place-items: center;

  }
</style>
