<template>
  <div>
    <div
      class="login-page"
      :style="{ backgroundImage: 'url(' + localImage.imageBase + ')' }"
    >
      <!-- 整体布局 -->
      <div class="container" ref="container" :class="panelActive">
        <div class="go-back" @click="goBack">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <!-- 注册 -->
        <div class="container-form container--signup">
          <div class="form" id="form1">
            <h2 class="form-title">用户注册</h2>

            <div class="form-outer">
              <input
                type="text"
                v-model="registerUserInfo.nickname"
                autocomplete="off"
                placeholder="请输入昵称"
                class="input"
                data-item="nickname"
                @blur="validateNickname($event)"
              />
              <Warning
                :validateResProps="validateRes.nickname"
                :isBlur="isBlur.nicknameBlur"
              ></Warning>
            </div>

            <div class="form-outer">
              <input
                type="text"
                v-model="registerUserInfo.passport"
                autocomplete="off"
                placeholder="请输入账户"
                class="input"
                data-item="passport"
                @blur="validatePassport($event)"
              />
              <Warning
                :validateResProps="validateRes.passport"
                :isBlur="isBlur.passportBlur"
              ></Warning>
            </div>

            <div class="form-outer">
              <input
                type="password"
                v-model="registerUserInfo.password"
                autocomplete="off"
                placeholder="请输入密码"
                class="input"
                data-item="password"
                @blur="validatePassword($event)"
              />
              <Warning
                :validateResProps="validateRes.password"
                :isBlur="isBlur.passwordBlur"
              ></Warning>
            </div>

            <div class="form-outer">
              <input
                type="password"
                v-model="registerUserInfo.password2"
                autocomplete="off"
                placeholder="请重复输入密码"
                class="input"
                data-item="password2"
                @blur="validatepassword2($event)"
              />
              <Warning
                :validateResProps="validateRes.password2"
                :isBlur="isBlur.password2Blur"
              ></Warning>
            </div>

            <button @click="Register(registerUserInfo)" class="btn">
              注册
            </button>
          </div>
        </div>
        <!-- 登录 -->
        <div class="container-form container--signin">
          <div class="form" id="form2">
            <h2 class="form-title">用户登陆</h2>
            <div class="form-outer">
              <input
                type="text"
                v-model="loginUserInfo.passport"
                autocomplete="off"
                placeholder="请输入账号"
                class="input"
              />
              <Warning
                :validateResProps="validateRes.loginInfoCheck"
                :isBlur="isBlur.loginInfoCheckBlur"
              ></Warning>
            </div>

            <div class="form-outer">
              <input
                type="password"
                v-model="loginUserInfo.password"
                autocomplete="off"
                placeholder="请输入密码"
                class="input"
              />
              <Warning
                :validateResProps="validateRes.loginInfoCheck"
                :isBlur="isBlur.loginInfoCheckBlur"
              ></Warning>
            </div>

            <a href="#" class="link">忘记密码？</a>
            <button @click="Login(loginUserInfo)" class="btn">登陆</button>
          </div>
        </div>
        <!-- overlay -->
        <div class="container-overlay">
          <div
            class="overlay"
            :style="{ backgroundImage: 'url(' + localImage.imageBase + ')' }"
          >
            <div class="overlay-panel overlay--left">
              <button class="btn" @click="myChange">已有账号，直接登陆</button>
            </div>
            <div class="overlay-panel overlay--right">
              <button class="btn" @click="myChange">没有账号，点击注册</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  userSignup,
  userSignin,
  checkNickname,
  checkPassport,
} from "@/api/userinfo";
import { LOGIN_IN } from "@/store/mutation-types";

