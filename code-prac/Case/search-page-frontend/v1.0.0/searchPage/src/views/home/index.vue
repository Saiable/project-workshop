
<template>
  <div id="home">

    <back-ground></back-ground>
    <Time></Time>
    <input-index></input-index>
    <Cover></Cover>

    <slider-bar></slider-bar>
    <Widget></Widget>
    <!--<my-avator></my-avator>-->
    <navigations></navigations>
    <Motto></Motto>

    <div v-show="showTips" class="icon-item shadow absolute z-300" @click="showSliderBar">
    </div>

  </div>
</template>

<script>
    import {
        SLIDEBARHOVER,
    } from "@/store/mutation-types";
    import {L2Dwidget} from 'live2d-widget'

    export default {
        data() {
            return {
                a: 'aaa'
            }
        },
        computed: {
            showTips() {
                return !this.$store.state.isClick.sliderBar
            }
        },
        components: {
            BackGround: () => import('./components/BackGround'),
            Cover: () => import('./components/Cover'),
            Time: () => import('./components/Time'),
            InputIndex: () => import('./components/InputIndex'),
            SliderBar: () => import('./components/SlideBar'),
            Widget: () => import('./components/Widget'),
            //MyAvator: () => import('./components/MyAvator'),
            Navigations: () => import('./components/Navigations'),
            Motto: () => import('./components/Motto'),
            Pet: () => import('../../components/base/pet/Pet'),
            BoardGirl: () => import('../../components/base/test')
        },
        methods: {
            showSliderBar() {
                this.$store.commit(SLIDEBARHOVER)

            }
        },
        mounted() {
                L2Dwidget.on('*', event => {
                    //console.log('%c EVENT ' + '%c -> ' + event, 'background: #222; color: yellow', 'background: #fff; color: #000')
                }).init({
                    //dialog: {
                    //    enable: true,
                    //    script: {
                    //        'tap': '哎呀！',
                    //        'tap body': '哎呀！别碰我！',
                    //        'tap face': '肉嘟嘟~肉嘟嘟~',
                    //
                    //    }
                    //},
                    model: {
                        jsonPath: "../../../static/live2dw/live2d-widget-model-haru_2/assets/haru02.model.json"
                    },
                    display: {
                        position: 'right',
                        width: 110,
                        height:220
                    },
                    mobile: {
                        show: true,
                        scale: 0.5
                    },
                    react: {
                        opacity: 1,//透明度
                    }
                })


        }
    }
</script>

<style scoped>

  #home {
    height: 100vh;
  }

  .icon-item {
    bottom: 0px;
    right: 11px;

    width: 89px;
    height: 144px;

    background-color: transparent;

    text-align: center;
    line-height: 50px;
    cursor: pointer;
  }




</style>
