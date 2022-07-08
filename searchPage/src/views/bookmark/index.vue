<template>
  <div class="bookmark">
    <!--菜单栏相关-->
    <div class="right-click-menu z-100" v-show="leftMenuIsShow || rightMenuIsShow">
      <!--文件夹的右键菜单栏-->
      <div class="left-menu" v-show="leftMenuIsShow"
        :style="{left: dirContextLeft+'px',top: dirContextTop + 'px'}">
        <div class="left-menu-inner" @click="hiddenMenu">
          <span class="iconfont icon-jiantou_shangxiaqiehuan_o left-menu-item">按名称排序</span>
          <span class="iconfont icon-bianjiqianbi left-menu-item" @click="renameDir">重命名</span>
          <span class="iconfont icon-delete left-menu-item" @click="deleteDir">删除</span>
          <span class="iconfont icon-24gl-folderMinus left-menu-item">全部打开(2)</span>
          <span class="iconfont icon-24gl-folderOpen left-menu-item">在新窗口全部打开(3)</span>
        </div>
      </div>
      <!--url的右键菜单栏-->
      <div class="right-menu" v-show="rightMenuIsShow">
        <!--<div class="left-menu" v-show="leftMenuIsShow"-->
        <!--     :style="{left: dirContextLeft+'px',top: dirContextTop + 'px'}">-->
        <!--    <div class="left-menu-inner" @click="hiddenMenu">-->
        <!--        <span class="iconfont icon-jiantou_shangxiaqiehuan_o left-menu-item">按名称排序</span>-->
        <!--        <span class="iconfont icon-bianjiqianbi left-menu-item" @click="renameDir">重命名</span>-->
        <!--        <span class="iconfont icon-delete left-menu-item" @click="deleteDir">删除</span>-->
        <!--        <span class="iconfont icon-24gl-folderMinus left-menu-item">全部打开(2)</span>-->
        <!--        <span class="iconfont icon-24gl-folderOpen left-menu-item">在新窗口全部打开(3)</span>-->
        <!--    </div>-->
        <!--</div>-->
      </div>


    </div>
    <!--弹窗相关-->
    <div class="bookmark-dialog">
      <!--新增文件夹弹窗 add-dir-dialog-->
      <div class="add-dir">
        <el-dialog
          title="添加文件夹"
          :visible.sync="addDirVisible"
          width="30%"
        >
          <div style="margin-bottom: 10px;">名称</div>
          <el-input v-model="inputDirName"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmAddDir">保 存</el-button>
            <el-button @click="addDirVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <!--重命名文件夹弹窗 rename-dir-dialog-->
      <div class="rename-dir">
        <el-dialog
          title="重命名文件夹"
          :visible.sync="renameDirVisible"
          width="30%"
        >
          <div style="margin-bottom: 10px;">名称</div>
          <el-input v-model="inputRenameDirName"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmRenameDir">保 存</el-button>
            <el-button @click="reNameDirVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <!--新增书签的弹窗-->
      <div class="add-bookmark">
        <el-dialog
          title="添加书签"
          :visible.sync="addBookmarkVisible"
          width="30%"
        >
          <div style="margin-bottom: 10px;">URL</div>
          <el-input v-model="inputBookmarkUrl" placeholder="请粘贴网址"></el-input>
          <div style="margin-bottom: 10px;margin-top: 10px;">名称</div>
          <el-input v-model="inputBookmarkName" placeholder="请输入名称"></el-input>

          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmAddBookmark">保 存</el-button>
            <el-button @click="addBookmarkVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <!--选中书签的弹窗,该弹窗没用到el-dialog-->
      <div v-show="selectedNumber " :class="selectedNumber?'z-100':'z-minus-100'" class="selected-bookmark">
        <div class="title">已选择{{selectedNumber}}项</div>
        <button class="delete" @click="deleteBookmark">删 除</button>
        <button class="cancel" @click="selectedNumber = false">取 消</button>
      </div>
      <!--删除书签的弹窗-->
      <div class="delete-bookmark">
        <el-dialog
          title="确认删除所选内容？"
          :visible.sync="deleteBookmarkVisible"
          width="30%"
        >
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmDeleteBookmark">确 定</el-button>
            <el-button @click="selectedNumber = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <!--删除文件夹的弹窗-->
      <div class="delete-dir">
        <el-dialog
          title="确认删除文件夹？"
          :visible.sync="deleteDirVisible"
          width="30%"
        >
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmDeleteDir">确 定</el-button>
            <el-button @click="deleteDirVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <!--导入收藏夹的弹窗-->
      <div class="import-bookmark" v-show="importVisible" :class="importVisible?'z-100':'z-minus-100'">
        <input class="file" type="file" ref="fileItem">
        <div class="button-item">
          <button @click="importMark" class="confirm">确定</button>
          <button @click="cancelImport" class="cancel">取消</button>
        </div>
      </div>
    </div>
    <!--书签左侧-->
    <div class="bookmark-left" @click="hiddenMenu">
      <div class="bookmark-left-inner scroller">
        <h2>收藏夹</h2>
        <span class="homepage iconfont icon-zhuye1"  @click="$router.push('home')"></span>

        <el-input v-model="searchResult" class="my-input-left" placeholder="搜索收藏夹" @keyup.enter.native="enterToSearch($event)">
          <i slot="prefix" class="iconfont icon-sousuo"></i>
        </el-input>
        <el-scrollbar style="height:100%">
          <el-tree
            class="mytree-left"
            :data="dirData"
            :props="defaultProps"
            @node-click="handleNodeClick"
            :render-content="renderContent"
            :expand-on-click-node="false"
            @node-contextmenu="handleDirRightClick"
            :default-expand-all="true"
            :draggable="true"
          >
            <!--<div class="el-tree-outer" slot-scope="{ node,data }">-->
            <!--  <span class="iconfont icon-wenjianjia1"></span>-->
            <!--  <span class="el-tree-text"> {node.label} </span>-->
            <!--</div>-->
          </el-tree>
        </el-scrollbar>

      </div>
    </div>
    <!-- resize -->
    <div class="resize"></div>
    <!--书签右侧-->
    <div class="bookmark-right scroller" @click.self="hiddenMenu">
      <div class="bookmark-right-inner">
        <div class="upper" @click="hiddenMenu">
          <h3>{{dirNameLeftClick}}</h3>
          <div>
            <div v-show="!selectedNumber" class="function-area-one">
              <ul>
                <li class="function-item iconfont icon-tianjia3" @click="addBookmark">添加书签</li>
                <li class="function-item iconfont icon-wenjianjiatianjia" @click="addDir">添加文件夹</li>
                <li class="function-item item-end iconfont icon-gengduo" @click.self.stop="showImportMenu">
                  <div class="import-function z-200" v-show="importFunctionShow">
                    <div class="import-function-inner">
                      <span class="import-item iconfont icon-daoru2" @click="startImport">导入收藏夹</span>
                      <span class="import-item iconfont icon-daochu2" @click="exportMyBookmark">导出收藏夹</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="content" v-if="showSearchContent">
          <div class="content-inner">
            <el-checkbox-group v-model="checkList">


              <el-checkbox class="content-item" border v-for="(item, index) in rightDirData"
                :label="item.id" :key="item.id" @dblclick.native="enterDir(item, index)">
                <span class="item-dir">
                  <img src="./imgs/bookmarkLogo.png" alt="" class="url-icon">
                  <span class="url-title">{{item.bookmarkName}}</span>
                  <span class="url-addr">{{item.bookmarkUrl}}</span>
                  <!--<span class="iconfont icon-delete1"></span>-->
                </span>

              </el-checkbox>

              <el-checkbox class="content-item" border v-for="(item, index) in rightUrlData"
                :label="item.id" :key="item.id">
                <!--<span v-if="item.isDir" class="item-dir">-->
                <!--    <img src="./imgs/bookmarkLogo.png" alt="" class="url-icon">-->
                <!--    <span class="url-title">{{item.bookmarkName}}</span>-->
                <!--    <span class="url-addr">{{item.bookmarkUrl}}</span>-->
                <!--<span class="iconfont icon-delete1"></span>-->
                <!--</span>-->
                <a class="item-url" :href="item.bookmarkUrl" target="_blank" :title="item.bookmarkName">
                  <img :src="item.bookmarkLogo" class="url-icon" @error="handleError">
                  <span class="url-title">{{item.bookmarkName}}</span>
                  <span class="url-addr">{{item.bookmarkUrl}}</span>
                  <!--<span class="iconfont icon-delete1"></span>-->
                </a>
              </el-checkbox>

            </el-checkbox-group>
          </div>
        </div>
        <div class="content-search" v-else>
          <h2 class="temp">搜索结果内容区</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getBookmarkDirData,
  addBookmarkData,
  deleteBookmarkData,
  setBookmarkData,
  searchBookMarkData,
  getBookmarkData,
  importBookmark,
  exportBookmark
} from "@/api/bookmark"

