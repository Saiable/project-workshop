<script setup name="Login">
import { checkNickname, checkPassport } from "@/api/userinfo.js";
import { debounce } from "lodash";
import { mobile_phone_reg } from "@/utils/regex.js";
import { StringValidator, combineValidator } from "@/utils/StringValidator.js";

const $router = useRouter();
const state = reactive({
  imgBase: localStorage.getItem("defaultImage"),
  panelState: false,
  registerState: {
    nickname: "",
    passport: "",
    password: "",
    password2: "",
  },
  loginState: {
    passport: "",
    password: "",
  },
  registerTooltipState: {
    nickname: false,
    passport: false,
    password: false,
  },
  passportDialog: {
    visible: false,
    onClose: () => {},
  },
  registerPasswordCheck: {
    rule1: true,
    rule2: true,
    rule3: true,
  },
  passwordIcon: false,
});
const passwordIcon = ref(false)
watch(
  passwordIcon,
  (newvalue, oldvalue) => {
    console.log(newvalue, "aa");
    console.log(oldvalue, "bb");

    // if (oldvalue == "undefined") {
    //   state.passwordIcon = false
    // }
    // if (newvalue.length > 0) {
    //   state.passwordIcon = true
    // }
    // if(newvalue.length == 0) {
    //   state.passwordIcon = false
    // }
  });

const rules = reactive({
  loginRules: {
    passport: [
      {
        required: true,
        message: "账户不能为空",
        trigger: "blur",
      },
      {
        required: true,
        validator: passportCheck,
        trigger: "blur",
      },
    ],
  },
  registerRules: {
    nickname: [
      {
        validator: RegisterNicknameCheck,
        trigger: "blur",
      },
    ],
    passport: [
      {
        validator: RegisterPassportCheck,
        trigger: "blur",
      },
    ],
    password: [
      {
        validator: RegisterPasswordCheck,
        trigger: "change",
      },
    ],
    password2: [
      {
        required: true,
        message: "密码不能为空",
        trigger: "blur",
      },
    ],
  },
});
/**
 * RefDefine
 */
const registerForm = ref(null);
const passportInput = ref(null);

const focusState = reactive({
  register: {
    nickname: false,
    passport: false,
    password: false,
  },
});
/**
 * @Logic 动态样式类，控制切换登陆或者注册
 */
let panelActive = computed(() => {
  return {
    "right-panel-active": state.panelState,
  };
});
/**
 * @Logic 返回首页
 */
function goBack() {}

/**
 * @Logic 注册功能
 */
function register() {}

/**
 * @Logic 切换登陆或者注册
 */
function switchSign() {
  state.panelState = !state.panelState;
}
/**
 * Logic 用户登陆，前台验证账户名
 */
function passportCheck(rule, value, callback) {
  const reg = mobile_phone_reg;
  if (reg.test(value)) {
    callback();
  } else {
    return callback(new Error("请输入手机号"));
  }
}
/**
 * @Logic 限制昵称为7个汉字或14个字母
 */
function nicknameLengthValidate(str) {
  const chineseReg = /[\u4e00-\u9fa5]/; // 匹配中文字符的正则表达式
  const chineseCount = str.replace(chineseReg, "**").length; // 将中文字符替换为**，然后计算长度
  const letterCount = str.replace(chineseReg, "").length; // 去除中文字符后的长度
  return chineseCount + letterCount <= 14; // 判断总长度是否小于等于14
}
/**
 * @Logic 用户注册，前后台验证昵称nickname
 */
function RegisterNicknameCheck(rule, value, callback) {
  if (value === "") {
    callback(new Error("昵称不能为空"));
  }
  if (!nicknameLengthValidate(value)) {
    callback(new Error("昵称不能超过7个汉字或14个字符"));
  } else {
    checkNickname(value).then(
      (res) => {
        console.log(res);
        if (res.code != 0) {
          callback(new Error(res.message));
        } else {
          callback();
        }
      },
      (err) => {
        reject(err);
      }
    );
  }
}
/**
 * @Logic 用户注册，前后台验证账户passport
 */
