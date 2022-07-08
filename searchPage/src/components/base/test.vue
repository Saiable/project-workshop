<template>
  <div id="body">
    <div id="container">
      <div class="item"></div>
    </div>
    <button @click="setNavigation">
      click me
    </button>
      <div>{{localNavigation}}</div>

  </div>
</template>

<script>
import Sortable from 'sortablejs'
import {SETNAVIGATIONHISTORY} from '../../store/mutation-types.js'
export default {
  data() {
    return {
      resizeable: false, // 是否开启尺寸修改
      clientX: 0,
      clientY: 0, // 鼠标按下时的坐标，并在修改尺寸时保存上一个鼠标的位置
      minW: 8,
      minH: 8, // div可修改的最小宽高
      direc: '', // 鼠标按下时的位置，使用n、s、w、e表示
    }
  },
  mounted() {
  },
  methods: {
    setNavigation() {
      this.$store.commit(SETNAVIGATIONHISTORY, 'bb') // commit提交后，vuex存一份，本地localstorage也会存储一份
      let a = this.$store.state.localstorage // 这个是vuex的localstorage对象
      console.log(a)
    }
  },
  computed: {
    localNavigation() {
      return this.$store.state.localstorage.localstorage.navigation.navigationHistory
    }
  }
}
</script>

<style scoped>
</style>
