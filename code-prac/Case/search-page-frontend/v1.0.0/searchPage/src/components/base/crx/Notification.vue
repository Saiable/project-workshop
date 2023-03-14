<template>
  <div class="drop-down">
    <span class="iconfont icon-tianjia3"></span>
    <div class="drop-down-outer">
      <div class="drop-down-inner">
        <div class="title">编辑收藏夹</div>
        <div class="drop-down-input">
          <span>名称</span>
          <input type="text" v-model="crxName">
        </div>
        <div class="drop-down-input">
          <span>URL</span>
          <input type="text" v-model="crxUrl">
        </div>
        <div class="content">
          <el-tree
            class="mytree-left"
            :data="dirData"
            :props="defaultProps"
            @node-click="handleNodeClick"
            :render-content="renderContent"
            :expand-on-click-node="false"
            :default-expand-all="true"
            :draggable="false"
          ></el-tree>
        </div>
        <div class="footer">
          <button class="confirm" @click="saveCrxUrl">保存</button>
          <button class="cancel">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import {
        getBookmarkDirData,
        addBookmarkData,
    } from "@/api/bookmark"
    import {getUrlData} from "@/api/navigations"

    export default {
        data() {
            return {
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
                dirOriginData: [], // 存储获取导航接口的数据
                defaultProps: {
                    children: "children",
                    label: "label"
                },
                //treeData: {},
                //treeNode: {},
                //treeObj: {},
                dirLeftId: 0,
                //dirLeftName: '',
                //dirLeftParenetId: 0,
                crxName: 'crx获取到的name存这里', // 默认为空
                crxUrl: 'crx获取到url存这里', // 默认为空
                inputBookmarkIcon: '',
            }
        },
        watch: {
            crxUrl(newValue, oldValue) { // 监听只是为了获取图标，也可以直接在saveCrxUrl方法中，通过crx获取图标
                if (newValue != oldValue) {
                    this.getUrlData(newValue)
                    //this.inputBookmarkUrl = newValue
                }
            },
        },
        created() {
            this.initData()
        },
        methods: {
            initData() {
                this.initParentDirData()
            },
            handleNodeClick(data, node, obj) {
                //this.leftMenuIsShow = false
                //this.treeData = data
                //this.treeNode = node
                //this.treeObj = obj
                //console.log('封装后后tree数据', this.treeData, this.treeNode, this.treeObj)
                console.log('文件夹节点被点击了', data, node, obj)
                this.dirLeftId = data.id
                //this.dirLeftName = data.label
                //this.dirLeftParenetId = data.parentBookmarkId
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
            renderContent(h, {node, data, stroe}) {
                return (
                    < div
            class
                = "el-tree-outer" >
                    < span
            class
                = "iconfont icon-wenjianjia1" > < /span>
                    < span
            class
                = "el-tree-text" > {node.label} < /span>
                    < /div>
            )
            },
            saveCrxUrl() {
                let addBookmarkData = {
                    bookmark_name: this.crxName, // 取input输入的值，暂时未做校验
                    parent_bookmark_id: this.dirLeftId, // 用父节点的id，作为自己的parenetId
                    is_dir: "0",
                    bookmark_url: this.crxUrl,
                    bookmark_logo: this.inputBookmarkIcon
                }
                this.addBookmarkUrlData(addBookmarkData)
            },
            // 封装添加书签的接口
            addBookmarkUrlData(data) {
                addBookmarkData(data).then(res => {
                    if (res.code == 0) {
                        console.log('新增url书签', res)
                        this.$message({
                            showClose: true,
                            message: '添加成功',
                            type: 'success'
                        });
                    }
                    if (res.code == 1) {
                        console.log("新增书签失败，错误信息：", res.message)
                    }
                }, error => {
                    console.log(error)
                })
            },
            getUrlData(params) {
                getUrlData(params).then(res => {
                    console.log('获取url信息', res)
                    //this.inputBookmarkName = res.data.title
                    if (res.data.icon) { // 如果是插件实现的话，应该不会出现没有图标的情况，直接就用window对象处理了
                        this.inputBookmarkIcon = res.data.icon
                    } else {
                        this.inputBookmarkIcon = ''
                    }

                }, error => {
                    console.log(error)
                })
            },

        }
    }
</script>
<style scoped>
  .drop-down {
    position: relative;


    width: 100vw;
    height: 100vh;

    cursor: pointer;
  }

  .drop-down .iconfont {
    position: absolute;
    top: 100px;
    right: 500px;
    color: #131313;
    font-size: 26px;
  }

  .drop-down .iconfont:hover {
    color: #399dff;
  }

  .drop-down-outer {
    position: absolute;
    top: 150px;
    right: 550px;
    box-sizing: border-box;

    width: 450px;
    height: 550px;
    padding: 20px 18px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, .2);

  }

  .drop-down-inner {
    width: 100%;
    height: 100%;

    color: black;

  }

  .title {
    font-weight: 800;
  }

  .drop-down-input, .content {
    margin-top: 15px;
  }

  .drop-down-input span {
    margin-right: 20px;
    font-size: 14px;
  }

  .drop-down-input input {
    box-sizing: border-box;
    padding: 0 5px;
    width: calc(100% - 53px);
    height: 30px;
    font-size: 16px;
  }

  .content {
    height: 340px;
    overflow-y: auto;
    border: 1px solid #b1b1b1;
    border-radius: 2px;
  }

  .footer {
    position: relative;

  }

  .footer button {
    position: absolute;
    top: 20px;

    width: 90px;
    height: 30px;
    border: none;

    border-radius: 2px;
    font-size: 12px;
    text-align: center;
    transition: background-color .2s ease-in;
    cursor: pointer;
  }

  .footer .confirm {
    right: 100px;
    background-color: #0078D4;
    color: white;
  }

  .footer .confirm:hover {
    background-color: #006BBD;
  }

  .footer .cancel {
    right: 0;
    background-color: #EFEFEF;
  }

  .footer .cancel:hover {
    background-color: #D5D5D5;
  }
</style>