function RegisterPassportCheck(rule, value, callback) {
  if (value === "") {
    callback(new Error("手机号不能为空"));
  } else if (!mobile_phone_reg.test(value)) {
    callback(new Error("手机号格式错误"));
  } else {
    checkPassport(value).then(
      (res) => {
        console.log(res);
        if (res.code == 1) {
          state.passportDialog.visible = true;
          state.registerState.passport = "";
          callback();
        } else if (res.code != 0) {
          callback(new Error(res.message));
        } else {
          callback();
        }
      },
      (err) => {
        reject(err);
      }
    );
  }
}

function containsChinese(inputString) {
        const regex = /[\u4e00-\u9fa5]/;
        return regex.test(inputString);
    }
    // 验证字符串是否包含空格
function containsSpace(inputString) {
        const regex = /\s/;
        return regex.test(inputString);
    }
/**
 * @Logic 用户注册，前台验证密码
 *
 */
function RegisterPasswordCheck(rule, value, callback) {

  if(value.length == 0) {
    state.registerPasswordCheck.rule1 = true;
    state.registerPasswordCheck.rule3 = true;
    console.log(state.registerPasswordCheck.rule2)
  } else if (value.length >= 8 && value.length <= 14 ) {
    state.registerPasswordCheck.rule1 = true;
  } else {
    state.registerPasswordCheck.rule1 = false;
  }

  const combineVal2 = combineValidator(
    value,
    ["containsLetter", "containsDigit", "containsPunctuation"],
    2
  );

  if (value.length == 0) {
    state.registerPasswordCheck.rule2 = true;
  } else if(combineVal2.isValid) {
    state.registerPasswordCheck.rule2 = true;
  } else {
    state.registerPasswordCheck.rule2 = false;

  }

  if (!containsChinese(value) && !containsSpace(value)) {
    state.registerPasswordCheck.rule3 = true;
  } else {
    state.registerPasswordCheck.rule3 = false;
  }
  

  const {rule1 ,rule2, rule3} = state.registerPasswordCheck
  console.log(rule1, rule2, rule3)
  if(rule1, rule2, rule3) {
    callback()
  } else {
    return callback(new Error('密码强度较弱，请修改'))
  }
}

/**
 * @Logic 抽离清除错误信息功能
 *
 */
function clearValidate(form, field) {
  form.value.clearValidate(field);
}
/**
 * @Logic 1.通过事件委派，当点击进入输入框时，清除显示的错误信息
 * @click
 */
function clearRegisterValidate(event) {
  const { nickname, passport, password } = event.target.dataset;
  if (nickname) {
    clearValidate(registerForm, "nickname");
  } else if (passport) {
    clearValidate(registerForm, "passport");
  } else if (password) {
    clearValidate(registerForm, "password");
  }
}
/**
 * @Logic 利用事件委派，控制tooltip显示状态
 * @focusin 1.获取焦点时，始终显示tooltip
 * @focusout 2.失去焦点时，隐藏之前的tooltip，同时显示新进入的tooptip
 *        没有使用focus和blur，因为不能冒泡（未验证）
 */
function switchRegisterTooltip(event) {
  const { nickname, passport, password } = event.target.dataset;
  if (event.type == "focusin") {
    if (nickname) {
      state.registerTooltipState.nickname = true;
    } else if (passport) {
      state.registerTooltipState.passport = true;
    } else if (password) {
      state.registerTooltipState.password = true;
    }
  } else {
    // event.type == "focusout"
    if (nickname) {
      state.registerTooltipState.nickname = false;
    } else if (passport) {
      state.registerTooltipState.passport = false;
    } else if (password) {
      state.registerTooltipState.password = false;
    }
  }
}
/**
 * @Logic
 * 1.取消手机号已注册的弹窗
 * 2.重新进入login的路由，并清空registerForm中的所有已填字段（以及校验显示的提示）
 */

function reLogin() {
  state.passportDialog.visible = false; // 关闭弹窗
  switchSign(); // 切换到登陆界面
  registerForm.value.resetFields(); // 移除注册界面所有的提示信息
}
/**
 * @Logic 重新输入手机号，用于注册时手机号已存在，取消弹出框后的焦点恢复
 * 1.关闭弹窗
 * 2.输入框获得焦点
 */
function reInputPassport() {
  state.passportDialog.visible = false; // 关闭弹窗
  passportInput.value.focus();
}
// onMounted(() => {
//   console.log(registerForm.value);
// });
</script>

