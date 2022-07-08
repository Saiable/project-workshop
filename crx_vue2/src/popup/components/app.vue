<template>
    <div class="drop-down-outer" :class="{'nav-height': !switchTag}">
        <div class="drop-down-inner">
            <div class="title-content">
                <span class="title">{{title}} {{subTitle}}</span>
                <span class="iconfont icon-qiehuan" @click="switchNav"></span>
            </div>
            <div class="drop-down-input">
                <span>名称</span>
                <el-input v-model="crxName"></el-input>
            </div>

            <div class="drop-down-input">
                <span>URL</span>
                <el-input v-model="crxUrl"></el-input>
            </div>

            <div class="drop-down-input">
                <span>图标</span>
                <el-input v-model="inputBookmarkIcon" autocomplete="off">
                    <img v-show="inputBookmarkIcon" :src="inputBookmarkIcon" alt="" slot="suffix" class="suffix-icon">
                </el-input>
            </div>

            <div class="drop-down-input" v-if="switchTag">
                <span>抽屉</span>
                <el-input v-model="dirLeftName" autocomplete="off" :disabled="true">
                </el-input>
            </div>

            <div class="drop-down-input" v-else>
                <span>抽屉</span>
                <el-input v-model="navParenetDirName" autocomplete="off" :disabled="true">
                </el-input>
            </div>


            <template v-if="switchTag">
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
                            ref="aa"
                    ></el-tree>
                </div>
                <div class="footer">
                    <button class="confirm" @click="saveCrxUrl">保存</button>
                    <button class="cancel" @click="delCrxUrl">删除</button>
                </div>
            </template>
            <template v-else>
                <div class="drop-down-input">
                    <span>导航</span>
                    <el-select v-model="selectedNavValue" placeholder="请选择">
                        <el-option v-for="(item, index) in navOptions" :key="item.navigationName"
                                   :label="item.navigationName"
                                   :value="item.navigationName" @click.native="getSelectedID(item)">
                        </el-option>
                    </el-select>
                </div>
                <div class="nav-footer">
                    <button class="confirm" @click="saveNavUrl">保存</button>
                    <button class="cancel" @click="delNavUrl">删除</button>
                </div>
            </template>
        </div>
    </div>

</template>

<script>
    import {
        getBookmarkDirData,
        addBookmarkData,
        searchCrxBookMarkData,
        deleteBookmarkData,
    } from "@/api/bookmark"

    import {
        getNavListDir,
        addChildNavData,
        searchCrxNavigationData,
        deleteChildNavData
    } from "@/api/navigations"

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

                bookmarkId: 0,
                dirLeftId: 0,
                dirLeftName: '',
                //dirLeftParenetId: 0,
                crxName: 'crx获取到的name存这里', // 默认为空
                crxUrl: 'crx获取到url存这里', // 默认为空
                inputBookmarkIcon: 'http://1.13.245.78/favicon.ico',
                Authorization: '',
                aa: '',
                title: '书签',
                subTitle: '',
                switchTag: true,
                isExistBookmark: '',
                isExistNavgation: '',

                selectedNavValue: '', // 选择的nav
                navOptions: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }], // 存储获取到的navList,
                navId: 0,
                navParenetId: 0,
                navParenetDirName: '',

            }
        },
