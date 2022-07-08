<template>
  <div v-show="isShow" class="navouter">
    <!-- 修改父导航的右键菜单栏 -->
    <div class="edit-parent-nav z-1000" v-if="localAuth && showContext" style="position: fixed"
         :style="{left: navContextLeft+'px',top: navContextTop + 'px'}">
      <!--            <span-->
      <!--                    class="edit iconfont icon-editor"-->
      <!--                    @click="modifyParentNavVisible = true"-->
      <!--            >修改</span>-->
      <span class="edit" @click="modifyParentNavVisible = true">修改</span>
      <!--            <span-->
      <!--                    class="delete iconfont icon-shanchu"-->
      <!--                    @click="NavDeleteVisible = true"-->
      <!--            >删除</span>-->
      <span class="delete" @click="NavDeleteVisible = true">删除</span>
    </div>
    <!--新增父导航的弹窗-->
    <el-dialog
        title="新增父导航"
        :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="父导航名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmParentNav" @keyup.enter="confirmParentNav">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改父导航的弹窗-->
    <el-dialog
        title="修改父导航"
        :visible.sync="modifyParentNavVisible">
      <el-form>
        <el-form-item label="父导航名称" :label-width="formLabelWidth">
          <el-input v-model="navFormName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyParentNavVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmModifyNav">确 定</el-button>
      </div>
    </el-dialog>
    <!--删除父导航对话框-->
    <el-dialog
        width="30%"
        title="确定删除？"
        :visible.sync="NavDeleteVisible"
    >
      <div slot="footer" class="dialog-footer">
        <el-button @click="NavDeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDeleteNav">确 定</el-button>
      </div>
    </el-dialog>
    <!--新增子导航弹窗-->
    <el-dialog
        title="新增子导航"
        :visible.sync="subDialogVisible">
      <el-form>
        <el-form-item label="网络地址：" :label-width="formLabelWidth">
          <el-input v-model="subFormName" autocomplete="off" placeholder="请粘贴网址">
            <!--<i slot="suffix" class="iconfont icon-url" @click="resolveURL"></i>-->
          </el-input>
        </el-form-item>
        <el-form-item label="默认名称：" :label-width="formLabelWidth">
          <el-input v-model="subFormTitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="默认图标：" :label-width="formLabelWidth">
          <el-input v-model="subFormIcon" autocomplete="off">
            <img v-show="subFormIcon" :src="subFormIcon" alt="" slot="suffix" class="suffix-icon">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="subDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSubNav">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改及删除子导航-->
    <el-dialog
        title="修改子导航"
        :visible.sync="subDelDialogVisible">
      <el-form>
        <el-form-item label="子导航地址" :label-width="formLabelWidth">
          <el-input v-model="urlFieldUrl" autocomplete="off" placeholder="请粘贴网址"></el-input>
        </el-form-item>
        <el-form-item label="子导航名称" :label-width="formLabelWidth">
          <el-input v-model="urlFieldName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="子导航图标" :label-width="formLabelWidth">
          <el-input v-model="urlFieldIcon" autocomplete="off">
            <img v-show="urlFieldIcon" :src="urlFieldIcon" alt="" slot="suffix" class="suffix-icon">
          </el-input>
        </el-form-item>
      </el-form>
      <!--删除子导航对话框-->
      <el-dialog
          width="30%"
          title="确定删除？"
          :visible.sync="subInnerDeleteVisible"
          append-to-body
      >
        <div slot="footer" class="dialog-footer">
          <el-button @click="subInnerDeleteVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmDeleteSubNav"
          >确 定
          </el-button
          >
        </div>
      </el-dialog>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteSubNav">删除子导航</el-button>
        <el-button @click="subDelDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmModifySubNav">确 定</el-button>
      </div>
    </el-dialog>

    <!--导航的搜索-->
    <input
        type="text"
        class="my-nav-input z-300"
        v-model="searchInput"
        placeholder="Search Navigations"
        @keyup.enter="enterToSearch($event)"
        @keyup.esc="deactiveSearch"
        @click="inputActive"
        ref="myinput"
        :class="!searchResVisible?'focus':''"
    />
    <!--导航-->
    <div class="navbox z-400" @click="hidenContext" v-if="searchResVisible">
      <!--新增父导航按钮-->
      <span v-if="localAuth" @click="addNavParent" class="iconfont icon-tianjia icon-myadd z-400"></span>
      <!--占位元素-->
      <!--<div class="occupy" style="width: 100px;height: 30px;background-color: orange"></div>-->
      <!--父导航开始-->
      <div class="menu-left">
        <!--每一项导航-->
        <div class="menu-item" v-for="(item, index) in navigationParentData" @click="getItemData(index)"
             @contextmenu.prevent="myContextMenu($event,[item, index])" :class="deepBgColor(item, index)">
          <img :src="item.navigationLogo" alt="" class="item-img"/>
          <span>{{ item.navigationName }}</span>
        </div>
      </div>
      <!--父导航结束-->
      <!-- 子导航开始 -->
      <div class="menu-right nitai-body">
        <div v-for="(object, index) in navigationsData" class="custom-nav added">
          <a :href="object.navigationUrl" target="_blank" class="cusNavA nitai-outer" @click="saveNavigation(object)">
            <img :src="object.navigationLogo" :title="object.navigationName" alt=""
                 class="cusNavImg nitai-img" @error="handleError"/>
            <div class="cusNavTitle">{{ object.navigationName }}</div>
          </a>
          <span class="iconfont icon-bianji subNavDel" @click="modifySubNav([object, index])"
                v-if="localAuth"></span>
        </div>
        <!-- 新增子导航 -->
        <span v-if="localAuth" @click="addSubNav" class="addsub iconfont icon-tianjia z-400"/>
      </div>
      <!--  常用工具结束-->
    </div>

    <!--搜索结果的结构-->
    <div class="navbox z-400 search-nav" v-else @click="getInputFocus2">

      <!--      历史结果的结构-->
      <div class="menu-right nitai-body history-res" v-if="navigationHistoryIsShow">
        <div v-for="(object, index) in getHistory" class="custom-nav added">
          <a target="_blank" class="cusNavA nitai-outer"
             @click="clickNav(object, index)">
            <img :src="object.navigationLogo" :title="object.navigationName" alt=""
                 class="cusNavImg nitai-img" @error="handleError"/>
            <div class="cusNavTitle">{{ object.navigationName }}</div>
          </a>
          <span class="iconfont icon-shanchu1 subNavDel" @click="deleteSearchHistory(object)"></span>

        </div>
      </div>
      <!-- 正式搜索结果的结构 -->
      <div class="menu-right nitai-body search-res" v-else>
        <div v-for="(object, index) in navigationsSearchData" class="custom-nav added">
          <a :href="object.navigationUrl" target="_blank" class="cusNavA nitai-outer" @click="saveNavigation(object)">
            <img :src="object.navigationLogo" :title="object.navigationName" alt=""
                 class="cusNavImg nitai-img" @error="handleError"/>
            <div class="cusNavTitle">{{ object.navigationName }}</div>
          </a>

        </div>
      </div>
    </div>
    <span
        class="btnsearch z-400 iconfont icon-shanchu1"
        v-show="!searchResVisible"
        @click="deactiveSearch"
    ></span>
  </div>
