<template>
  <div class="input-index" v-show="inputIndexIsShow">
    <!--input结构-->
    <input
      type="text"
      :class="{ focus: $store.state.isClick.input }"
      class="my-input z-300"
      placeholder="Search Suggestions"
      ref="myinput"
      v-model="searchInput"
      @click="inputIsClick"
      @click.once="activeDefaultUrl"
      @keyup.enter="enterToSearchResult($event)"
      @keyup.up.prevent="changeUpItem"
      @keyup.down="changeDownItem"
      @keyup.esc="clearInput"
    />

    <span
      class="btnsearch z-400 iconfont icon-sousuo"
      v-show="this.$store.state.isClick.input"
      @click="clickSearchActive"
    >
    </span>

    <a :href="currentTranslation + searchInput" target="_blank">
      <span
        class="tarns-icon z-400 iconfont icon-Translate"
        v-show="this.$store.state.isClick.input"
      >
      </span>
    </a>

    <!-- 搜索引擎模块-->
    <!--<transition-group-->
    <!--    name="animate__animated animate__bounce"-->
    <!--    enter-active-class="animate__fadeInDown"-->
    <!--    leave-active-class="animate__fadeOutUp">-->
    <div key="1" class="search-engine z-300" v-show="engineIsShow" @click.self="activeCover">
      <span
        v-for="(item, index) in searchIconSlideData"
        @click="selected(index)"
        class="egine-item"
        :class="iconActive == index ? 'selected' : ''"
        :key="index"
      >
        <img :src="item.searchLogo" :title="item.searchName" :alt="item.searchName"/>
      </span>
      <template v-show="stateAuth">
        <span class="egine-slider" v-if="!showMore">
          <i class="iconfont icon-normal" @click="showMore=true"></i>
        </span>
        <span class="egine-slider" v-else>
          <i class="iconfont icon-normal1" @click="showMore=false"></i>
        </span>

      </template>
    </div>

    <!--搜索结果的结构-->
    <div key="2" class="keyword z-300" id="keyword" v-show="searchInput" :class="(showMore&&isSlider) ? 'moreEgine': ''">
      <div class="advSuggest">
        <ul>
          <li
            v-for="(item, index2) in result"
            :key="index2"
            :class="currentIndex == index2 ? 'focus' : ''"
            @click="getInputFocus(item)"
          >
            <a :href="currentEngine + item" target="_blank">
              {{ item }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!--搜索结果的搜索记录-->
    <div key="3" class="keyword z-300" v-show="historyIsShow" :class="(showMore&&isSlider) ? 'moreEgine': ''">
      <div class="advSuggest">
        <ul>
          <li
            v-for="(item, index2) in getHistory"
            :key="index2"
            :class="currentIndex == index2 ? 'focus' : ''"
            class="search-item"
            @mouseover="currentDelIndex=index2"
            @mouseout="currentDelIndex=-1"
            @click="getInputFocus2(item, index2)"
          >
            <span v-show="currentDelIndex == index2" class="iconfont icon-shanchu1" @click.self.stop="deleteSearchHistory(item)"></span>
            <a target="_blank" @click="delayUpdate(item, index2)">
              {{ item }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!--</transition-group>-->

  </div>
</template>

<script>
import {INPUTCLICK, COVERCLICK, SETSEARCHHISTORY} from "@/store/mutation-types";
import {getSearchData, getSearchIconData, addEngineUrl, defalutEngine} from "@/api/home";
import {getUserConfig} from "@/api/userinfo";
import {Message} from 'element-ui'
import {_debounce} from '@/utils/debounce'
import 'animate.css'
export default {
  name: "InputIndex",

  data() {
    return {
      searchInput: "", // 动态绑定用户输入的值
      result: [], // 存储搜索结果
      searchIconData: [], //  getSearchIconData触发，存储搜索引擎接口全部数据
      searchUrl: [], //  存储每个搜索引擎对象，，赋值解构searchIconData
      currentEngine: "", //  selected触发，存储当前搜索引擎
      currentTranslation: "", //  selected触发，存储当前翻译链接
      linkToinput: "", //  控制input回车跳转
      mouseOverActive: false, //  控制hover的触发
      iconActive: 0, //  控制被选中的搜索引擎，和index比较，动态绑定选中样式的类
      currentIndex: -1, //  控制搜索结果的index
      keyboardItem: "", //  存储键盘选择的值
      config: { // 存储用户的配置信息
        Vague: 1,
        SwitchWallpaper: 1,
        Engine: 1,
        Navigation: 1,
        SearchHistory: 1,
        BlankOrSelf: 1
      },
      localAuth: this.$store.state.token.userAuth, // 通过getter获取到本地认证
      //localAuth: localStorage.getItem('Authorization')
      engineNum: 0,
      showMore: false,  // 控制overflow类名
      showMoreVisible: true, // 控制三个点的图标的显隐
      searchHistory: eval(this.$store.state.searchHistory.searchHistory) || [], // localstorage获取到的是字符串
      showHistory: false,
      currentDelIndex: -1,
    };
  },
  watch: {
    searchInput: function (val) {
      // 如果是通过键盘选择的，不用重新发送请求
      if (this.currentIndex == -1 && this.searchInput.length > 0) {
        this.getSearchData(val);
      }
      // 如果input框中的值，相比较之前发生了变化，就重新发送请求
      else if (
        this.searchInput.length > 0 &&
          this.searchInput != this.keyboardItem
      ) {
        this.currentIndex = -1;
        this.getSearchData(val);
      }
      // 重置状态
      else if (this.searchInput.length == 0) {
        this.currentIndex = -1;
        this.keyboardItem = "";
      }
    },

    stateAuth: function (newValue, oldValue) {
      console.log('auth变化了')
      console.log('newValue', newValue)
      console.log('oldValue', oldValue)
      if (oldValue) {
        this.getDefaultIconData()
      }
    },
  },
  computed: {
    inputIndexIsShow() {
      return !this.$store.state.isClick.time;
    },
    engineIsShow() {
      return this.$store.state.isClick.input;
    },
    stateAuth() {
      return this.$store.state.token.userAuth
    },
    searchIconSlideData() {
      if (this.showMore) {
        return this.searchIconData
      } else {
        return this.searchIconData && this.searchIconData.slice(0, 5)
      }
    },
    isSlider() {
      return this.engineNum > 14 ? true : false
    },
    getHistory() {
      let localHistory = this.$store.state.searchHistory.searchHistory
      //console.log('history',this.$store.state)
      //console.log(this)
      if (typeof localHistory == "string") {
        return eval(localHistory) || []
      }
    },
    historyIsShow() {
      return this.$store.state.isClick.input && !this.searchInput && this.config.SearchHistory;
    }
  },

  created() {
    this.initData();
  },
  updated() {
    // 保证回到首页input有值时，会清空
    if (!this.$store.state.isClick.input) {
      this.searchInput = "";
    }

  },
  methods: {
    clearInput() {
      this.searchInput=''
    },
    activeCover() {
      //console.log('aa')
      // 向外传递cover被点击了
      this.$store.commit(COVERCLICK)
    },
    initData() {
      this.getUserConfig()

      if (this.stateAuth) {
        this.getSearchIconData()
      } else {
        this.getDefaultIconData()
        console.log('default')
      }
      //localStorage.setItem('searchHistory', [])
      //if(localHistroy) {
      //    this.
      //}
    },
    getUserConfig() {
      //const localAuth = this.$store.state.token.userAuth
      if (this.stateAuth) {
        getUserConfig().then(res => {
          this.config = res.data
          console.log('userconfig', this.config)
        })
      } else {
        this.config = {
          Vague: 1,
          SwitchWallpaper: 1,
          Engine: 1,
          Navigation: 1,
          SearchHistory: 1,
          BlankOrSelf: 1
        }
      }

    },
    // 封装根据搜索关键词获取信息接口
    getSearchData: _debounce(function (params) {
      getSearchData(params).then(
        (res) => {
          // console.log(res)
          this.result = res.data;
        },
        (error) => {
          console.log(error);
        }
      );
      }, 300),
    //getSearchData (params) {
    //    getSearchData(params).then(
    //        (res) => {
    //            // console.log(res)
    //            this.result = res.data;
    //        },
    //        (error) => {
    //            console.log(error);
    //        }
    //    );
    //},
    // 封装获取搜索引擎信息接口
    getSearchIconData() {
      getSearchIconData().then(
        (res) => {
          console.log('enginedData', res);
          //if (!this.showMore && res.data) {
          //    this.searchFullData = res.data
          //    this.searchIconData = res.data.slice(0, 5);
          //    this.searchUrl = [...res.data];
          //}
          // 搜索引擎是可配置的了，如果设置不显示默认搜索引擎，res.data结果就是null，需要做一下分支处理
          if (res.data) {
            this.engineNum = res.data.length
            this.searchIconData = res.data;
            this.searchUrl = [...res.data];
          }

        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDefaultIconData() {
      defalutEngine().then(res => {
        console.log('default Icon', res)
        if (res.data) {
          this.searchIconData = res.data;
          this.searchUrl = [...res.data];
        }
      }, error => {
          console.log(error)
        })
    },
    // 传递input被点击了状态
    inputIsClick() {
      this.$store.commit(INPUTCLICK);
      // 登录用户注销后，重置搜索引擎

      console.log('input-click')
      if (!this.searchInput) {
        console.log('输入值为空，调出搜索历史')
      }
      //if(!this.$store.state.token.userAuth) {
      //    console.log('refresh icondata')
      //    this.getDefaultIconData()
      //}
    },
    // 初始化激活选中第一个搜索引擎，只激活一次
    activeDefaultUrl() {
      this.selected(0);
    },
    // 操作其他对象时调用，保持input的focus状态，保证可以一直可以用键盘操作上下键
    getInputFocus(item) {
      this.$refs.myinput.focus();
      console.log(item)
      this.saveSearchHistory(item)
    },
    getInputFocus2(item, index2) {
      this.$refs.myinput.focus();
      //this.updateSearchHistory(item, index2)
    },
    selected(index) {
      this.getInputFocus();
      this.iconActive = index; // 动态绑定选中的类

      // 更新搜索引擎链接和翻译链接
      this.currentEngine = (this.searchIconData || this.config.Engine) ? this.searchUrl[index].searchUrl : "https://www.baidu.com/s?ie=utf-8&word="; // 保存选中的搜索引擎
      this.currentTranslation = (this.searchIconData || this.config.Engine) ? this.searchUrl[index].translateUrl : "https://fanyi.baidu.com/#auto/zh/"; // 保存对应的翻译链接
    },
    deleteSearchHistory(item) {

      for(let i = 0; i < this.searchHistory.length; i++){
        if(this.searchHistory[i] === item ) {
          this.searchHistory.splice(i, 1)
          break
        }
      }

      let historyRecord = JSON.stringify(this.searchHistory)
      this.$store.commit(SETSEARCHHISTORY, historyRecord)
      console.log('删除历史记录',this.searchHistory)
    },
    delayUpdate(item, index2) {
     // setTimeout(() => {
    //    this.updateSearchHistory(item, index2)
    //  }, 0); 
      //this.updateSearchHistory(item, index2)
      window.open(this.currentEngine + item ,'_blank')
      this.updateSearchHistory(item, index2)
    },
    updateSearchHistory(item, index2) {
      // console.log('开始更新搜索记录')
      // console.log('item, index2',item, index2,this.searchHistory)
      for(let i = 0; i < this.searchHistory.length; i++){
        if(this.searchHistory[i] === item ) {
          this.searchHistory.splice(i, 1)
          break
        }
      }
      this.searchHistory.unshift(item)
      console.log('移到前面之后', this.searchHistory)

      let historyRecord = JSON.stringify(this.searchHistory)
      this.$store.commit(SETSEARCHHISTORY, historyRecord)
    },
    saveSearchHistory(query) {
      //  console.log('开始存储记录')
      if (query) {
        if (this.searchHistory.length <= 9) { // 最多只记录10条搜索记录

          //this.searchHistory = localStorage.getItem('searchHistory')
          //console.log(this.searchHistory,typeof this.searchHistory)
          this.searchHistory.unshift(query)
          console.log('历史',typeof this.searchHistory, this.searchHistory)
          this.searchHistory = [...new Set(this.searchHistory)]

          let historyRecord = JSON.stringify(this.searchHistory)
          this.$store.commit(SETSEARCHHISTORY, historyRecord)

        } else {
          let newHistory = this.searchHistory.slice(0, 9)
          this.searchHistory = newHistory

          this.searchHistory.unshift(query)
          this.searchHistory = [...new Set(this.searchHistory)]

          let historyRecord = JSON.stringify(this.searchHistory)
          this.$store.commit(SETSEARCHHISTORY, historyRecord)
        }
      }

    },
    enterToSearchResult($event) {
      // 回车，进行搜索
      if (this.searchInput.length > 0) {
        if ($event.altKey && $event.keyCode == 13) {

          window.open(this.currentTranslation + this.searchInput);
        } else {
          // currentEngine是select时更新，searcheInput是v-model动态更新
          window.open(this.currentEngine + this.searchInput);
        }
      }

      console.log('存储搜索结果')

      this.saveSearchHistory(this.searchInput)


    },
    changeDownItem() {
      if (this.searchInput.length > 0) {
        this.currentIndex++;
        // 往下的选择选择循环，重新回到第一个
        if (this.result.length) {
          if (this.currentIndex == this.result.length) {
            this.currentIndex = 0;
          }
        }

        // 每一次选择，把之前存的选择结果，显示在输入框中
        this.searchInput = this.result[this.currentIndex];
        // 把选择结果，另存一份，做重新搜索时的对照变量（watch中会用到）
        this.keyboardItem = this.searchInput;
      }
    },
    changeUpItem() {
      if (this.searchInput.length > 0 && this.currentIndex > -1) {
        this.currentIndex--;
        // 往上的选择选择循环，重新回到最后一个
        if (this.result) {
          if (this.currentIndex == -1) {
            this.currentIndex = this.result.length - 1;
          }
        }

        this.searchInput = this.result[this.currentIndex];
        this.keyboardItem = this.searchInput;
      }
    },
    clickSearchActive() {
      this.getInputFocus();
      window.open(this.currentEngine + this.searchInput);
    },

    showEngine() {
      this.showMore = true
      this.showMoreVisible = false
    },
    hiddenEngine() {
      this.showMoreVisible = true
      // 需要弄一个延时的api
      this.showMore = false
    },

  },
};
</script>

<style scoped>
@import "../../../styles/views/home/input-index.css";

</style>
