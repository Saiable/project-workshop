<template>
  <div class="board-girl z-400"></div>
</template>

<script>
    import { L2Dwidget } from 'live2d-widget'
    export default {
        methods: {},
        mounted() {
            setTimeout(function () {
                L2Dwidget.init({
                    model: {
                        jsonPath: "../../../static/live2dw/live2d-widget-model-hibiki/assets/hibiki.model.json"
                    },
                })
            }, 1000);
        }
    }
</script>

<style scoped>
.board-girl {
  width: 100px;
  height: 100px;
  background-color: #3a8ee6;
}
</style>
