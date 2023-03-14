<template>
  <div class="my-widget" :class="isShow">
    <my-weather></my-weather>
    <my-calendar></my-calendar>
  </div>
</template>

<script>
  export default {
    name: "Widget",
    components: {
      MyCalendar: () => import('@/components/base/canlendar/MyCalendar'),
      MyWeather: () => import('@/components/base/weather/MyWeather')
    },
    computed: {
      isShow() {
        return this.$store.state.isClick.sliderBar ? 'z-300' : 'z-100'
      }
    }

  }
</script>

<style scoped>
  .my-widget {
    position: absolute;
    top: 9%;
    right: 3%;
    width: 400px;
    height: 295px;

    border-radius: 15px;
  }

</style>