<template>
  <div class="login-page">
    <div class="container" :class="panelActive">
      <!-- 返回首页按钮 -->
      <div class="go-back" @click="goBack">
        <i class="iconfont icon-fanhui"></i>
      </div>

      <!-- 注册 -->
      <div class="container-form container--signup">
        <div class="form" id="form1">
          <h2 class="form-title">欢迎注册</h2>
          <el-form
            :model="state.registerState"
            status-icon
            ref="registerForm"
            :rules="rules.registerRules"
            @click="clearRegisterValidate"
            @focusin="switchRegisterTooltip"
            @focusout="switchRegisterTooltip"
          >
            <el-form-item class="form-outer" prop="nickname">
              <el-tooltip
                :manual="true"
                :visible="state.registerTooltipState.nickname"
                effect="dark"
                placement="top-start"
                :hide-after="0"
                popper-class="reg-nickname"
              >
                <template #content>
                  设置后可更改，中英文均可，最长14个英文或7个汉字
                </template>
                <el-input
                  v-model="state.registerState.nickname"
                  placeholder="请设置昵称"
                  data-nickname="nickname"
                />
              </el-tooltip>
            </el-form-item>

            <el-form-item class="form-outer" prop="passport">
              <el-tooltip
                :manual="true"
                :visible="state.registerTooltipState.passport"
                effect="dark"
                placement="top-end"
                :hide-after="0"
              >
                <template #content> 可用于登陆或找回密码 </template>
                <el-input
                  v-model="state.registerState.passport"
                  placeholder="请输入手机号"
                  class="register-input"
                  data-passport="passport"
                  :maxlength="11"
                  ref="passportInput"
                />
              </el-tooltip>
            </el-form-item>
            <el-form-item class="form-outer" prop="password">
              <el-tooltip
                :manula="true"
                effect="dark"
                placement="top-end"
                :hide-after="0"
                :visible="state.registerTooltipState.password"
              >
                <template #content>
                  <div
                    :style="
                      state.registerPasswordCheck.rule1? '' : 'color:#f55'
                    "
                  >
                    <span v-show="state.registerState.password.length >= 1">
                      <span v-if="state.registerPasswordCheck.rule1">√ </span>
                      <span v-else>× </span>
                    </span>

                    长度为8~14个字符
                  </div>
                  <div                    
                    :style="
                    state.registerPasswordCheck.rule2? '' : 'color:#f55'
                    "
                  >
                    <span v-show="state.registerState.password.length >= 1">
                      <span v-if="state.registerPasswordCheck.rule2">√ </span>
                      <span v-else>× </span>
                    </span>
                    字母/数字以及标点符号至少包含2种</div>
                  <div
                    :style="
                    state.registerPasswordCheck.rule3? '' : 'color:#f55'
                    "
                  >
                    <span v-show="state.registerState.password.length >= 1">
                      <span v-if="state.registerPasswordCheck.rule3">√ </span>
                      <span v-else>× </span>
                    </span>
                    
                    不允许有空格，中文</div>
                </template>

                <el-input
                  v-model="state.registerState.password"
                  placeholder="请输入密码"
                  type="password"
                  show-password
                  class="register-input"
                  data-password="password"
                />
              </el-tooltip>
            </el-form-item>
            <el-form-item class="form-outer" prop="password2">
              <el-input
                v-model="state.registerState.password2"
                placeholder="请重复输入密码"
                class="register-input"
              />
            </el-form-item>
          </el-form>
          <button @click="register(registerUserInfo)" class="btn">注册</button>
        </div>
      </div>

      <!-- 登陆 -->
      <div class="container-form container--signin">
        <div class="form" id="form2">
          <h2 class="form-title">用户登陆</h2>
          <el-form
            :model="state.loginState"
            :rules="rules.loginRules"
            status-icon
          >
            <el-form-item class="form-outer" prop="passport">
              <el-input
                v-model="state.loginState.passport"
                placeholder="请输入账户"
              />
            </el-form-item>
            <el-form-item class="form-outer">
              <el-input
                v-model="state.loginState.password"
                placeholder="请输入密码"
                type="password"
              />
            </el-form-item>
          </el-form>
          <a href="#" class="link">忘记密码？</a>
          <button @click="Login(loginUserInfo)" class="btn">登陆</button>
        </div>
      </div>

      <!-- overlay  -->
      <div class="container-overlay">
        <div
          class="overlay"
          :style="{ backgroundImage: 'url(' + state.imgBase + ')' }"
        >
          <div class="overlay-panel overlay--left">
            <button class="btn" @click="switchSign">已有账号，直接登陆</button>
          </div>
          <div class="overlay-panel overlay--right">
            <button class="btn" @click="switchSign">没有账号，点击注册</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 手机号被注册时的弹窗提示 -->
    <el-dialog
      v-model="state.passportDialog.visible"
      title="提醒"
      width="30%"
      :before-close="reInputPassport"
      align-center
    >
      <span>该手机已注册，可以通过密码登录。</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="reInputPassport">取消</el-button>
          <el-button type="primary" @click="reLogin"> 登陆 </el-button>
        </span>
      </template>
    </el-dialog>
    <back-ground />
  </div>
