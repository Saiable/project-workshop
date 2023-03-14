<template>
  <transition name="fade">
    <div v-show="this.$store.state.isClick.weather" class="my-weather">
      <div id="he-plugin-standard">

      </div>
    </div>
  </transition>
</template>

<script>
    import {weather, linkLocalWeather} from "@/utils/weather";

    export default {
        name: "MyWeather",
        created() {
            weather()
            // linkLocalWeather()
        },
    }

</script>

<style scoped>

</style>