export default {
  name: "login",
  components: {
    Warning: () => import("./components/warning.vue"),
  },
  data() {
    return {
      panel: false,
      registerUserInfo: {
        nickname: "",
        passport: "",
        password: "",
        password2: "",
      },
      registerResponse: {},
      localImage: {
        imageBase: localStorage.getItem("defaultImage"),
      },
      loginUserInfo: {
        passport: "",
        password: "",
      },
      loginInfo: {
        token: "",
        userKey: "",
        uuid: "",
      },
      validateRes: {
        nickname: {
          res: false,
          message: "",
        },
        passport: {
          res: false,
          message: "",
        },
        password: {
          res: false,
          message: "",
        },
        password2: {
          res: false,
          message: "",
        },
        loginInfoCheck: {
          res: false,
          message: "",
        },
      },
      // 失去焦点的判断，控制两个小图标整体的显示
      isBlur: {
        nicknameBlur: false,
        passportBlur: false,
        passwordBlur: false,
        password2Blur: false,
        loginInfoCheckBlur: false,
      },
    };
  },
  watch: {
    // 深度监听
    "registerUserInfo.nickname": {
      deep: true,
      handler: function (val) {
        // 失去焦点后，对于重新修改的值，进行动态校验
        if (this.isBlur.nicknameBlur) {
          // console.log(val);
          if (val.length > 5 && val.length < 17) {
            this.validateRes.nickname = {
              res: true,
              message: "",
            };
          } else {
            this.validateRes.nickname = {
              res: false,
              message: "昵称长度应当在6到16之间",
            };
          }
        }
        //this.checkNickname()
      },
    },

    "registerUserInfo.passport": {
      deep: true,
      handler: function (val) {
        // 失去焦点后，对于重新修改的值，进行动态校验
        if (this.isBlur.passportBlur) {
          console.log(val);
          if (val.length > 5 && val.length < 17) {
            this.validateRes.passport = {
              res: true,
              message: "",
            };
          } else {
            this.validateRes.passport = {
              res: false,
              message: "账号长度应当在6到16之间",
            };
          }
        }
      },
    },

    "registerUserInfo.password": {
      deep: true,
      handler: function (val) {
        // 失去焦点后，对于重新修改的值，进行动态校验
        console.log(val);
        if (val.length > 5 && val.length < 17) {
          this.validateRes.password = {
            res: true,
            message: "",
          };
        } else {
          this.validateRes.password = {
            res: false,
            message: "密码长度应当在6到16之间",
          };
        }
        this.checkPassword();
      },
    },

    "registerUserInfo.password2": {
      deep: true,
      handler: function (val) {
        // 失去焦点后，对于重新修改的值，进行动态校验
        console.log(val);
        if (this.isBlur.password2Blur) {
          if (val == this.registerUserInfo.password) {
            this.validateRes.password2 = {
              res: true,
              message: "",
            };
          } else {
            this.validateRes.password2 = {
              res: false,
              message: "两次密码不相等",
            };
          }
        }
      },
    },
  },
  computed: {
    panelActive() {
      return {
        "right-panel-active": this.panel,
      };
    },
  },
  methods: {
    goBack() {
      this.$router.push("home");
    },
    myChange() {
      // 切换样式
      this.panel = !this.panel;
    },
    Register(registerUserInfo) {
      let validatorRes =
        this.validateRes.nickname.res &&
        this.validateRes.passport.res &&
        this.validateRes.password.res &&
        this.validateRes.password2.res;
      console.log(validatorRes);
      validatorRes &&
        userSignup(registerUserInfo).then(
          (res) => {
            this.registerResponse = res;

            console.log(res);
            if (res.code == 0) {
              let data = {
                passport: this.registerUserInfo.passport,
                password: this.registerUserInfo.password,
              };
              this.Login(data);
            } else {
              window.alert("注册失败，失败原因如下:\n "+ res.message);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },
    Login(loginUserInfo) {
      // 点击事件触发登陆，参数已经动态绑定了
      userSignin(loginUserInfo).then((res) => {
        this.loginInfo = res.data;
        if (res.code == 1) {
          this.validateRes.loginInfoCheck = {
            res: false,
            message: res.message,
          };
          this.isBlur.loginInfoCheckBlur = true;
        }
        if (res.code == 0) {
          this.$store.commit(LOGIN_IN, this.loginInfo.token);
          this.$router.push("home");
          
          const h = this.$createElement;
          this.$notify({
            title: "登录成功",
            message: h(
              "b",
              { style: "color: black" },
              "欢迎欢迎━(*｀∀´*)ノ亻!"
            ),
            type: "success",
            position: "bottom-right"
          });
        }
      });
    },
    validateNickname($event) {
      // 昵称input框失去焦点时，触发的事件
      let currentValue = $event.target.value;

      // 前端校验
      if (currentValue.length > 5 && currentValue.length < 17) {
        // console.log(currentValue);
        this.validateRes.nickname = {
          res: true,
          message: "",
        };
        this.isBlur.nicknameBlur = true;
      } else {
        // console.log(currentValue, "账号长度应当在6到16之间");
        this.validateRes.nickname = {
          res: false,
          message: "账号长度应当在6到16之间",
        };
        this.isBlur.nicknameBlur = true;
      }
      this.checkNickname(currentValue);
    },
    validatePassport($event) {
      let currentValue = $event.target.value;
      // 前端校验
      if (currentValue.length > 5 && currentValue.length < 17) {
        console.log(currentValue);
        this.validateRes.passport = {
          res: true,
          message: "",
        };
        this.isBlur.passportBlur = true;
      } else {
        // console.log(currentValue, "账号长度应当在6到16之间");
        this.validateRes.passport = {
          res: false,
          message: "账号长度应当在6到16之间",
        };
        this.isBlur.passportBlur = true;
      }
      this.checkPassport(currentValue);
    },
    validatePassword($event) {
      let currentValue = $event.target.value;
      // 前端校验
      if (currentValue.length > 5 && currentValue.length < 17) {
        console.log(currentValue);
        this.validateRes.password = {
          res: true,
          message: "",
        };
        this.isBlur.passwordBlur = true;
      } else if (currentValue.length == 0) {
        // console.log(currentValue, "账号长度应当在6到16之间");
        this.validateRes.password = {
          res: false,
          message: "密码不能为空",
        };
        this.isBlur.passwordBlur = true;
      } else {
        this.validateRes.password = {
          res: false,
          message: "密码长度应当在6到16之间",
        };
        this.isBlur.passwordBlur = true;
      }
      // this.checkPassport(currentValue);
    },
    validatepassword2($event) {
      let currentValue = $event.target.value;
      // 前端校验
      if (currentValue.length == 0) {
        this.validateRes.password2 = {
          res: false,
          message: "密码不能为空",
        };
        this.isBlur.password2Blur = true;
      } else if (currentValue == this.registerUserInfo.password) {
        console.log(currentValue);
        this.validateRes.password2 = {
          res: true,
          message: "",
        };
        this.isBlur.password2Blur = true;
      } else {
        this.validateRes.password2 = {
          res: false,
          message: "两次密码不相等",
        };
        this.isBlur.password2Blur = true;
      }
    },
    checkNickname(params) {
      checkNickname(params).then(
        (res) => {
          // console.log("res:", res);
          // 后台校验
          if (res.code == 1) {
            this.validateRes.nickname = {
              res: false,
              message: "昵称已被占用",
            };
          }
          if (res.code == 51) {
            this.validateRes.nickname = {
              res: false,
              message: res.message,
            };
          }
          if (res.code == 0) {
            let nicknameLen = res.data.nickname.length
            if(nicknameLen > 5 && nicknameLen < 17) {
              this.validateRes.nickname = {
                res: true,
                message: "",
              };
            } else {
              this.validateRes.nickname = {
                res: false,
                message: "昵称长度应当在6到16之间",
              };
            }
          }
        },
        (error) => {
          console.log("error:", error);
        }
      );
    },
    checkPassport(params) {
      checkPassport(params).then(
        (res) => {
          console.log("res:", res);
          // 后台校验
          if (res.code == 1) {
            this.validateRes.passport = {
              res: false,
              message: "账号已被占用",
            };
          }
          if (res.code == 51) {
            this.validateRes.passport = {
              res: false,
              message: res.message,
            };
          }
          if (res.code == 0) {
            console.log(res)
            let passportLen = res.data.passport.length
            if(passportLen > 5 && passportLen < 17) {
              this.validateRes.passport = {
                res: true,
                message: "",
              };
            } else {
              this.validateRes.passport = {
                res: false,
                message: "账号长度应当在6到16之间",
              };
            }

          }
        },
        (error) => {
          console.log("error:", error);
        }
      );
    },
    checkPassword() {
      if (this.registerUserInfo.password != this.registerUserInfo.password2) {
        this.validateRes.password2 = {
          res: false,
          message: "两次密码不相等",
        };
      } else {
        this.validateRes.password2 = {
          res: true,
          message: "",
        };
      }
    },
  },
};
</script>

<style scoped>
/* 隐藏密码输入框的小眼睛 */
input[type="password"]::-ms-reveal {
  display: none;
}
</style>
