webpackJsonp([6],{UP5B:function(e,i){},hwbG:function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=t("//Fk"),a=t.n(n),s=t("MArX"),o={name:"UserInfo",data:function(){return{localImg:localStorage.getItem("defaultImage"),radioGender:"0",imageUrl:"",actionUrl:"",userInfoRes:{email:"",gender:2,head_logo:"",nickname:"",passport:"",password:""},isModify:{nickname:!0,email:!0},passwordIsModify:!1,outOfIndex:{head_logo_index:2},input:{nickname:"",email:""},modifyItem:["email","gender","head_logo","nickname","passport","password"],newPassportItem:"",newPassportItem2:""}},methods:{changeGender:function(e){var i=this,t={gender:e};Object(s.h)(t).then(function(t){i.userInfoRes.gender=e})},getBase64:function(e){return new a.a(function(i,t){var n=new FileReader,a="";n.readAsDataURL(e),n.onload=function(){a=n.result},n.onerror=function(e){t(e)},n.onloadend=function(){i(a)}})},getFile:function(e,i){var t=this;this.getBase64(e.raw).then(function(e){t.userInfoRes.head_logo=e;var i={HeadLogo:t.userInfoRes.head_logo};Object(s.f)(i).then(function(e){})})},modifyInfo:function(e){"nickname"==e&&(this.isModify.nickname=!1),"email"==e&&(this.isModify.email=!1)},cancelModify:function(e){"nickname"==e&&(this.isModify.nickname=!0),"email"==e&&(this.isModify.email=!0)},confirmModify:function(e){var i=this;if("email"==e){var t={email:this.input.email};Object(s.g)(t).then(function(e){0==e.code?i.userInfoRes.email=i.input.email:window.alert("修改邮箱失败，失败原因如下:\n "+e.message)}),this.isModify.email=!0}if("nickname"==e){var n={nickname:this.input.nickname};Object(s.i)(n).then(function(e){console.log(e),0==e.code?i.userInfoRes.nickname=i.input.nickname:window.alert("修改昵称失败，失败原因如下:\n "+e.message)}),this.isModify.nickname=!0}},goBack:function(){this.$router.push("home")}},created:function(){var e=this;Object(s.e)().then(function(i){e.userInfoRes=i.data,e.userInfoRes.password="暂不支持修改",e.radioGender=""+e.userInfoRes.gender})}},r={render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{staticClass:"classbody",style:{backgroundImage:"url("+e.localImg+")"}},[t("div",{staticClass:"outer-userinfo"},[t("div",{staticClass:"go-back",on:{click:e.goBack}},[t("span",{staticClass:"iconfont icon-fanhui"})]),e._v(" "),t("div",{staticClass:"item-outer"},[t("el-upload",{staticClass:"avatar-uploader",attrs:{action:"thisIsElementUIBug","show-file-list":!1,"on-change":e.getFile}},[e.userInfoRes.head_logo?t("img",{ref:"phoUrl",staticClass:"avatar",attrs:{src:e.userInfoRes.head_logo}}):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),t("div",{staticClass:"part-outer"},[t("div",{staticClass:"email-item item-outer"},[t("span",{staticClass:"itme-key item-inner"},[e._v("昵称：")]),e._v(" "),e.isModify.nickname?t("div",{staticClass:"modify-item"},[t("span",{staticClass:"itme-value item-inner"},[e._v(e._s(e.userInfoRes.nickname))]),e._v(" "),t("button",{on:{click:function(i){return e.modifyInfo("nickname")}}},[e._v("修改")])]):t("div",{staticClass:"modify-item"},[t("input",{directives:[{name:"model",rawName:"v-model:value",value:e.input.nickname,expression:"input.nickname",arg:"value"}],attrs:{type:"text",placeholder:e.userInfoRes.nickname},domProps:{value:e.input.nickname},on:{input:function(i){i.target.composing||e.$set(e.input,"nickname",i.target.value)}}}),e._v(" "),t("button",{on:{click:function(i){return e.cancelModify("nickname")}}},[e._v("取消")]),e._v(" "),t("button",{on:{click:function(i){return e.confirmModify("nickname")}}},[e._v("确定")])])]),e._v(" "),t("div",{staticClass:"gender-item item-outer"},[t("span",{staticClass:"itme-value item-inner"},[e._v("性别：")]),e._v(" "),t("el-radio-group",{on:{change:e.changeGender},model:{value:e.radioGender,callback:function(i){e.radioGender=i},expression:"radioGender"}},[t("el-radio",{staticClass:"radio",attrs:{label:"0"}},[e._v("男")]),e._v(" "),t("el-radio",{staticClass:"radio",attrs:{label:"1"}},[e._v("女")]),e._v(" "),t("el-radio",{staticClass:"radio",attrs:{label:"2"}},[e._v("保密")])],1)],1),e._v(" "),t("div",{staticClass:"passport-item item-outer"},[t("span",{staticClass:"itme-key item-inner"},[e._v("账户：")]),e._v(" "),t("span",{staticClass:"itme-value item-inner"},[e._v(e._s(e.userInfoRes.passport))])]),e._v(" "),e._m(0),e._v(" "),t("div",{staticClass:"email-item item-outer"},[t("span",{staticClass:"itme-key item-inner"},[e._v("邮箱：")]),e._v(" "),e.isModify.email?t("div",{staticClass:"modify-item"},[t("span",{staticClass:"itme-value item-inner"},[e._v(e._s(e.userInfoRes.email))]),e._v(" "),t("button",{on:{click:function(i){return e.modifyInfo("email")}}},[e._v("修改")])]):t("div",{staticClass:"modify-item"},[t("input",{directives:[{name:"model",rawName:"v-model:value",value:e.input.email,expression:"input.email",arg:"value"}],attrs:{type:"text",placeholder:e.userInfoRes.email},domProps:{value:e.input.email},on:{input:function(i){i.target.composing||e.$set(e.input,"email",i.target.value)}}}),e._v(" "),t("button",{on:{click:function(i){return e.cancelModify("email")}}},[e._v("取消")]),e._v(" "),t("button",{on:{click:function(i){return e.confirmModify("email")}}},[e._v("确定")])])])]),e._v(" "),t("div")])])},staticRenderFns:[function(){var e=this.$createElement,i=this._self._c||e;return i("div",{staticClass:"password-item item-outer"},[i("span",{staticClass:"itme-key item-inner"},[this._v("密码：")]),this._v(" "),i("span",{staticClass:"itme-value item-inner"},[this._v("******")])])}]};var c=t("VU/8")(o,r,!1,function(e){t("UP5B")},"data-v-4eec1e18",null);i.default=c.exports}});
//# sourceMappingURL=6.3b45e8d38c684b225182.js.map