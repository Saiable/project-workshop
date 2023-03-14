<template>
  <div>
    <div id="cover"
         class="cover z-200"
         @click="coverIsClick"
         @contextmenu.prevent="myContextMenu($event)"
    >
    </div>
    <context-menu
      :propsContextVisible="contextVisible"
      :propsContextLeft="contextLeft"
      :propsContextTop="contextTop"
      @updateContextVisible="updateContextVisible"
    ></context-menu>
  </div>

</template>

<script>
  import {COVERCLICK} from "@/store/mutation-types";

  export default {
    name: "Cover",
    components: {
      ContextMenu: () => import('./ContextMenu')
    },
    data() {
      return {
        contextVisible: false,
        contextLeft: 0,
        contextTop: 0
      }
    },
    methods: {
      coverIsClick() {
        // 向外传递cover被点击了
        this.$store.commit(COVERCLICK)

        //  关闭自定义上下文菜单
        this.contextVisible = false
      },
      myContextMenu($event) {
        // 自定义右键上下文菜单
        this.contextVisible = true
        this.contextTop = $event.pageY
        this.contextLeft = $event.pageX
      },
      updateContextVisible(value) {
        this.contextVisible = value
      }
    }
  }
</script>

<style scoped>

</style>
