<template>
  <div class="showtime">
    <div class="mytime hover z-300"
         @click="timeIsClick"
    >
      <span>
        {{hour}}:{{minute}}
      </span>
      <div class="timeTwo">{{month}}月{{day}}日 {{week}}</div>
    </div>
  </div>
</template>

<script>
  import {IMGSTATE} from "@/store/mutations-types";
  import {TIMECLICK} from "@/store/mutation-types";

  export default {
    name: "Time",
    data() {
      return {
        hour: '',
        minute: '',
        month: '',
        day: '',
        timer: '',
        week: '',
      }
    },
    created() {
      this.startTime()
    },
    methods: {
      initData() {
        this.startTime()
      },
      startTime() {
        this.dealTime(new Date())
        this.timer = setInterval(() => {
          this.dealTime(new Date())
        }, 1000)
      },
      dealTime(aData) {
        let Hour = aData.getHours() < 10 ? '0' + (aData.getHours()) : (aData.getHours())
        let Minute = aData.getMinutes() < 10 ? '0' + (aData.getMinutes()) : aData.getMinutes()
        let Month = aData.getMonth() < 10 ? '0' + (aData.getMonth() + 1) : (aData.getMonth() + 1)
        let Day = aData.getDate() < 10 ? '0' + (aData.getDate()) : aData.getDate()
        let Week = "星期" + "日一二三四五六".charAt(new Date().getDay())

        this.hour = Hour
        this.minute = Minute
        this.month = Month
        this.day = Day
        this.week = Week
      },
      timeIsClick() {
        // 向外传递Time模块被点击了
        this.$store.commit(TIMECLICK)
        // // 控制Nav是否显示
        // this.$store.commit('mu_showNav')
        // // 控制Input框是否显示
        // this.$store.commit('mu_showInput')
        // // hack技巧，初始化Nav中的margin
        // this.$store.commit('mu_recoverMargin')
        //
        // this.deactiveBgbox()
        //
        // this.$store.commit({
        //   type: IMGSTATE
        // })
      }
    },
    destroyed() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    }

  }
</script>

<style scoped>

</style>