</template>

<style scoped lang="scss">
.login-page {
  height: 100vh;
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
    overflow: hidden;

    width: 100%;
    max-width: 758px;
    height: 420px;
    border-radius: 0.7rem;
    background-color: #e9e9e9;

    box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25);
    .container-form {
      position: absolute;
      top: 0;

      height: 100%;

      transition: all 0.6s ease-in-out;
    }

    .container--signin {
      left: 0;
      width: 50%;
      z-index: 2;
    }
    &.right-panel-active .container--signin {
      transform: translateX(100%);
    }
    .container--signup {
      left: 0;
      width: 50%;
      z-index: 1;
      opacity: 0;
    }

    &.right-panel-active .container--signup {
      animation: show 0.6s;
      transform: translateX(100%);
      z-index: 5;
      opacity: 1;
    }
    .container-overlay {
      position: absolute;
      top: 0;
      left: 50%;
      overflow: hidden;

      width: 50%;
      height: 100%;

      transition: transform 0.6s ease-in-out;
      z-index: 100;
    }
    &.right-panel-active .container-overlay {
      transform: translateX(-100%);
    }
    .overlay {
      position: relative;
      left: -100%;

      width: 200%;
      height: 100%;
      background-color: #008997;
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;

      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
    }
    &.right-panel-active .overlay {
      transform: translateX(50%);
    }
    .overlay-panel {
      position: absolute;
      top: 0;

      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      width: 50%;
      height: 100%;

      text-align: center;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
    }

    .overlay--left {
      transform: translateX(-20%);
    }

    &.right-panel-active .overlay--left {
      transform: translateX(0);
    }

    .overlay--right {
      right: 0;

      transform: translateX(0);
    }

    &.right-panel-active .overlay--right {
      transform: translateX(20%);
    }
    .btn {
      padding: 0.9rem 4rem;
      border-radius: 20px;
      border: 1px solid #0367a6;
      background-color: #0367a6;
      background-image: linear-gradient(90deg, #0367a6 0%, #008997 74%);

      color: #e9e9e9;
      font-size: 0.8rem;
      letter-spacing: 0.1rem;
      text-transform: uppercase;

      cursor: pointer;
      transition: transform 80ms ease-in;
    }

    .form > .btn {
      margin-top: 1.5rem;
    }

    .btn:active {
      transform: scale(0.95);
    }

    .btn:focus {
      outline: none;
    }
    .form {
      display: flex;
      text-align: center;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      height: 100%;
      padding: 0 3rem;
      background-color: #e9e9e9;
    }
    .form-title {
      margin: 0;
      margin-bottom: 1.25rem;

      font-weight: 300;
    }
    .link {
      margin: 1.5rem 0;

      color: #333;
      text-decoration: none;
      font-size: 0.9rem;
    }

    :deep(.el-form) {
      width: 100%;
    }
    :deep(.el-input__wrapper.is-focus) {
      box-shadow: 0 0 0 1px black inset;
    }
    :deep(.el-input__inner) {
      width: 100%;
      margin: 0.5rem 0;
      padding: 0.5rem 0.5rem;
      border: none;

      background-color: #fff;
    }

    :deep(.form-outer) {
      margin: 0.9rem 0 0 0;
    }
    .go-back {
      display: inline;
      position: absolute;
      right: 1rem;
      top: 1rem;
      color: black;
      z-index: 999;
      i.icon-fanhui {
        font-size: 26px;
        color: #008997;
      }
      &:hover {
        color: #3a8ee6;

        cursor: pointer;
      }
    }

    // .reg-nickname[data-popper-placement^=bottom]>.el-popper__arrow {
    //   left: -100px !important;
    // }
  }
}
</style>