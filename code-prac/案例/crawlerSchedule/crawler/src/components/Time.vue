<template>
<div ref='time'>
  当前时间：{{time}}
</div>
</template>

<script>
export default {
  data() {
    return {
t: null,
time: ''
    }
  },
    mounted() {
      this.t = setTimeout(() => {
          this.getTime()
          }, 1000);
    },
methods: {
           getTime() {
             clearTimeout(this.t); //清除定时器
             var dt = new Date();
             var y = dt.getFullYear();
             var mt = dt.getMonth() + 1;
             var day = dt.getDate();
             var h = dt.getHours(); //获取时
             var m = dt.getMinutes(); //获取分
             var s = dt.getSeconds(); //获取秒
             this.time =
               y +
               "-" +
               mt +
               "-" +
               day +
               "-" +
               h +
               ":" +
               m +
               ":" +
               s ;
             this.t = setTimeout(this.getTime, 1000); //设定定时器，循环运行
           }
         },
}
</script>
