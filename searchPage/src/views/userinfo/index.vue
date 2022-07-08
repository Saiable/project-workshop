<template>
  <div class="classbody" :style="{backgroundImage:'url('+localImg+')'}">

    <div class="outer-userinfo">
      <div class="go-back" @click="goBack">
        <span class="iconfont icon-fanhui"></span>
      </div>
      <!--头像部分-->
      <div class="item-outer">
        <el-upload
          class="avatar-uploader"
          action="thisIsElementUIBug"
          :show-file-list="false"
          :on-change="getFile"
        >
          <img v-if="userInfoRes.head_logo" :src="userInfoRes.head_logo" class="avatar" ref="phoUrl">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="part-outer">
        <!--昵称-->
        <div class="email-item item-outer">
          <span class="itme-key item-inner">昵称：</span>

          <div v-if="isModify.nickname" class="modify-item">
            <span class="itme-value item-inner">{{userInfoRes.nickname}}</span>
            <button @click="modifyInfo('nickname')">修改</button>
          </div>
          <div v-else class="modify-item">
            <input type="text" :placeholder="userInfoRes.nickname" v-model:value="input.nickname">
            <button @click="cancelModify('nickname')">取消</button>
            <button @click="confirmModify('nickname')">确定</button>
          </div>

        </div>

        <!--性别-->
        <div class="gender-item item-outer">
          <span class="itme-value item-inner">性别：</span>

          <el-radio-group v-model="radioGender" @change="changeGender">
            <el-radio class="radio" label="0">男</el-radio>
            <el-radio class="radio" label="1">女</el-radio>
            <el-radio class="radio" label="2">保密</el-radio>
          </el-radio-group>
        </div>

        <!--账户-->
        <div class="passport-item item-outer">
          <span class="itme-key item-inner">账户：</span>
          <span class="itme-value item-inner">{{userInfoRes.passport}}</span>
        </div>

        <!--密码-->
        <div class="password-item item-outer">
          <span class="itme-key item-inner">密码：</span>
          <span class="itme-value item-inner">******</span>
        </div>

        <!--邮箱-->
        <div class="email-item item-outer">
          <span class="itme-key item-inner">邮箱：</span>

          <div v-if="isModify.email" class="modify-item">
            <span class="itme-value item-inner">{{userInfoRes.email}}</span>
            <button @click="modifyInfo('email')">修改</button>
          </div>
          <div v-else class="modify-item">
            <input type="text" :placeholder="userInfoRes.email" v-model:value="input.email">
            <button @click="cancelModify('email')">取消</button>
            <button @click="confirmModify('email')">确定</button>
          </div>

        </div>

      </div>


      <div>
        <!--<div v-for="(val, key, index) in userInfoRes">-->
        <!--  &lt;!&ndash;过滤掉头像框字段&ndash;&gt;-->
        <!--  <div v-if="key != 'head_logo'">-->
        <!--    <el-row class="every-line">-->
        <!--      &lt;!&ndash;显示所有的key&ndash;&gt;-->
        <!--      <el-col :span="12">-->
        <!--        <div class="grid-content bg-purple">-->
        <!--          {{key}}-->
        <!--        </div>-->
        <!--      </el-col>-->
        <!--      &lt;!&ndash;判定是否点击修改，显示修改按钮&ndash;&gt;-->
        <!--      <div v-if="!isModify[index]">-->
        <!--        &lt;!&ndash;判定是否是性别字段&ndash;&gt;-->
        <!--        <div v-if="key == 'gender'">-->
        <!--          &lt;!&ndash;{{userInfoRes.gender}}&ndash;&gt;-->
        <!--          <el-radio-group v-model="radioGender" @change="changeGender">-->
        <!--            <el-radio class="radio" label="0">男</el-radio>-->
        <!--            <el-radio class="radio" label="1">女</el-radio>-->
        <!--            <el-radio class="radio" label="2">保密</el-radio>-->
        <!--          </el-radio-group>-->

        <!--        </div>-->
        <!--        &lt;!&ndash;不是性别字段，显示为input输入框&ndash;&gt;-->
        <!--        <div v-else>-->
        <!--          <el-col :span="6">-->
        <!--            <div class="grid-content bg-purple-light">-->
        <!--              {{val}}-->
        <!--            </div>-->
        <!--          </el-col>-->
        <!--        </div>-->


        <!--        &lt;!&ndash;判定账户，密码两个字段，如果是，隐藏修改按钮，因为不支持修改&ndash;&gt;-->
        <!--        <div v-if="key == 'passport' || key == 'password' || key == 'gender'">-->

        <!--        </div>-->
        <!--        &lt;!&ndash;其他字段，显示修改按钮&ndash;&gt;-->
        <!--        <div v-else>-->
        <!--          <el-col :span="6">-->
        <!--            <button @click="modifyInfo(index)">-->
        <!--              <i class="el-icon-edit el-input__icon"></i>-->
        <!--              修改-->
        <!--            </button>-->
        <!--          </el-col>-->
        <!--        </div>-->

        <!--      </div>-->

        <!--      &lt;!&ndash;点击了修改，呈现的结构&ndash;&gt;-->

        <!--      <div v-else>-->
        <!--        <div v-if="!passwordIsModify">-->
        <!--          <el-col :span="6">-->
        <!--            <el-input v-model="input[index]" placeholder=""></el-input>-->
        <!--          </el-col>-->
        <!--          <el-col :span="6">-->
        <!--            <button @click="cancelModify(index)">-->
        <!--              <i class="el-icon-edit el-input__icon"></i>-->
        <!--              取消-->
        <!--            </button>-->

        <!--            <button @click="confirmModify(index)">-->
        <!--              <i class="el-icon-edit el-input__icon"></i>-->
        <!--              确定-->
        <!--            </button>-->
        <!--          </el-col>-->
        <!--        </div>-->
        <!--        <div v-else>-->
        <!--          <el-col :span="6">-->
        <!--            <el-input v-model="input[index]" placeholder="" :disabled="true"></el-input>-->
        <!--          </el-col>-->
        <!--          <el-col :span="6">-->
        <!--            <button @click="cancelModify(index)">-->
        <!--              <i class="el-icon-edit el-input__icon"></i>-->
        <!--              取消-->
        <!--            </button>-->

        <!--            <button @click="confirmModify(index)">-->
        <!--              <i class="el-icon-edit el-input__icon"></i>-->
        <!--              确定-->
        <!--            </button>-->
        <!--            <br>-->
        <!--          </el-col>-->
        <!--          <el-input v-model="newPassportItem" placeholder="请输入新密码" :disabled="true"></el-input>-->
        <!--          <el-input v-model="newPassportItem2" placeholder="请重复确认新密码" :disabled="true"></el-input>-->
        <!--        </div>-->


        <!--      </div>-->

        <!--    </el-row>-->


        <!--  </div>-->

        <!--</div>-->

      </div>
    </div>
  </div>