import {getUrlData} from "@/api/navigations"
import {_debounce} from '@/utils/debounce'
import {Message} from 'element-ui'
import { mixins } from "@/mixins/index"

export default {
  mixins: [mixins], // exportRaw()
  data() {
    return {
      searchInput: '', // 侧边栏搜索框双向绑定的变量
      searchResult: '', // 存储搜索入参的变量
      childRes: { // 点击父导航，显示的数据子导航数据
        data: []
      },
      searchChildRes: { // input内搜索后，返回的搜素结果的数据
        data: []
      },
      dirNameLeftClick: '收藏夹栏',
      dirOriginData: [], // 存储获取导航接口的数据
      dirFilterDirData: {}, // 只用来显示文件夹的数据
      dirData: [ // 供el-tree解析的格式
        //{
        //    label: "收藏夹栏",
        //    icon: "iconfont icon-wenjianjia1",
        //    children: [
        //        {
        //            icon: "iconfont icon-wenjianjia1",
        //            label: "工具库",
        //            children: [{
        //                icon: "iconfont icon-wenjianjia1",
        //                label: "图片工具库"
        //            }]
        //        }
        //    ]
        //}
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      subChecked: {
        subChecked1: true,
        subChecked2: false,
        subChecked3: false
      }, // 子导航对应的复选框变量
      addDirVisible: false, // 控制添加文件夹的对话框显示
      renameDirVisible: false, // 控制重命名文件夹的对话框显示
      addBookmarkVisible: false, // 控制添加书签的对话框显示
      deleteBookmarkVisible: false, // 控制确定删除书签的对话框显示
      deleteDirVisible: false, // 控制确定删除文件夹的对话框显示
      inputDirName: '', // el-input记录输入的值
      inputRenameDirName: '', // el-input记录重命名输入的值
      inputBookmarkName: '', // el-input记录input输入的值
      inputBookmarkUrl: '',
      inputBookmarkIcon: '',
      leftMenuIsShow: false, // 右键菜单栏
      rightMenuIsShow: false, // 右键菜单栏
      dirContextLeft: 0, // 右键菜单栏坐标
      dirContextTop: 0,
      dirId: 0, // 右键获取到的id
      dirName: '', // 右键获取到的name
      dirParentId: 0, // 右键获取到的父id
      dirLeftId: 0, // 左键获取到的id
      dirLeftName: '', // 左键获取到的name
      dirLeftParenetId: 0, // 左键获取到的父id
      showSearchContent: true, // 控制搜索内容区的显示与隐藏
      rightData: [],
      rightUrlData: [], // 存储右侧书签的信息，由左侧节点的单击事件触发
      rightDirData: [],
      checkList: [], // 存储复选框被选中的值，同时也是删除接口的入参
      treeData: {},
      treeNode: {}, // el-tree单击事件的Node参数
      treeObj: {}, // el-tree单击事件的obj参数
      importFunctionShow: false, // 导入导出菜单栏
      defaultImage: require('./imgs/favicon.png'),
      importVisible: false, // 导入的弹窗
      jsonRes: '',// 转化后的json字符串
    }
  },
  computed: {
    selectedNumber: {
      // getter
      get: function () {
        return this.checkList.length ? this.checkList.length : 0
      },
      // setter
      set: function (newValue) {
        // 每当selectedNumber被修改时，重置checkList
        this.checkList = []
      }
    }
  },
  watch: {
    inputBookmarkUrl(newValue, oldValue) {
      if (newValue != oldValue) {
        this.getUrlData(newValue)
        this.inputBookmarkUrl = newValue
      }
    },

    rightData(newValue, oldValue) {
      if (newValue) {
        this.rightDirData = newValue.filter(function (item, index, array) {
          return (item.isDir == 1)
        })
        this.rightUrlData = newValue.filter(function (item, index, array) {
          return (item.isDir == 0)
        })
      } else {
        this.rightUrlData = []
        this.rightDirData = []
      }

      console.log('watch rightData', newValue, this.rightDirData, this.rightUrlData)
    },
    searchResult(newValue) {
      this.searchBookMarkData(newValue)
    }
  },
  created() {
    this.initData()
  },
  mounted() {
    this.dragControllerDiv()
  },
  methods: {
    exportMyBookmark() {
      this.exportBookmark()
    },
    exportBookmark() {
      exportBookmark().then(res => {
          // console.log(res)
          if(res.code == 0) {
            let time = this.timestampToTime(new Date())
            this.exportRaw('bookmark-'+ time + '.html', res.data)
          }
        }, error => {
          console.log(error)
        }
      )
    },
    dragControllerDiv() {
      //getElementsByClassName
      var resize = document.getElementsByClassName('resize')
      var left = document.getElementsByClassName('bookmark-left')
      var mid = document.getElementsByClassName('bookmark-right')
      var box = document.getElementsByClassName('bookmark')
      for (let i = 0; i < resize.length; i++) {
        resize[i].onmousedown = function(e) {
          var startX = e.clientX; // 获取分隔线，距离浏览器左边的距离
          resize[i].left = resize[i].offsetLeft; // 
          console.log(resize[i].offsetLeft)
          document.onmousemove = function(e) {
            var endX = e.clientX;
            var moveLen = resize[i].left + (endX - startX);
            var maxT = box[i].clientWidth - resize[i].offsetWidth - 500;
            if (moveLen < 150) moveLen = 150;
            if (moveLen > maxT - 150) moveLen = maxT  - 150;

            resize[i].style.left = moveLen;

            for (let j = 0; j < left.length; j++) {
              left[j].style.width = moveLen + 'px';
              mid[j].style.width = (box[i].clientWidth - moveLen -  10) + 'px';
            }
          }
          document.onmouseup = function(evt) {
            document.onmousemove = null;
            document.onmouseup = null;
            resize[i].releaseCapture && resize[i].releaseCapture();
          }
        resize[i].setCapture && resize[i].setCapture();
          return false;
        }
      }
    },
    cancelImport() {
      console.log('取消')
      this.importVisible = false
    },
    initData() {
      this.initParentDirData()
    },
    // 初始化默认新增一个文件夹
    initAddParentDir() {
      let data = {
        "bookmark_name": "收藏夹栏",
        "parent_bookmark_id": 0,
        "is_dir": "1",
        "bookmark_url": "",
        "bookmark_logo": ""
      }
      addBookmarkData(data).then(res => {
        console.log('新增文件夹', res)
        this.initParentDirData()
      }, error => {
          console.log(error)
        })
    },
    // el-tree内容区的渲染函数
    renderContent(h, {node, data, obj}) {
      return (
        <div class="el-tree-outer">
          <span class="iconfont icon-wenjianjia1"></span>
          <span class="el-tree-text"> {node.label} </span>
        </div>
      )
    },
    enterToSearch($event) {
      if ($event.keyCode == 13) {
        console.log('aa')
        this.searchBookMarkData(this.searchResult)
        Message({
          message: '搜索结果如下',
          type: 'success'
        })
      }
    },
    // 初始化父级导航的文件夹数据
    initParentDirData() {
      // 初始化取所有文件夹数据
      getBookmarkDirData(0).then(res => {
        console.log('dirOriginData', res)
        if (res.data) {
          // 筛选出指定关键字
          this.dirOriginData = []
          for (let item of res.data) {
            const specifyField = (({id, parentBookmarkId, bookmarkName}) => ({
              id,
              parentBookmarkId,
              bookmarkName
            }))(item)
            //specifyField.icon = "iconfont icon-wenjianjia1"
            this.dirOriginData.push(specifyField)
          }
          //console.log('指定字段',this.dirOriginData)
          // 替换key
          this.dirOriginData = this.dirOriginData.map((item, index) => {
            return {
              label: item.bookmarkName,
              icon: item.icon,
              id: item.id,
              parentBookmarkId: item.parentBookmarkId
            }
          })
          //console.log('替换key', this.dirOriginData)
          // 替换掉key，解析成可以被el-tree解析的格式
          this.dirData = this.flatToNested(this.dirOriginData, {
            idProperty: 'id',            //唯一的节点标识符。
            nameProperty: 'bookmarkName',         //节点的名称。
            parentProperty: 'parentBookmarkId',  //可以找到父节点链接的属性的名称。
            childrenProperty: 'children'      //将存储子节点的属性的名称。
          })
          console.log('树形结构', this.dirData)
          //this.initClickDir(this.dirData[0].id)
          //this.handleNodeClick()
        } else {
          this.initAddParentDir()
        }

      })
    },
    // 封装搜索书签的接口
    searchBookMarkData: _debounce(function(params) {
      searchBookMarkData(params).then(res => {
        console.log(res.data)
        this.rightData = res.data
      },
        error => {
          console.log(error)
        })
    }, 400),
    // 处理侧边栏的点击
    handleNodeClick(data, node, obj) {
      //this.leftMenuIsShow = false
      this.treeData = data
      this.treeNode = node
      this.treeObj = obj
      //console.log('封装后后tree数据', this.treeData, this.treeNode, this.treeObj)
      this.hiddenMenu()
      console.log('文件夹节点被点击了', data, node, obj)
      this.dirNameLeftClick = data.label // 动态显示文件夹的名称
      this.dirLeftId = data.id
      this.dirLeftName = data.label
      this.dirLeftParenetId = data.parentBookmarkId

      // 获取右侧书签数据
      let query = this.dirLeftId
      this.getBookmarkData(query)

    },
    // 处理文件夹的右击
    handleDirRightClick($event, data, node, obj) {
      this.leftMenuIsShow = true

      console.log('右击', data)
      this.dirContextLeft = $event.pageX
      this.dirContextTop = $event.pageY
      //console.log('右击坐标', this.dirContextLeft, this.dirContextTop)
      this.dirId = data.id
      this.dirName = data.label
      this.dirParentId = data.parentBookmarkId
    },
    // 隐藏菜单栏
    hiddenMenu() {
      if (this.leftMenuIsShow) {
        this.leftMenuIsShow = false
      }
      if (this.rightMenuIsShow) {
        this.rightMenuIsShow = false
      }
      if (this.selectedNumber) {
        this.selectedNumber = false
      }
      if (this.importFunctionShow) {
        this.importFunctionShow = false
      }
      //this.importFunctionShow = false
      // console.log('right-menu', $event.target)

    },
    // 扁平结构转嵌套结构
    flatToNested(data, option) {
      option = option || {};
      let idProperty = option.idProperty || 'id';
      let parentProperty = option.parentProperty || 'pid';
      let childrenProperty = option.childrenProperty || 'children';
      let res = [],
      tmpMap = [];
      for (let i = 0; i < data.length; i++) {
        tmpMap[data[i][idProperty]] = data[i];
        if (tmpMap[data[i][parentProperty]] && data[i][idProperty] != data[i][parentProperty]) {
          if (!tmpMap[data[i][parentProperty]][childrenProperty])
          tmpMap[data[i][parentProperty]][childrenProperty] = [];
          tmpMap[data[i][parentProperty]][childrenProperty].push(data[i]);
        } else {
          res.push(data[i]);
        }
      }
      return res;
    },
    // 添加文件夹
    addDir() {
      this.inputDirName = '' // 清空输入框的值
      this.addDirVisible = true
      // @TODO，还要模拟点击更新右侧数据
    },
    // 添加书签
    addBookmark() {
      this.inputBookmarkName = '' // 清空输入框的值
      this.inputBookmarkUrl = '' // 清空输入框的值
      this.addBookmarkVisible = true
    },
    // 确认新增文件夹
    confirmAddDir() {
      this.addDirVisible = false
      // 刚开始新用户的dirData是为空的
      //console.log('dirData', this.dirData.length)
      const addDirData = {
        bookmark_name: this.inputDirName, // 取input输入的值，暂时未做校验
        parent_bookmark_id: this.dirLeftId, // 用父节点的id，作为自己的parenetId
        is_dir: "1",
        bookmark_url: "",
        bookmark_logo: "",
      }
      this.addBookmarkDirData(addDirData)
      this.simulatedClickDir()
    },
    // 封装添加文件夹的接口
    addBookmarkDirData(data) {
      //console.log('入参', data)
      addBookmarkData(data).then(res => {
        if (res.code == 0) {
          console.log('新增文件夹', res)
          // 更新左侧文件夹数据
          this.initParentDirData()
        }
        if (res.code == 1) {
          console.log("新增文件夹失败，错误信息：", res.message)
        }
      }, error => {
          console.log(error)
        })
    },
    // 封装添加书签的接口
    addBookmarkUrlData(data) {
      addBookmarkData(data).then(res => {
        if (res.code == 0) {
          console.log('新增url书签', res)
          this.rightData = res.data
        }
        if (res.code == 1) {
          console.log("新增书签失败，错误信息：", res.message)
        }
      }, error => {
          console.log(error)
        })
    },
    // 封装删除文件夹的接口
    deleteBookmarkDirData(data) {
      deleteBookmarkData(data).then(res => {
        if (res.code == 0) {
          console.log('删除成功', res) // 删除文件夹成功后，此时回填的数据没用，里面有非dir的数据
          //this.rightData = res.data
          // 如果删除的是文件夹,还要重新获取下dir，这里无论删的是啥都统一重新获取
          this.initParentDirData()
          // 重新点击当前目录，是为了获取右侧数据，但右侧数据实际上已经回填了
          // 现在缺少的是，左侧点击的交互视觉
          // @TODO

        } else {
          console.log('删除失败')
          }
      }, error => {
          console.log(error)
        })
    },
    // 封装删除文件和文件夹的几口
    deleteBookmarkUrlData(data) {
      deleteBookmarkData(data).then(res => {
        if (res.code == 0) {
          console.log('删除成功', res) // 删除文件夹成功后，此时回填的数据没用，里面有非dir的数据
          this.rightData = res.data
          // 如果删除的是文件夹,还要重新获取下dir，这里无论删的是啥都统一重新获取
          this.initParentDirData()
          // 重新点击当前目录，是为了获取右侧数据，但右侧数据实际上已经回填了
          // 现在缺少的是，左侧点击的交互视觉
          // @TODO

        } else {
          console.log('删除失败')
          }
      }, error => {
          console.log(error)
        })
    },
    // 封装修改文件夹的接口
    setBookmarkDirData(data) {
      console.log(data)
      setBookmarkData(data).then(res => {

        if (res.code == 0) {
          console.log('重命名成功', res)
          this.initParentDirData()
        }
        this.initParentDirData()
      }, error => {
          console.log(error)
        })
    },
    // 文件夹重命名
    renameDir() {
      this.inputRenameDirName = ""
      this.renameDirVisible = true
    },
    confirmRenameDir() {
      this.renameDirVisible = false
      // 修改接口的入参
      const renameDirData = {
        bookmark_name: this.inputRenameDirName, // 取input输入的值，暂时未做校验
        bookmark_url: "",
        bookmark_logo: "",
        id: this.dirId,
        parent_bookmark_id: this.dirParentId, // 用父节点的id，作为自己的parenetId
      }
      this.setBookmarkDirData(renameDirData)
      this.simulatedClickDir()
    },
    // 删除文件夹
    deleteDir() {
      this.deleteDirVisible = true
    },
    // 确定删除文件夹
    confirmDeleteDir() {


      const data = {
        id_list: [this.dirId],
        parent_bookmark_id: this.dirParentId
      }
      console.log('删除', data)
      if (this.dirParentId === 0) {
        alert('根目录无法删除')
      } else {
        this.deleteBookmarkDirData(data)
        this.simulatedClickDir()
      }

      this.leftMenuIsShow = false
      this.deleteDirVisible = false
    },
    // 点击获取右侧书签数据的接口封装
    getBookmarkData(query) {
      getBookmarkData(query).then(res => {
        console.log('获取书签数据', res)
        if (res.code == 0) {
          this.rightData = res.data
        }
      }, error => {
          console.log(error)
        })
    },
    // 确认新增书签
    confirmAddBookmark() {
      let addBookmarkData = {
        bookmark_name: this.inputBookmarkName, // 取input输入的值，暂时未做校验
        parent_bookmark_id: this.dirLeftId, // 用父节点的id，作为自己的parenetId
        is_dir: "0",
        bookmark_url: this.inputBookmarkUrl,
        bookmark_logo: this.inputBookmarkIcon
      }
      this.addBookmarkUrlData(addBookmarkData)

      this.addBookmarkVisible = false
    },
    // 封装获取url信息的接口
    getUrlData(params) {
      getUrlData(params).then(res => {
        console.log('获取url信息', res)
        this.inputBookmarkName = res.data.title
        if (res.data.icon) { // 如果是插件实现的话，应该不会出现没有图标的情况，直接就用window对象处理了
          this.inputBookmarkIcon = res.data.icon
        } else {
          this.inputBookmarkIcon = ''
        }

      }, error => {
          console.log(error)
          })
    },
    deleteBookmark() {
      this.deleteBookmarkVisible = true
    },
    confirmDeleteBookmark() {
      let data = {
        id_list: this.checkList,
        parent_bookmark_id: this.dirLeftId
      }
      console.log('删除多个', data)
      //    调用删除接口
      this.deleteBookmarkUrlData(data)

      this.deleteBookmarkVisible = false
      this.selectedNumber = false
    },
    simulatedClickDir() {
      // 调整样式

      // 交互逻辑
      this.handleNodeClick(this.treeData, this.treeNode, this.treeObj)
      this.getBookmarkData(this.treeData.id)
    },
    // 进入文件夹
    enterDir(item, index) {
      console.log('双击', item, index)
      // 以下两行不支持搜索的下钻
      //let children = this.treeData.children[index]
      //this.handleNodeClick(children)

      // 必须根据name匹配到el-tree数据源的子节点，作为入参，而不是简单的用index的对应关系
      // 搜索结果如果显示的是子集，那么index对应关系就没啥用
      let matchNode = this.deepQuery(this.dirData, item.bookmarkName)
      console.log('匹配到了节点', matchNode)
      this.handleNodeClick(matchNode)
    },
    // 查找名称匹配的children
    deepQuery(tree, label) {
      let stark = []
      stark = stark.concat(tree)
      while (stark.length) {
        let temp = stark.shift()
        if (temp.children) {
          stark = temp.children.concat(stark)
        }
        if (label == temp.label) {
          return temp
        }
      }
    },
    showImportMenu($event) {

      this.importFunctionShow = true

      //console.log('show import menu',$event.target)
    },
    handleError($event) {
      $event.target.src = this.defaultImage
      $event.target.onerror = null
    },
    importMark() {
      let file = this.$refs.fileItem.files.item(0)
      if (file.name.indexOf(".html") < 0) {
        // 不处理非html的文件类型
        this.alertErr()
        return
      } else {
        file.text().then(res => {
          //console.log('res_str', res)
          // 内容转成dom对象
          let doms = this.parseToDOM(res);
          for (const dom of doms) {
            // 从dom对象中获取DL标签
            if (dom.tagName == 'DL') {
              let result = this.textHandle(dom, null);
              //this.exportRaw('data.json', JSON.stringify(result.children))
              this.jsonRes = JSON.stringify(result.children)
            }
          }

          //console.log(this.jsonRes)
          let data = {
            bookmark: this.jsonRes
          }
          importBookmark(data).then(res => {
            console.log(res)

            if (res.code == 0) {
              this.$message({
                message: '导入成功',
                type: 'success'
              });
            }
          }, error => {
              console.log(error)
            })
        })

      }

    },
    alertErr() {
      alert("请不要上传非浏览器书签文件")
    },
    startImport() {
      this.importVisible = true
    },
    /**
* 把String转为DOM对象
* @param str
* @returns {NodeListOf<ChildNode>}
*/
    parseToDOM(str) {
      let div = document.createElement("div");
      if (typeof str == "string") {
        div.innerHTML = str;
      }
      return div.childNodes;
    },
    /**
*
* @param dl
* @param temp
* @returns {*}
*/
    textHandle(dl, temp) {
      // 先获取DL 下面的DT
      let dts = this.getDts(dl);
      if (dts.length > 0) {
        // 判断DT下面是否有DL标签
        for (var i in dts) {
          let dt = dts[i], hdl = this.getTag(dt, "DL");
          if (hdl != null) {
            let h = this.getTag(dt, "H3");
            let returns = this.textHandle(hdl, {name: h.textContent, children: [], web: []})
            if (temp == null) {
              temp = returns;
            } else {
              temp.children.push(returns);
            }
          } else {
            var a = this.getTag(dt, "A");
            temp.web.push({
              url: a.href,
              title: a.textContent,
              desc: a.textContent,
              logo: a.getAttribute("ICON")
            })
          }
        }
      }
      return temp;
    },
    /**
* 获取DL下面的DT标签
* @param dl
* @returns {[]}
*/
    getDts(dl) {
      let dlcs = dl.children, arr = [];
      if (dlcs.length < 1) {
        return arr;
      }
      for (let dlc of dlcs) {
        if ((dlc.tagName.toUpperCase()) == 'DT') {
          arr.push(dlc)
        }
      }
      return arr;
    },
    /**
* 获取dt下面的标签
*
* @param dl
* @return
*/
    getTag(dt, tagname) {
      let dtcs = dt.children, obj = null;
      if (dtcs.length < 1) {
        return obj
      }
      for (let dtc of dtcs) {
        if ((dtc.tagName.toUpperCase()) == tagname) {
          obj = dtc;
          break;
        }
      }
      return obj;
    },
    /**
* 导出为文件
*/
    exportRaw(name, data) {
      var urlObject = window.URL || window.webkitURL || window;
      var export_blob = new Blob([data]);
      var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
      save_link.href = urlObject.createObjectURL(export_blob);
      save_link.download = name;
      var ev = document.createEvent("MouseEvents");
      ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      save_link.dispatchEvent(ev);
    }

  },

}
</script>

<style scoped>
@import "../../styles/views/bookmark/bookmark.css";
</style>
