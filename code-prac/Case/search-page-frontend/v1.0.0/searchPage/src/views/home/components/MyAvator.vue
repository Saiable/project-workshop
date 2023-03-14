<template>
  <div class="my-avator" >
    <div class="outer-info">
      <div class="avator" @click="showCardInfo">
        <img :src="userInfo.head_logo" alt="个人中心" title="个人中心" @click="getUserInfoMethod">
        <!--<transition name="fade">-->
        <!--  <div class="person-card z-400" v-show="$store.state.isClick.card">-->
        <!--    <ul>-->
        <!--      <li @click="getUserInfoMethod()">个人中心</li>-->
        <!--      &lt;!&ndash;<li @click="manageBookMark">书签管理</li>&ndash;&gt;-->
        <!--      <li @click="loginOutMethod()">登出</li>-->
        <!--    </ul>-->
        <!--  </div>-->
        <!--</transition>-->
      </div>

      <!--<div class="nick-name" @click="showCardInfo">{{userInfo.nickname}}</div>-->
    </div>

    <!--<div v-else class="icon">-->
    <!--  <avator-button></avator-button>-->
    <!--</div>-->
  </div>
</template>

<script>
    import {userSignout, getUserData} from "@/api/userinfo";
    import {LOGIN_OUT, SHOWCARD} from "@/store/mutation-types";

    export default {
        name: "LoginIcon",
        components: {
            //AvatorButton: () => import('./AvatorButton'),
        },
        data() {
            return {
                loginOutInfo: {
                    code: 0,
                    data: '',
                    message: '',
                },
                localAuth: localStorage.getItem('Authorization'),
                userInfo: {},
                showCard: false,
            }
        },
        methods: {
            //manageBookMark() {
            //    this.$router.push('bookmark')
            //},
            showCardInfo() {
                this.$store.commit(SHOWCARD)
            },
            loginOutMethod() {
                userSignout().then(res => {
                    console.log('login-out success')
                    this.$store.commit(LOGIN_OUT)
                    //this.localAuth = ''
                    this.$emit('loginOut')
                }, error => {
                    console.log(error)
                })

            },
            getUserInfoMethod() {
                this.$router.push('userinfo')
            }
        },
        created() {
            let localStorageAuth = localStorage.getItem('Authorization')
            // console.log(localStorageAuth)
            localStorageAuth && getUserData(localStorageAuth).then(res => {
                // console.log(res)
                this.userInfo = res.data
            })
        }
    }
</script>

<style scoped>
@import "../../../styles/views/home/my-avator.css";
</style>