//        watch: {
//            crxUrl(newValue, oldValue) { // //监听只是为了获取图标，也可以直接在saveCrxUrl方法中，通过crx获取图标
//                if (newValue != oldValue) {
//                    this.getUrlData(newValue)
//                    //this.inputBookmarkUrl = newValue
//                }
//            },
//        },
        created() {
            this.initData()
        },
        mounted() {
            chrome.tabs.getSelected(null, this.getDataByCrx);
        },
        methods: {
            initData() {
                this.initParentDirData()
                this.getNavListDir()
                // temp
                //localStorage.setItem('Authorization', 'IDLp9ifu68/eBU8GdBrSA01LFwdw5JnSm7JMCJJBq84hcQgCca5hkYkfKxpWWQRc')
            },
            handleNodeClick(data, node, obj) {
                //this.leftMenuIsShow = false
                //this.treeData = data
                //this.treeNode = node
                //this.treeObj = obj
                //console.log('封装后后tree数据', this.treeData, this.treeNode, this.treeObj)
                console.log('文件夹节点被点击了', data, node, obj);
                this.dirLeftId = data.id;
                this.dirLeftName = data.label;
                //this.dirLeftParenetId = data.parentBookmarkId
                localStorage.setItem('dirLeftId', data.id);
                localStorage.setItem('dirLeftName', data.label);
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
                        console.log('替换key', this.dirOriginData)
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
                        this.isExistBookmark = ' （已存在）';
                        this.subTitle = ' （已存在）';
                        // 遍历返回的数据回填 id
                        for (let num = res.data.length-1; num >= 0; num--) {
                            if (this.crxUrl === res.data[num].bookmarkUrl) {
                                this.bookmarkId = res.data[num].id;
                                console.log(this.bookmarkId);
                                break;
                            }
                        }
                    }
                    if (res.code == 1) {
                        console.log("新增书签失败，错误信息：", res.message)
                    }
                }, error => {
                    console.log(error)
                })
            },

            delCrxUrl() {
                let delBookmarkData = {
                    id_list: [this.bookmarkId],
                    parent_bookmark_id: this.dirLeftId, // 用父节点的id，作为自己的parenetId
                };
                this.delBookmarkUrlData(delBookmarkData)
            },
            // 封装删除书签的接口
            delBookmarkUrlData(data) {
                deleteBookmarkData(data).then(res => {
                    if (res.code == 0) {
                        console.log('删除url书签', res);
                        this.$message({
                            showClose: true,
                            message: '删除成功',
                            type: 'success'
                        });
                        // 修改副标题
                        this.isExistBookmark = '';
                        this.subTitle = '';
                    }
                    if (res.code == 1) {
                        console.log("删除书签失败，错误信息：", res.message)
                    }
                }, error => {
                    console.log(error)
                })
            },


            // 封装精准搜索插件书签的接口
            searchCrxBookMarkUrlData(data) {
                searchCrxBookMarkData(data).then(res => {
                    if (res.code === 0) {
                        console.log('搜索插件书签', res);
                        this.dirLeftId = res.data.parentBookmarkId;
                        this.dirLeftName = res.data.ParentDirName;
                        this.bookmarkId = res.data.id;  // 如果存在的话,就更新id,用来删除用的
                        this.isExistBookmark = ' （已存在）';
                        this.subTitle = ' （已存在）';
                    }
                    if (res.code == 1) {
                        console.log("搜索插件书签失败：", res.message)
                    }
                }, error => {
                    console.log(error)
                })
            },


            // 封装精准搜索插件书签的接口
            searchCrxNavigationUrlData(data) {
                searchCrxNavigationData(data).then(res => {
                    if (res.code === 0) {
                        console.log('搜索插件导航', res);
                        this.navParenetId = res.data.parentNavigationId;
                        this.navParenetDirName = res.data.navigationClassification;
                        this.navId = res.data.id;
                        this.isExistNavgation = ' （已存在）'
                    }
                    if (res.code == 1) {
                        console.log("搜索插件导航失败：", res.message)
                    }
                }, error => {
                    console.log(error)
                })
            },


            getDataByCrx(tab) {
                this.crxName = tab.title;
                this.crxUrl = tab.url;
                this.inputBookmarkIcon = tab.favIconUrl;
                //this.Authorization = localStorage.getItem('Authorization');
                // this.ee()
                // 从localstore中获取 上次点击过得节点
                this.navParenetId = localStorage.getItem('navParenetId');
                this.navParenetDirName = localStorage.getItem('navParenetDirName');
                this.dirLeftId = localStorage.getItem('dirLeftId');
                this.dirLeftName = localStorage.getItem('dirLeftName');
                // 搜索书签是否在库里
                this.searchCrxBookMarkUrlData(this.crxUrl);
                this.searchCrxNavigationUrlData(this.crxUrl)

            },
            switchNav() {
                this.switchTag = !this.switchTag
                console.log('switch')
                if (this.title != '导航') {
                    this.title = '导航';
                    this.subTitle = this.isExistNavgation;
                } else {
                    this.title = '书签';
                    this.subTitle = this.isExistBookmark;
                }
            },
            // 获取导航dir
            getNavListDir() {
                getNavListDir().then(res => {
                    console.log('nav-list', res)
                    this.navOptions = res.data
                }, error => {
                    console.log(error)
                })
            },

            // 存储nav
            saveNavUrl() {
                let data = {
                    navigation_name: this.crxName,
                    navigation_url: this.crxUrl,
                    navigation_logo: this.inputBookmarkIcon,
                    parent_navigation_id: this.navParenetId,
                }
                this.addChildNavData(data)
            },
            // 添加子导航
            addChildNavData(data) {
                addChildNavData(data).then(res => {
                    console.log(res)
                    if (res.code == 0) {
                        console.log('新增子导航', res)
                        this.$message({
                            showClose: true,
                            message: '添加成功',
                            type: 'success'
                        });
                        this.isExistNavgation = ' （已存在）';
                        this.subTitle = ' （已存在）';

                        // 遍历返回的数据回填 id
                        for (let num = res.data.length-1; num >= 0; num--) {
                            if (this.crxUrl === res.data[num].navigationUrl) {
                                this.navId = res.data[num].id;
                                console.log(this.navId);
                                break;
                            }
                        }

                    }
                    if (res.code == 1) {
                        console.log("新增子导航失败，错误信息：", res.message)
                    }
                }, error => {
                    console.log(error)
                })
            },

            // 删除nav
            delNavUrl() {
                let data = {
                    parent_navigation_id: this.navParenetId,
                    id: this.navId,
                };
                this.delChildNavData(data)
            },
            // 删除子导航
            delChildNavData(data) {
                deleteChildNavData(data).then(res => {
                    console.log(res);
                    if (res.code == 0) {
                        console.log('删除子导航', res);
                        this.$message({
                            showClose: true,
                            message: '删除成功',
                            type: 'success'
                        });
                        this.isExistNavgation = '';
                        this.subTitle = '';
                    }
                    if (res.code == 1) {
                        console.log("删除子导航失败，错误信息：", res.message)
                    }
                }, error => {
                    console.log(error)
                })
            },


            // 获取到id
            getSelectedID(item) {
                this.navParenetId = item.id;
                this.navParenetDirName = item.navigationName;
                console.log('id', item.id);
                //存储到localstore
                localStorage.setItem('navParenetId', item.id);
                localStorage.setItem('navParenetDirName', item.navigationName);
            }
        }
    }
