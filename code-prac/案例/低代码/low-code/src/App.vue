<template>
  <div class="app">
    <Editor :data="state"></Editor>
  </div>
</template>

<script>
import data from './data.json';
import {ref} from 'vue';
import Editor from './packages/editor.jsx';

export default {
  setup() {
    const state = ref(data)
    
    return {
      state
    }
  },
  components: {
    Editor
  }
}
</script>

<style lang="scss">
.app {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 100%;
  height: 100%;
}
</style>
