<template>
  <div class="button-body">


    <button
      class="login"
      @click="loginChange"
      :class="{'active': this.active,'verity':this.verity}"

    >
      <p>LOGIN</p>
      <div class="loading">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <svg class="checkmark" width='30px' height='30px' stroke='white' fill='none'>
        <polyline points='2,10 12,18 28,2'></polyline>

      </svg>
    </button>
  </div>
</template>

<script>
  export default {
    name: "AvatorButton",
    data() {
      return {
        active: false,
        verity: false,
      }
    },
    methods: {

      loginChange() {
        this.active = !this.active
        setTimeout(() => {
          this.$router.push('login')
        },0)
      }
    },

  }
</script>

<style scoped>
  @import '../../../styles/views/login/loginButton.css';

</style>
