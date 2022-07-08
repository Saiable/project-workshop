<template>
  <div id="pet-img" class="z-600">

  </div>

</template>

<script>
    import {pet} from '@/utils/pet.js'
    export default {


        methods: {

        },
        mounted() {
            pet()
        }

    }
</script>

<style scoped>
  #pet-img {
    position: absolute;

    width: 50px;
    height: 50px;
    background-image: url("../../../assets/img/runningDog.gif");
    background-size: cover;

  }
</style>
