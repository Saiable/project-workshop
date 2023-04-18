<script setup name="login">
</script>

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
              <!-- <Warning
                :validateResProps="validateRes.nickname"
                :isBlur="isBlur.nicknameBlur"
              ></Warning> -->
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
              <!-- <Warning
                :validateResProps="validateRes.passport"
                :isBlur="isBlur.passportBlur"
              ></Warning> -->
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
              <!-- <Warning
                :validateResProps="validateRes.password"
                :isBlur="isBlur.passwordBlur"
              ></Warning> -->
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
              <!-- <Warning
                :validateResProps="validateRes.password2"
                :isBlur="isBlur.password2Blur"
              ></Warning> -->
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
              <!-- <Warning
                :validateResProps="validateRes.loginInfoCheck"
                :isBlur="isBlur.loginInfoCheckBlur"
              ></Warning> -->
            </div>

            <div class="form-outer">
              <input
                type="password"
                v-model="loginUserInfo.password"
                autocomplete="off"
                placeholder="请输入密码"
                class="input"
              />
              <!-- <Warning
                :validateResProps="validateRes.loginInfoCheck"
                :isBlur="isBlur.loginInfoCheckBlur"
              ></Warning> -->
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

<style lang="scss">
/* 隐藏密码输入框的小眼睛 */
input[type="password"]::-ms-reveal {
  display: none;
}
:root {


  --max-width: 758px;
  --max-height: 420px;
  --button-radius: 0.7rem;

  --white: #e9e9e9;
  --grey: #333;
  --blue: #0367a6;
  --lightblue: #008997;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

}

.login-page {
  display: grid;
  place-items: center;
  align-items: center;

  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #e9e9e9;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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

.container {
  position: relative;
  overflow: hidden;

  width: 100%;
  max-width: 758px;
  height: 420px;
  border-radius: 0.7rem;
  background-color: #e9e9e9;

  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25);
}

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

.container.right-panel-active .container--signin {
  transform: translateX(100%);
}

.container--signup {
  left: 0;

  width: 50%;

  z-index: 1;
  opacity: 0;
}

.container.right-panel-active .container--signup {
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

.container.right-panel-active .container-overlay {
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
.container.right-panel-active .overlay {
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

.container.right-panel-active .overlay--left {
  transform: translateX(0);
}

.overlay--right {
  right: 0;

  transform: translateX(0);
}

.container.right-panel-active .overlay--right {
  transform: translateX(20%);
}

.btn {
  padding: 0.9rem 4rem;
  border-radius: 20px;
  border: 1px solid #0367a6;
  background-color: #0367a6;
  background-image: linear-gradient(90deg,#0367a6 0%,#008997 74%);

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

.input {
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.9rem 0.9rem;
  border: none;
  background-color: #fff;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.go-back {
  display: inline;
  position: absolute;
  right: 1rem;
  top: 1rem;

  color: black;

  z-index: 999;
}

.go-back:hover {
  color: #3a8ee6;

  cursor: pointer;
}

.go-back i.icon-fanhui {
  font-size: 26px;
  color: #008997;

}

.form-outer {
  position: relative;
  width: 100%;
}


.item {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  
  right: 10px;
}
</style>