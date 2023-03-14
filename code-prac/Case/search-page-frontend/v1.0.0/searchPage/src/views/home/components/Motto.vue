<template>
    <div class="quotebox"
         v-show="isShow">
    <span class="quote-bg"></span>
    <p class="quote-content">
      「 {{mottoData.hitokoto}} 」
    </p>
    <p class="quote-author">
      {{mottoData.from_who}}
    </p>
  </div>
</template>

<script>
  import {getMotoData} from '@/api/home'

  export default {
    name: "Motto",
    data() {
      return {
        mottoData: []
      }
    },
    computed: {
      isShow() {
        //motto的显示与隐藏，与input的激活状态相反
        return !this.$store.state.isClick.input && !this.$store.state.isClick.time
      }
    },
    created() {
      this.initData()
    },
    methods: {
      initData() {
        this.getMotoData()
      },
      getMotoData() {
        getMotoData().then(res => {
          this.mottoData = res.data
        }, error => {
          console.log(error)
        })
      }
    }

  }
</script>

<style scoped>

</style>