</script>

<style scoped>

    /*.drop-down {*/
    /*  position: relative;*/

    /*  width: 100vw;*/
    /*  height: 100vh;*/

    /*  cursor: pointer;*/
    /*}*/

    /*.drop-down .iconfont {*/
    /*  position: absolute;*/
    /*  top: 100px;*/
    /*  right: 500px;*/
    /*  color: #131313;*/
    /*  font-size: 26px;*/
    /*}*/

    /*.drop-down .iconfont:hover {*/
    /*  color: #399dff;*/
    /*}*/

    .suffix-icon {
        width: 20px;
        height: 20px;
        margin-top: 10px;
    }

    .drop-down-outer {
        /*position: absolute;*/
        top: 150px;
        right: 550px;
        box-sizing: border-box;

        width: 450px;
        height: 576px;
        padding: 20px 18px;
        background-color: white;
        border-radius: 4px;
        /*box-shadow: 0 0 20px rgba(0, 0, 0, .2);*/

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
        font-size: 12px;
    }

    .content {
        height: 224px;
        overflow-y: auto;
        border: 1px solid #b1b1b1;
        border-radius: 2px;
    }

    .footer, .nav-footer {
        position: relative;

    }

    .footer button, .nav-footer button {
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

    .footer .confirm, .nav-footer .confirm {
        right: 100px;
        background-color: #0078D4;
        color: white;
    }

    .footer .confirm:hover, .nav-footer .confirm:hover {
        background-color: #006BBD;
    }

    .footer .cancel, .nav-footer .cancel {
        right: 0;
        background-color: #EFEFEF;
    }

    .footer .cancel:hover, .nav-footer .cancel:hover {
        background-color: #D5D5D5;
    }

    span.iconfont.icon-qiehuan {
        margin-right: 5px;
        float: right;


        cursor: pointer;
    }

    .drop-down-outer.nav-height {
        height: 382px;
    }
</style>