</template>

<script>

  import {
    getUserData,
    setEmailData,
    setNicknameData,
    setGenderData,
    setPassportData,
    setAvatorData,
  } from '@/api/userinfo';

  export default {
    name: "UserInfo",
    data() {
      return {
        localImg: localStorage.getItem('defaultImage'),
        radioGender: '0',
        // radio:"1",
        imageUrl: '', // 上传图片
        actionUrl: '',
        //请求数据后，会将下面的字段全部覆盖，这是只是做一个标识
        userInfoRes: {
          email: '',
          gender: 2,
          head_logo: '',
          nickname: '',
          passport: '',
          password: '',// 后端暂时没有传这个字段
        },
        // 用来判断哪一个属性需要修改
        isModify: {
          nickname: true,
          email: true
        },
        // html结构上，对头像属性单独处理
        passwordIsModify: false,
        outOfIndex: {
          head_logo_index: 2,
        },
        // 应该存储对应的value
        input: {
          nickname: '',
          email: '',
        },
        // 修改信息的辅助变量，根据index获得key，来判断发哪个请求
        modifyItem: [
          'email',
          'gender',
          'head_logo',
          'nickname',
          'passport',
          'password',// 密码，后端暂时没有这个字段
        ],
        newPassportItem: '',
        newPassportItem2: '',


      };
    },
    methods: {
      changeGender(value) {
        // console.log('change' + value)
        let genderData = {
          gender: value
        }
        setGenderData(genderData).then(res => {
          // console.log(res)
          this.userInfoRes.gender = value
        })
      },
      getBase64(file) {  //把图片转成base64编码
        return new Promise(function (resolve, reject) {
          let reader = new FileReader();
          let imgResult = "";
          reader.readAsDataURL(file);

          reader.onload = function () {
            imgResult = reader.result;
          };
          reader.onerror = function (error) {
            reject(error);
          };
          reader.onloadend = function () {
            resolve(imgResult);
          }
        })
      },
      getFile(file, fileList) {  //上传头像

        this.getBase64(file.raw).then(res => {
          this.userInfoRes.head_logo = res
          let avatarData = {
            HeadLogo: this.userInfoRes.head_logo
          }
          setAvatorData(avatarData).then(res => {
            // console.log(res)
          })
        })

      },

      modifyInfo(item) {
        // this.isModify = []
        // this.isModify[index] = true
        // if (this.modifyItem[index] == 'password') {
        //   this.passwordIsModify = true
        // }
        if (item == 'nickname') {
          this.isModify.nickname = false
        }
        if (item == 'email') {
          this.isModify.email = false

        }
      },
      cancelModify(item) {
        // this.isModify = false
        // this.passwordIsModify = false
        if (item == 'nickname') {
          this.isModify.nickname = true
        }

        if (item == 'email') {
          this.isModify.email = true
        }
      },
      confirmModify(item) {
        // console.log(localStorageAuth)

        // 将修改后的值，返回给后端数据库
        // console.log(index)
        // console.log(this.input[index])
        // 修改邮箱
        if (item == 'email') {
          let newEmailData = {
            "email": this.input.email
          }
          setEmailData(newEmailData).then(res => {
            // console.log(res)
            // 更新本地显示
            if (res.code == 0) {
                this.userInfoRes.email = this.input.email
            } else {
              window.alert("修改邮箱失败，失败原因如下:\n "+ res.message);
            }
            // this.userInfoRes.email = this.input.email
          })
          this.isModify.email = true
        }
        // 修改昵称
        if (item == 'nickname') {
          // this.input.nickname = this.userInfoRes.nickname
          let nickNameData = {
            "nickname": this.input.nickname
          }
          setNicknameData(nickNameData).then(res => {
            console.log(res);
            if (res.code == 0) {
                this.userInfoRes.nickname = this.input.nickname
            } else {
              window.alert("修改昵称失败，失败原因如下:\n "+ res.message);
            }

            // this.userInfoRes.nickname = this.input.nickname

          })
          this.isModify.nickname = true
        }

        // 修改性别
        // if(this.modifyItem[index] == 'gender') {
        //   let genderData = {
        //     gender: this.input[index]
        //   }
        //   modifyGenderInfo(localStorageAuth, genderData).then(res => {
        //     console.log(res)
        //     this.userInfoRes.gender = this.input[index]
        //   })
        // }
        // 修改密码
        // if (this.modifyItem[index] == 'passport') {
        //   let OldPassword = this.input[index]
        //   let Password = this.newPassportItem
        //   let Password2 = this.newPassportItem2
        //   let passportData = {
        //     OldPassword,
        //     Password,
        //     Password2,
        //   }
        //   if (this.newPassportItem == this.newPassportItem2) {
        //     setPassportData(localStorageAuth, passportData).then(res => {
        //       // console.log(res)
        //     })
        //   } else {
        //     alert('两次密码输入不相等')
        //     this.passwordIsModify = true
        //   }
        // }
        //点击确认，前端样式发生变化
        // this.passwordIsModify = false
      },

      goBack() {
        this.$router.push('home')
      }
    },

    created() {
      // console.log(localStorageAuth)
      getUserData().then(res => {
        this.userInfoRes = res.data
        this.userInfoRes['password'] = '暂不支持修改'
        this.radioGender = '' + this.userInfoRes['gender']
        // console.log(this.radio)
        // console.log(this.userInfoRes)
        // let num = 0
        // let temp = []

        // for (let item in this.userInfoRes) {
        //   this.isModify.push(false)
        //
        //   // console.log(this.userInfoRes,item,this.userInfoRes.email)
        //   // console.log(this.userInfoRes[item])
        //
        //   // 直接以item作为key，它拿不到数据，如下为中转方案
        //   // 不能用点的去取值，只能用[]的形式
        //   // temp.push(item)
        //   // let that_item = temp[num]
        //   // this.input[num] = this.userInfoRes[that_item]
        //   this.input.push(this.userInfoRes[item])
        //   if (item == 'head_logo') {
        //     this.outOfIndex.head_logo_index = num
        //     // console.log(this.outOfIndex.head_logo_index)
        //   }
        //   num += 1
        // }
        // console.log(this.input)

        // 把服务器的img数据，存到本地变量
        // console.log(this.input)

      })


    }
  }
</script>

<style scoped>
  @import "../../styles/views/userinfo/userinfo.css";
</style>
