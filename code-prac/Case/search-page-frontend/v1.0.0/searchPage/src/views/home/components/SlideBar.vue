<template>
  <div class="slide-bar z-300"
       :class="isShow"
       @mouseover="getHover"
  >
    <!--    v-show="!$store.state.inputActive"-->
    <div class="login-item" :class="localAuth? 'logined': ''">
      <i class="iconfont icon-denglu" v-if="!localAuth" @click="$router.push('login')" title="登录"></i>
      <my-avator v-else class="avator-menu"></my-avator>
    </div>
    <!--slider hidden-->
    <!--<div class="slide-item">-->
    <!--  <i class="iconfont icon-normal1" @click="hiddenSlide" title="隐藏"></i>-->

    <!--</div>-->
    <ul class="icon-item">
      <li style="--l: 10%;" @click="manageBookMark" v-show="this.$store.state.token.userAuth">
        <a>
          <i class="iconfont icon-shuqian1" title="书签"></i>
          <span class="title">书签</span>
        </a>
      </li>
      <li style="--l: 20%;">
        <a>
          <i class="iconfont icon-zhuye1" title="主页"></i>
          <span class="title">主页</span>

        </a>
      </li>
      <li style="--l: 30%;" @click="showWeather">
        <a>
          <i class="iconfont icon-tianqi1" title="天气"></i>
          <span class="title">天气</span>
        </a>
      </li>
      <li style="--l: 40%;" @click="showCalendar">
        <a>
          <i class="iconfont icon-rili3 adjust-font" title="日历"></i>
          <span class="title">日历</span>

        </a>
      </li>
      <li style="--l: 50%;">
        <a>
          <i class="iconfont icon-tubiaozhuanqu-22" title="介绍"></i>
          <span class="title">介绍</span>

        </a>
      </li>
      <li style="--l: 60%;"
          @click="modifyUserConfig"
          v-show="this.$store.state.token.userAuth"
      >
        <a>
          <i class="iconfont icon-shezhi" title="设置"></i>
          <span class="title">设置</span>

        </a>
      </li>
      <li style="--l: 70%;"
          @click="loginOutMethod"
          v-show="this.$store.state.token.userAuth"
      >
        <a>
          <i class="iconfont icon-tuichu" title="退出"></i>
          <span class="title">退出</span>
        </a>
      </li>
    </ul>

  </div>
</template>

<script>
    import {
        SLIDEBARHOVER,
        SHOWWEATHWE,
        SHOWCANLENDAR,
        LOGIN_OUT,
        SHOWCARD,
        CLICKLOGINOUT
    } from "@/store/mutation-types";
    import {userSignout, getUserData} from "@/api/userinfo";

    export default {
        name: "SlideBar",
        components: {
            MyAvator: () => import('./MyAvator'),
        },
        data() {
            return {
               //localAuth: this.$store.state.token.userAuth,
            }
        },
        computed: {
            isShow() {
                return {
                    'hover': this.$store.state.isClick.sliderBar
                }
            },
            localAuth() {
              return this.$store.state.token.userAuth
            }
        },
        watch: {
            loginId(newValue) {
            }
        },
        methods: {
            hiddenSlide() {
                //this.$store.commit(SHOWWEATHWE)

            },
            showWeather() {
                this.$store.commit(SHOWWEATHWE)
            },
            showCalendar() {
                this.$store.commit(SHOWCANLENDAR)
            },
            getHover() {
                this.$store.commit(SLIDEBARHOVER)
            },
            modifyUserConfig() {
                this.$router.push('config')
            },
            parLoginOut() {
                this.localAuth = ''
            },
            manageBookMark() {
                this.$router.push('bookmark')
            },
            loginOutMethod() {
                userSignout().then(res => {
                    this.$store.commit(LOGIN_OUT)
                    console.log('login-out success')

                    this.localAuth = ''

                    //this.$bus.$emit('busLoginout')
                    //this.$emit('loginOut')
                    //this.$store.commit(CLICKLOGINOUT)
                    //window.location.reload()
                }, error => {
                    console.log(error)
                })
            }
        },

    }
</script>

<style scoped>
  @import "../../../styles/views/home/slidebar.css"

</style>
