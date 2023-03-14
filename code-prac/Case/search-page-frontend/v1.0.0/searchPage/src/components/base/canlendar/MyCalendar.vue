<template>
  <div class="my-calendar">
    <transition name="fade">
      <div class="myCalendar" v-show="this.$store.state.isClick.calendar">
        <Calendar
          :sundayStart="true"
          class="innerCalendar"
        ></Calendar>
      </div>
    </transition>
  </div>

</template>

<script>
  import Calendar from 'vue-calendar-component'

  export default {
    name: "MyCalendar",
    components: {
      Calendar
    },
  }
</script>

<style scoped>

</style>
