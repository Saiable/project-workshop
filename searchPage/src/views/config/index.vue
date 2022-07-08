<template>
  <div class="classbody" :style="{ backgroundImage: 'url(' + localImg + ')' }">
    <div class="switch-container">
      <div class="go-back" @click="goBack">
        <span class="iconfont icon-fanhui"></span>
      </div>
      <el-switch
        class="switch"
        v-model="vague"
        inactive-text="模糊效果"
        active-text=""
      >
      </el-switch>
      <!--        <el-switch-->
      <!--          class="switch switch2"-->
      <!--          v-model="switchWallpaper"-->
      <!--          inactive-text="固定背景"-->
      <!--          active-text="随机背景">-->
      <!--        </el-switch>-->
      <div class="engine-settings-outer">
        <el-switch
          class="switch"
          v-model="engine"
          inactive-text="默认引擎"
          active-text=""
        >
        </el-switch>
        <span class="more-settings" @click="moreSettings">更多设置</span>
      </div>

      <!--修改搜索引擎的弹窗-->
      <el-dialog
        :title="dialogName"
        :visible.sync="engineVisible"
        width="43%"
        class="engine-outer"
        ref="engineSetting"
      >
        <span class="add-engine" @click="changeText" v-text=" !addEngine? ' + 新增引擎': '取消'"></span>
        <div class="modify-outer " v-show="addEngine">
          <el-row v-show="!modifyMenuVisible">
            <el-col :span="2">引擎:</el-col>
            <el-col :span="18">
              <el-select v-model="selectEngineValue" placeholder="请选择" clearable @change="changeSelect"
                         @clear="clearValue">
                <el-option
                  v-for="(item, index) in engineValue"
                  :key="item.id"
                  :label="item.searchName"
                  :value="index"

                >
                  <span style="float: left">{{ item.searchName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px" class="engine-icon-outer">
                    <img :src="item.searchLogo" alt="图标">
                  </span>
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">图标:</el-col>
            <el-col :span="18">
              <el-input placeholder="图标" v-model="engineIcon" class="icon-img">
                <img :src="engineIcon" alt="" slot="suffix">
                <!--<i slot="suffix" class="el-input__icon el-icon-date"></i>-->
              </el-input>
            </el-col>
            <el-col :span="4">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">翻译:</el-col>
            <el-col :span="18">
              <el-input placeholder="输入翻译地址" v-model="translateUrl" class="icon-img">
                <!--<img :src="engineIcon" alt="" slot="suffix">-->
                <!--<i slot="suffix" class="el-input__icon el-icon-date"></i>-->
              </el-input>
            </el-col>
            <el-col :span="4">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">URL:</el-col>
            <el-col :span="18">
              <el-input placeholder="输入链接地址" v-model="engineUrl"></el-input>
            </el-col>
            <el-col :span="4">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">名称:</el-col>
            <el-col :span="18">
              <el-input
                placeholder="输入名称"
                v-model="engineName"
                maxlength="50"
                show-word-limit
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="addEngineUrl" v-if="!modifyMenuVisible">确定</el-button>
              <el-button type="primary" @click="confirmModifyEngine" v-else>确定</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="content-outer">
          <div class="custom-content" v-if="true" v-for="(item, index) in personalEngineValue" :key="item.id" title="长按可上下拖拽">
            <el-row class="person-egine-outer">
              <el-col :span="2" class="person-engine-logo">
                <span class="img-outer">
                  <img :src="item.searchLogo" alt="" class="person-engine-item">
                </span>
              </el-col>
              <el-col :span="20" class="person-engine-text">{{item.searchName}}</el-col>
              <el-col :span="2" class="modify-engine-outer">
                <el-popover
                  trigger="click"
                  @show="showPopver"
                  @hide="hidePopver"
                  popper-class="remove-popover"
                  :popper-class=" popoverHeight ? 'setheightPopover' : ''"
                >
                  <ul class="modify-engine-item">
                    <li @click="getEngineInfo(item)">修改</li>
                    <li @click="deleteEngineInfo(item)">删除</li>
                  </ul>
                  <span slot="reference" class="iconfont icon-gengduo modify-engine"></span>
                  <!--<el-button slot="reference" class="iconfont icon-gengduo modify-engine"></el-button>-->

                </el-popover>
              </el-col>
            </el-row>
          </div>
          <div class="empty-content" v-else>
            <span>点击右上角快去添加吧</span>
          </div>
        </div>

      </el-dialog>

      <el-switch
        class="switch"
        v-model="navigation"
        inactive-text="菜单导航"
        active-text=""
      >
      </el-switch>
      <el-switch
        class="switch"
        v-model="searchHistory"
        inactive-text="搜索历史"
        active-text=""
      >
      </el-switch>
      <el-switch
        class="switch"
        v-model="blankOrSelf"
        inactive-text="新标签页"
        active-text=""
      >
      </el-switch>
    </div>
  </div>
</template>

<script>
    import {getUserConfig, setUserConfig, engineSort} from "@/api/userinfo";
    import {addEngineUrl, defalutEngine, getSearchIconData, modifyEngineUrl, deleteEngineUrl} from "@/api/home";
    import {Message} from 'element-ui'
    import {
        getUrlData
    } from "@/api/navigations";
    import Sortable from 'sortablejs'
    import { mixins } from "@/mixins/index"
    export default {
        mixins: [mixins], // swap()
        data() {
            return {
                localImg: localStorage.getItem("defaultImage"),
                // 初始化时存储后端的配置信息
                config: {
                    Vague: 1,
                    SwitchWallpaper: 1,
                    Engine: 1,
                    Navigation: 1,
                    SearchHistory: 1,
                    BlankOrSelf: 1
                },

                vague: true, // 是否高斯模糊
                switchWallpaper: true, // 刷新浏览器是否更换图片
                engine: true, // 是否显示默认引擎
                navigation: true, // 是否显示默认导航菜单
                searchHistory: true, // 是否显示搜索记录
                blankOrSelf: true, // 是否新标签跳转

                modifyVague: 1,
                modifySwitchWallpaper: 1,
                modifyEngine: 1,
                modifyNavigation: 1,
                modifySearchHistory: 1,
                modifyBlankOrSelf: 1,

                engineVisible: false, // 搜索引擎的弹窗
                addEngine: false, // 修改搜索引擎的弹窗
                engineUrl: '', // 输入的URL
                engineName: '', // 输入的名称
                engineIcon: '', // 输入的icon
                selectEngineValue: '', // 选择框双向绑定的值
                engineValue: [], // 存储获取到的engien数据
                defaultEngineLength: 0,
                addErrorMessage: '', // 添加失败时候的信息
                translateUrl: '', // 翻译的
                personalEngineValue: [], // 存储用户自己定义的engine信息
                modifyMenuVisible: false, // 控制新增或修改的button按钮，
                currentId: 0, // 存储修改时的入参id
                popoverHeight: false, // 动态绑定了popover的动态高度
                dialogName: '设置',
                beforeSortedId: [], // 排序前的id
                //sortedId: [], // 排序后的id
            };
        },
        methods: {
            moreSettings() {
                this.engineVisible = true
                let _this = this
                setTimeout(function () {
                    _this.initSort()
                }, 1000)
                //this.initSort()
            },
            engineSort(data) {
                engineSort(data).then(res => {
                    console.log('sort',res)
                }, error => {
                    console.log(error)
                })
            },
            initSort() {
                //const el = this.$refs.sortEl
                //console.log(this)
                const el = document.querySelector(".content-outer")
                console.log('el', el)
                new Sortable(el, {
                    onEnd: (evt) => {
                        //console.log(this)
                        //console.log('old', evt.oldIndex)
                        //console.log('new', evt.newIndex)
                        console.log('移动前',this.beforeSortedId)
                        this.swap(this.beforeSortedId, evt.oldIndex, evt.newIndex)
                        console.log('移动后',this.beforeSortedId)
                        Message({
                            message: '移动成功',
                            type: 'success'
                        })
                        let data = {
                            id_list: this.beforeSortedId
                        }
                        this.engineSort(data)

                    }
                })
            },
            getUrlData(params) {
                getUrlData(params).then(res => {
                    console.log('自定义引擎', res)
                    if (res.code == 0) {
                        this.engineIcon = res.data.icon
                        this.engineName = res.data.title
                    }
                }, error => {
                    console.log(error)
                })
            },
            changeText() {
                this.addEngine = !this.addEngine
                if (this.addEngine) {
                    this.dialogName = '新增引擎'
                    this.engineUrl = ''
                    this.engineName = ''
                    this.engineIcon = ''
                    this.translateUrl = ''
                } else {
                    this.dialogName = '设置'
                    this.modifyMenuVisible = false
                }
            },
            showPopver() {
                console.log('showpopover')
            },
            hidePopver() {
                console.log('hidepopver')
                setTimeout(() => {
                    this.popoverHeight = false

                }, 500)

            },
            setPopover() {
                console.log('pop')
            },
            confirmModifyEngine() {

                console.log('modify-engine')
                this.modifyMenuVisible = false
                let data = {
                    search_url: this.engineUrl,
                    search_name: this.engineName,
                    search_logo: this.engineIcon,
                    translate_url: this.translateUrl,
                    id: this.currentId
                }
                this.modifyEngineUrl(data)

                this.addEngine = false

            },
            // 获取修改前置参数
            getEngineInfo(item) {
                this.addEngine = true
                this.modifyMenuVisible = true
                this.popoverHeight = true
                this.dialogName = '修改引擎'
                console.log(item)
                this.engineUrl = item.searchUrl
                this.engineName = item.searchName
                this.engineIcon = item.searchLogo
                this.translateUrl = item.translateUrl

                this.currentId = item.id


            },
            // 删除引擎
            deleteEngineInfo(item) {
                let data = {
                    id: item.id
                }

                deleteEngineUrl(data).then(res => {
                    if (res.code == 0) {
                        Message({
                            message: '删除成功',
                            type: 'success'
                        })

                        this.getSearchIconData()

                    }
                })
            },
            goBack() {
                this.$router.push("home");
            },
            // 添加搜索引擎URL
            addEngineUrl() {
                let data = {
                    search_url: this.engineUrl,
                    search_name: this.engineName,
                    search_logo: this.engineIcon,
                    translate_url: this.translateUrl,
                }

                this.checkEmpty && addEngineUrl(data).then(res => {
                    console.log('新增Engine', res)
                    if (res.code == 0) {

                        Message({
                            message: '添加成功',
                            type: 'success'
                        })

                        this.addEngine = false
                        this.getSearchIconData()
                        this.dialogName = '设置'

                    }
                    if (res.code === 1) {
                        Message({
                            message: '添加失败！ ' + res.message,
                            type: 'warning'
                        })
                    }
                }, error => {
                    console.log(error)
                })
            },
            // 修改搜索引擎
            modifyEngineUrl(data) {
                modifyEngineUrl(data).then(res => {
                    console.log(res)
                    if (res.code == 0) {
                        Message({
                            message: '修改成功',
                            type: 'success'
                        })
                        this.getSearchIconData()
                        this.dialogName = '设置'

                    }
                    if (res.code === 1) {
                        Message({
                            message: '修改失败！ ' + res.message,
                            type: 'warning'
                        })
                    }
                }, error => {
                    console.log(error)
                })
            },
            getDefaultIconData() {
                defalutEngine().then(res => {
                    console.log('default Icon', res)
                    if (res.data) {
                        this.engineValue = res.data;
                        this.defaultEngineLength = res.data.length
                    }
                }, error => {
                    console.log(error)
                })
            },
            getSearchIconData() {
                getSearchIconData().then(res => {
                    //console.log('已添加', res)
                    let engineLength = res.data.length
                    if (this.engine) {
                        this.personalEngineValue = res.data.slice(0, engineLength - this.defaultEngineLength)
                    } else {
                        this.personalEngineValue = res.data
                    }
                    console.log('自定义的数据', res.data)
                    for (let i = 0; i < engineLength; i++) {
                        this.beforeSortedId.push(res.data[i].id)
                    }
                    //console.log('this.beforSortedId', this.beforeSortedId)
                }, error => {
                    console.log(error)
                })
            },
            changeSelect() {
                console.log('index')
                console.log(this.currentValue)
                if (this.currentValue) {
                    this.engineUrl = this.currentValue.searchUrl
                    this.engineName = this.currentValue.searchName
                    this.engineIcon = this.currentValue.searchLogo
                    this.translateUrl = this.currentValue.translateUrl
                }

            },
            clearValue() {
                this.engineUrl = ''
                this.engineName = ''
                this.engineIcon = ''
                this.translateUrl = ''
            }

        },
        computed: {
            currentValue() {
                return this.engineValue[this.selectEngineValue]
            },
            checkEmpty() {
                return (this.engineUrl && this.engineName && this.engineIcon) ? true : false
            },
            //dialogName: {
            //    get: function () {
            //        if (this.addEngine) {
            //            return '添加引擎'
            //        } else if (this.modifyMenuVisible) {
            //            return '修改引擎'
            //        } else {
            //            return '设置'
            //        }
            //    },
            //    set: function (value) {
            //    }
            //
            //}
        },
        created() {
            // 初始化登录用户的配置
            const localAuth = this.$store.state.token.userAuth;
            localAuth &&
            getUserConfig().then(
                (res) => {
                    this.config = res.data;
                    // console.log(this.config);
                    // 接口返回的是0和1，用来和elementui的转换
                    this.vague = res.data.Vague == 0 ? false : true;
                    this.switchWallpaper = res.data.SwitchWallpaper == 0 ? false : true; // 已废弃
                    this.engine = res.data.Engine == 0 ? false : true;
                    this.navigation = res.data.Navigation == 0 ? false : true;
                    this.searchHistory = res.data.SearchHistory == 0 ? false : true;
                    this.blankOrSelf = res.data.BlankOrSelf == 0 ? false : true;

                    // 存储前端修改的值，并且vague和switchWallpaper动态变化时，会更新
                    // 同时更新数据库
                    // 这里多整一个modify的变量，是因为开始的变量用作接口数据库返回的值，不能用作计算
                    this.modifyVague = this.config.Vague;
                    this.modifySwitchWallpaper = this.config.SwitchWallpaper; // 已废弃
                    this.modifyEngine = this.config.Engine
                    this.modifyNavigation = this.config.Navigation
                    this.modifySearchHistory = this.config.SearchHistory
                    this.modifyBlankOrSelf = this.config.BlankOrSelf
                },
                (error) => {
                    console.log(error);
                }
            );

            this.getDefaultIconData() //用作选择默认的搜索引擎
            this.getSearchIconData() // 用作自定义搜索引擎

        },
        mounted() {
            //this.initSort()
        },
        watch: {
            engineUrl: function (val) {
                if (this.addEngine) {
                    if (this.selectEngineValue === '' && this.engineUrl) {
                        this.getUrlData(val)
                    }
                }
            },
            vague(newValue) {
                // elementUI是true or false的，接口是 1 或 0
                this.modifyVague = newValue ? 1 : 0;
                // 把按钮转换成值，存储到后台
                let configData = {
                    Vague: this.modifyVague,
                    SwitchWallpaper: this.modifySwitchWallpaper,
                    Engine: this.modifyEngine,
                    Navigation: this.modifyNavigation,
                    SearchHistory: this.modifySearchHistory,
                    BlankOrSelf: this.modifyBlankOrSelf
                };
                // 发送post给后台，更新前端的数据
                setUserConfig(configData).then(
                    (res) => {
                        console.log("modify config success", res);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            },
            engine(newValue) {
                // elementUI是true or false的，接口是 1 或 0
                this.modifyEngine = newValue ? 1 : 0;
                // 把按钮转换成值，存储到后台
                let configData = {
                    Vague: this.modifyVague,
                    SwitchWallpaper: this.modifySwitchWallpaper,
                    Engine: this.modifyEngine,
                    Navigation: this.modifyNavigation,
                    SearchHistory: this.modifySearchHistory,
                    BlankOrSelf: this.modifyBlankOrSelf
                };
                // 发送post给后台，更新前端的数据
                setUserConfig(configData).then(
                    (res) => {
                        console.log("modify config success", res);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            },
            navigation(newValue) {
                // elementUI是true or false的，接口是 1 或 0
                this.modifyNavigation = newValue ? 1 : 0;
                // 把按钮转换成值，存储到后台
                let configData = {
                    Vague: this.modifyVague,
                    SwitchWallpaper: this.modifySwitchWallpaper,
                    Engine: this.modifyEngine,
                    Navigation: this.modifyNavigation,
                    SearchHistory: this.modifySearchHistory,
                    BlankOrSelf: this.modifyBlankOrSelf
                };
                // 发送post给后台，更新前端的数据
                setUserConfig(configData).then(
                    (res) => {
                        console.log("modify config success", res);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            },
            searchHistory(newValue) {
                // elementUI是true or false的，接口是 1 或 0
                this.modifySearchHistory = newValue ? 1 : 0;
                // 把按钮转换成值，存储到后台
                let configData = {
                    Vague: this.modifyVague,
                    SwitchWallpaper: this.modifySwitchWallpaper,
                    Engine: this.modifyEngine,
                    Navigation: this.modifyNavigation,
                    SearchHistory: this.modifySearchHistory,
                    BlankOrSelf: this.modifyBlankOrSelf
                };
                //this.modifySearchHistory = this.config.SearchHistory
                //this.modifyBlankOrSelf = this.config.BlankOrSelf
                // 发送post给后台，更新前端的数据
                setUserConfig(configData).then(
                    (res) => {
                        console.log("modify config success", res);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            },
            blankOrSelf(newValue) {
                // elementUI是true or false的，接口是 1 或 0
                this.modifyBlankOrSelf = newValue ? 1 : 0;
                // 把按钮转换成值，存储到后台
                let configData = {
                    Vague: this.modifyVague,
                    SwitchWallpaper: this.modifySwitchWallpaper,
                    Engine: this.modifyEngine,
                    Navigation: this.modifyNavigation,
                    SearchHistory: this.modifySearchHistory,
                    BlankOrSelf: this.modifyBlankOrSelf
                };
                // 发送post给后台，更新前端的数据
                setUserConfig(configData).then(
                    (res) => {
                        console.log("modify config success", res);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            },
        },
    };
</script>

<style scoped>
  @import '../../styles/views/config/config.css'
</style>