</template>

<script>
import {
  getParentNavData,
  addParentNavData,
  getChildNavData,
  addChildNavData,
  getUrlData,
  setParentNavData,
  deleteParentNavData,
  setChildNavData,
  deleteChildNavData,
  searchNavigationData,
  sortNavigationData,
} from "@/api/navigations";
import {_debounce, _throttle} from '@/utils/debounce'
import {Message} from 'element-ui'
import Sortable from 'sortablejs'
import {mixins} from "@/mixins/index"
import {SETNAVIGATIONHISTORY} from '@/store/mutation-types'

export default {
  name: "Navigations",
  mixins: [mixins], // swap()
  data() {
    return {
      searchInput: '',// 搜索值的双向绑定
      localAuth: localStorage.getItem("Authorization"),
      navigationParentData: [], // 存储父导航数据
      queryid: [], // 存储父导航的id
      navigationsData: [], // 存储子导航数据
      navigationsSearchData: [], // 存储子导航搜索的数据
      parentId: 0, // 传给添加子导航的方法
      dialogVisible: false, // 新增父导航，弹出框变量
      subDialogVisible: false, // 新增子导航，弹出框变量
      modifyParentNavVisible: false, // 修改父导航，弹出框变量
      subDelDialogVisible: false, // 修改子导航，弹出框变量
      NavDeleteVisible: false, // 删除父导航，弹出框变量
      subInnerDeleteVisible: false, // 删除子导航，弹出框变量
      navFormName: "", // 接收父导航修改的后的值
      subFormName: "", // 新增子导航，页面上的三个字段
      subFormTitle: "",
      subFormIcon: "",
      subFormDescription: "", //废弃
      urlFieldName: "", //修改子导航的名称
      urlFieldUrl: "", // 修改子导航的地址
      urlFieldIcon: "", // 修改子导航的图标
      formLabelWidth: "120px",
      navContextLeft: 0, // 父导航右键菜单栏的坐标
      navContextTop: 0, // 父导航右键菜单栏的坐标
      showContext: false, // 父导航右键菜单栏初始不显示
      urlInfoIcon: "", // 解析url的结果
      urlInfoTitle: "",
      form: {
        name: "",
        modifyName: "",
      },
      currentIndex: 0,// 存储当前点击的index，同时初始化第一个为高亮
      defaultImage: require('@/assets/img/favicon.png'),
      searchResVisible: true,
      beforeSortedId: [], // 存储移动前后的id
      navigationHistoryIsShow: true,
      navigationsHistory: eval(this.$store.state.localstorage.localstorage.navigation.navigationHistory) || []
    };
  },
  computed: {
    isShow() {
      return this.$store.state.isClick.time;
    },
    tipVisible() {
      return !this.searchInput
    },
    getHistory() {
      let localHistory = this.$store.state.localstorage.localstorage.navigation.navigationHistory

      return eval(localHistory) || []
    }
  },
  watch: {
    // 添加子导航时，动态解析url
    subFormName(newValue) {
      this.resolveURL(newValue)
    },
    // 搜索导航
    searchInput(newValue, oldValue) {
      if (newValue) {
        // 该判断只有在新的值不为空的情况下才会调用
        console.log('newValue', newValue)
        this.searchNavigationData(newValue)
        this.navigationHistoryIsShow = false // 输入后，开始显示搜索的结果

      }
      if (newValue == '') {
        this.navigationsSearchData = []
        console.log('重置搜索结果')
        //setTimeout(() => {
        //    this.navigationsSearchData = []
        //    console.log('重置搜索结果')
        //}, 3000)
        this.navigationHistoryIsShow = true // 值为空时，重新显示历史记录的结果

      }

    },
    navigationParentData() {
      this.$nextTick(
          this.initSort()
      )
    },
  },

  created() {

    // 获取父导航
    getParentNavData().then((res) => {
      // 存储父导航数据
      this.navigationParentData = res.data;
      for (let i = 0; i < res.data.length; i++) {
        this.beforeSortedId.push(res.data[i].id)
      }

      console.log('父导航数据获取', this.navigationParentData)
      this.saveParentId(this.navigationParentData)
      // 子导航初始化
      getChildNavData(this.queryid[0]).then(res => {
        this.navigationsData = res.data;
        // 存储父导航的id
        this.$store.commit("saveParentId", this.queryid[0]);
      });
    });
  },
  mounted() {
    //this.initSort()
  },
  methods: {
    deleteSearchHistory(object) {
      for (let i = 0; i < this.navigationsHistory.length; i++) {
        if (this.navigationsHistory[i].id == object.id) {
          this.navigationsHistory.splice(i, 1)
          break
        }
      }

      let historyRecord = JSON.stringify(this.navigationsHistory)
      this.$store.commit(SETNAVIGATIONHISTORY, historyRecord)
    },
    clickNav(object, index) {
      // console.log(object.navigationUrl)
      window.open(object.navigationUrl ,'_blank')

      this.updateSearchHistory(object,index)
    },
    updateSearchHistory(object, index) {
      console.log(object.id)
      for (let i = 0; i < this.navigationsHistory.length; i++) {
        console.log(this.navigationsHistory[i].id)
        if (this.navigationsHistory[i].id == object.id) {
          this.navigationsHistory.splice(i, 1)
          break
        }
      }
      this.navigationsHistory.unshift(object)
      // console.log('移到前面之后', this.navigationsHistory)

      let historyRecord = JSON.stringify(this.navigationsHistory)
      this.$store.commit(SETNAVIGATIONHISTORY, historyRecord)
    },
    saveNavigation(object) {
      if (object) {
        if (this.navigationsHistory.length <= 11) {
          let filterNum = 0
          this.navigationsHistory.forEach(item => {
            if (item.id !== object.id) {
              filterNum++
            }
          })
          if (filterNum == this.navigationsHistory.length) {
            this.navigationsHistory.unshift(object)
            let historyRecord = JSON.stringify(this.navigationsHistory)
            this.$store.commit(SETNAVIGATIONHISTORY, historyRecord)
          }
        } else {
          let filterNum = 0
          this.navigationsHistory.forEach(item => {
            if (item.id !== object.id) {
              filterNum++
            }
          })
          if (filterNum == this.navigationsHistory.length) {
            this.navigationsHistory = this.navigationsHistory.slice(0, 11)

            this.navigationsHistory.unshift(object)
            // this.navigationsHistory = [...new Set(this.navigationsHistory)]
            let historyRecord = JSON.stringify(this.navigationsHistory)
            this.$store.commit(SETNAVIGATIONHISTORY, historyRecord)
          }
        }
      }

    },
    sortNavigationData(data) {
      sortNavigationData(data).then(
          res => {
            console.log(res)
            // 不用再覆盖绑定的变量了，下次进入会重新请求接口的
          },
          errot => {
            console.log(res)
          }
      )
    },
    initSort() {
      const el = document.querySelector(".menu-left")
      console.log('el', el)
      new Sortable(el, {
        filter: '.filtered', // 'filtered' class is not draggable
        onEnd: (evt) => {
          //console.log(this)
          console.log('old', evt.oldIndex)
          console.log('new', evt.newIndex)
          console.log('移动前', this.beforeSortedId)
          this.swap(this.beforeSortedId, evt.oldIndex, evt.newIndex)
          console.log('移动后', this.beforeSortedId)
          let data = {
            id_list: this.beforeSortedId
          }
          // 调用后台接口，同步更改
          // @TODO 快速操作时，可能会有延迟数据写入问题
          this.sortNavigationData(data)
          Message({
            message: '移动成功',
            type: 'success'
          })

        }
      })
    },
    getInputFocus2() {
      this.$refs.myinput.focus();
    },
    // 取消搜索
    deactiveSearch() {
      this.searchResVisible = true
      this.searchInput = ''
      this.navigationsSearchData = []
    },
    // 激活input点击
    inputActive() {
      this.searchResVisible = false
    },
    enterToSearch($event) {
      if ($event.keyCode == 13) {
        console.log('aa')
        this.searchNavigationData(this.searchInput)
        Message({
          message: '搜索结果如下',
          type: 'success'
        })
      }
    },
    // 清除input的值
    clearInput() {
      //this.searchInput = ''
      //this.getInputFocus2()

    },
    // 封装搜索导航的接口
    searchNavigationData: _debounce(function (params) {
      if (params) {
        //if (typeof this.cancelRequest === 'function') {
        //    this.cancelRequest()
        //}
        searchNavigationData(params).then(res => {
          console.log(res)
          if (res.code == 0) {
            if (res.data == null) {
              this.navigationsSearchData = [
                {
                  navigationName: '无匹配结果'
                }
              ]
            } else {
              this.navigationsSearchData = res.data
            }
          }
        }, error => {
          console.log(error)
        })
      }
    }, 1000),
    // 传父导航的数据，存储父导航的每一个id
    saveParentId(arr) {
      for (let i of arr) {
        // 存储父导航的id，用作点击获取子导航时的参数，刚好和index保持一致
        let id = i.id;
        this.queryid.push(id);
      }
      console.log('存id的方法被调用了', this.queryid)
    },
    // 切换index
    myToggle(index) {
      this.currentIndex = index
    },
    // 展示子导航
    getItemData(index) {
      this.clearInput()
      this.myToggle(index)
      //console.log('初始化',index,this.queryid)
      this.navigationsData = [];
      getChildNavData(this.queryid[index]).then(res => {
        this.navigationsData = res.data;
        //console.log('子导航数据', this.navigationsData);
        // 存储父导航的id
        this.$store.commit("saveParentId", this.queryid[index]);
      });
    },
    // 添加父导航
    addNavParent() {
      this.dialogVisible = true;
    },
    // 确定添加父导航
    confirmParentNav() {
      this.dialogVisible = false;
      this.queryid = [] // 清空当前存的queryid数组
      let data = {
        navigation_name: this.form.name,
        navigation_logo:
            "data:image/png;base64,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",
      };
      // 更新父导航数据库
      addParentNavData(data).then((res) => {
        //console.log(res)
        this.navigationParentData = res.data
        console.log('新增父导航后，回填的数据', this.navigationParentData)
        this.saveParentId(this.navigationParentData)
        // 更新查询的id数组，unshift添加到数组第一个
        //this.queryid.unshift(res.data[0].id)
        console.log('父导航更新后，存储id的数组也跟着更新了', this.queryid, this.queryid.length)
        const tempLength = this.queryid.length
      });
      // 新增后，模拟点击新增后的导航
      // 最好的情况是，后台接口要配合着修改，因为现在新增后，传的父导航id，排序不是从首行插入的，而是查到末尾，再拼接了默认的导航

      //getChildNavData(firstParentId).then(res => {
      //    this.navigationsData = res.data;
      //    //console.log('子导航数据', this.navigationsData);
      //    // 存储父导航的id
      //    this.$store.commit("saveParentId", firstParentId);
      //});


    },
    // 右键修改及删除父导航
    myContextMenu($event, data) {
      this.showContext = true
      this.navContextLeft = $event.pageX
      this.navContextTop = $event.pageY

      // console.log('$event', $event.pageX, $event.pageY, [item, index])
      // 传递参数
      this.$store.commit("saveParentNavInfo", data[0]);
      this.$store.commit("saveIndex", data[1]);
    },
    // 隐藏右键菜单栏
    hidenContext() {
      this.showContext = false
    },
    // 确认修改父导航
    confirmModifyNav() {
      //this.navFormName = "";
      // 从右击事件中拿到对应的参数
      // 接口现在数据回填了，不再需要index
      const NavData = this.$store.state.moduleParentNav.parentNavInfo;
      const data = {
        navigation_name: this.navFormName,
        navigation_logo: NavData.navigationLogo,
        id: NavData.id,
      };
      setParentNavData(data).then(res => {
        this.navigationParentData = res.data;
        //console.log('修改父导航成功', res)
      }, error => {
        console.log(error)
      });
      // 隐藏修改弹出层
      this.modifyParentNavVisible = false;
      this.hidenContext()
    },
    // 确认删除父导航
    confirmDeleteNav() {
      const NavData = this.$store.state.moduleParentNav.parentNavInfo;
      this.queryid = [] // 清空当前存的queryid数组

      const id = NavData.id;
      const data = {
        id: id,
      };

      deleteParentNavData(data).then(res => {
        this.navigationParentData = res.data;
        this.saveParentId(this.navigationParentData)
        //this.queryid.shift()
        const firstParentId = this.queryid[0]
        getChildNavData(firstParentId).then(res => {
          this.navigationsData = res.data;
          //console.log('子导航数据', this.navigationsData);
          // 存储父导航的id
          this.$store.commit("saveParentId", firstParentId);
        });
        //console.log('删除父导航成功', res);
      }, error => {
        console.log(error)
      });
      this.NavDeleteVisible = false;
      this.hidenContext()
      // this.NavDialogVisible = false;
    },
    // 添加子导航
    addSubNav() {
      this.subDialogVisible = true;
      this.subFormName = ""
      this.subFormTitle = ""
      this.subFormIcon = ""
    },
    // 解析url
    resolveURL(url) {
      //@TODO 需要对输入的url做各种校验
      getUrlData(url).then(res => {
        if (res.data) {
          this.subFormTitle = res.data.title
          this.subFormIcon = res.data.icon
        }
      }, error => {
        console.log(error)
      })
    },
    // 确认新增子导航
    confirmSubNav() {
      let urlData = {
        navigation_name: this.subFormTitle,
        navigation_url: this.subFormName,
        navigation_logo: this.subFormIcon,
        parent_navigation_id: this.$store.state.moduleParentNav.parentId,
      };
      console.log(urlData);
      addChildNavData(urlData).then(res => {
        console.log('添加子导航', res);
        this.navigationsData = res.data
      }, error => {
        console.log(error)
      });
      this.subDialogVisible = false;
    },
    // 修改子导航
    modifySubNav(data) {
      // 存储点击的指定子导航的信息
      this.$store.commit('saveSubNavInfo', data[0])
      // 存储子导航中的索引
      this.$store.commit("saveSubIndex", data[1]);
      this.subDelDialogVisible = true;

      this.urlFieldUrl = data[0].navigationUrl
      this.urlFieldName = data[0].navigationName
      this.urlFieldIcon = data[0].navigationLogo
    },
    // 确认修改子导航
    confirmModifySubNav() {
      const subNavInfo = this.$store.state.moduleSubNav.subNavInfo
      const data = {
        navigation_name: this.urlFieldName,
        navigation_url: this.urlFieldUrl,
        navigation_logo: this.urlFieldIcon,
        parent_navigation_id: subNavInfo.parentNavigationId,
        NavigationIntroduction: this.urlFieldName,
        id: subNavInfo.id,
      };
      setChildNavData(data).then((res) => {
        //console.log('修改子导航',res);
        this.navigationsData = res.data
      });
      this.subDelDialogVisible = false;
    },
    // 删除子导航
    deleteSubNav() {
      this.subInnerDeleteVisible = true;
    },
    // 确认删除子导航
    confirmDeleteSubNav() {
      const subNavInfo = this.$store.state.moduleSubNav.subNavInfo
      //console.log('del',subNavInfo)
      const data = {
        id: subNavInfo.id,
        parent_navigation_id: subNavInfo.parentNavigationId
      };
      deleteChildNavData(data).then(res => {
        //console.log('删除子导航',res);
        this.navigationsData = res.data

      }, error => {
        console.log(error)
      });

      this.subInnerDeleteVisible = false;
      this.subDelDialogVisible = false;
    },
    // 对象方式动态绑定类名
    deepBgColor(item, index) {
      return {
        'menu-item-click': this.currentIndex == index,
        'filtered': item.userId == -1
      }
    },
    handleError($event) {
      $event.target.src = this.defaultImage
      $event.target.onerror = null
    }
  },
};
</script>

<style scoped>
@import "../../../styles/views/home/navigations.css";
</style>
