<template>
    <div class="tab">
        <div class="nav">
            <div class="logo">
                <img src="../../assets/logo.png" alt="spidertool">
                <span>爬虫工具库</span>
            </div>
            <router-link
                    class="tab-item"
                    v-for="tab in tabs"
                    :key="tab.id"
                    :to="tab.path"
            >
      <span class="tab-link">
        {{tab.name}}
      </span>
            </router-link>
        </div>
        <div class="content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tab',
        data() {
            return {
                tabs: [
                    {
                        id: 0,
                        name: 'Json格式化',
                        path: 'JsonFormat'
                    },
                    {
                        id: 1,
                        name: 'Header格式化',
                        path: 'HeaderFormat'
                    },
                    {
                        id: 2,
                        name: 'Cookie格式化',
                        path: 'CookieFormat'
                    },
                    {
                        id: 3,
                        name: 'Dict格式化',
                        path: 'DictFormat'
                    },
                    {
                        id: 4,
                        name: 'curl转requests',
                        path: 'CurlFormat'
                    },
                    {
                        id: 5,
                        name: 'url参数提取',
                        path: 'UrlParamsParse'
                    },
                    {
                        id: 6,
                        name: 'url编码',
                        path: 'quoteUrl'
                    },
                    {
                        id: 7,
                        name: 'url解码',
                        path: 'unQuoteUrl'
                    },
                    {
                        id: 8,
                        name: 'base64编码',
                        path: 'EncodeBase64'
                    },
                    {
                        id: 9,
                        name: 'base64解码',
                        path: 'DecodeBase64'
                    },
                    {
                        id: 10,
                        name: '招投标数据渲染',
                        path: 'TenderMetaRender'
                    },
                ]
            }
        }
    }
</script>

<style scoped lang="less">
    .tab {
        display: flex;

        .nav {
            display: flex;
            flex-direction: column;
            width: 172px;
            height: 100vh;

            border-right: 1px solid #dcdfe6;
            background-color: #fff;

            .logo {
                position: relative;
                padding-left: 15px;
                padding-top: 10px;
                width: 100%;
                height: 60px;
                font-size: 18px;
                font-weight: 800;
                color: #c03;

                img {
                    width: 50px;
                    height: 50px;
                }

                span {
                    position: absolute;
                    top: 19px;
                }
            }

            .tab-item {
                height: 60px;
                font-size: 15px;
                font-weight: bold;
                line-height: 60px;
                color: black;
                padding-left: 15px;

                &:hover {
                    background-color: rgb(204, 204, 204);
                }

                &.router-link-active {
                    .tab-link {
                        color: rgb(204, 0, 51);
                    }
                }
            }
        }

        .content {
            width: calc(100vw - 173px);
        }
    }
</style>