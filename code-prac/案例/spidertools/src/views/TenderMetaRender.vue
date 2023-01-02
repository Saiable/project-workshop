<template>
    <el-button @click="getTenderMeta" type="primary">下一条</el-button>

    <el-button @click="clearTenderMeta" type="danger">清空队列</el-button>
    <br>
    <br>
    <div class="jsonformat">

        <div class="source-content">

            <div>
                <el-form model="form" :rules="rules" class="form_class" label-position="left">
                    <el-form-item label="标题" label-width="80px">
                        <el-col :span="21">
                            <el-input v-model="MetaData.title" autosize="{ minRows: 2, maxRows: 10 }"
                                      type="textarea"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="省级" label-width="80px">
                        <el-col :span="21">
                            <el-input style="width:100%" v-model="MetaData.province_name"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="地区" label-width="80px">
                        <el-col :span="21">
                            <el-input style="width:100%" v-model="MetaData.area"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="时间" label-width="80px">
                        <el-col :span="21">
                            <el-input style="width:100%" v-model="MetaData.publish_date"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="栏目" label-width="80px">
                        <el-col :span="21">
                            <el-input style="width:100%" v-model="MetaData.channel_name"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="详情页url" label-width="80px">
                        <el-col :span="21">
                            <el-input style="width:100%" v-model="MetaData.source_url"></el-input>
                        </el-col>
                    </el-form-item>


                    <el-form-item label="网站" label-width="80px">
                        <el-col :span="21">
                            <el-input style="width:100%" v-model="MetaData.website_name"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item>
                        <span slot="label" style="width: 80px">
                            <span style="color: #cc0033">错误信息</span>
                        </span>
                        <el-input v-model="MetaData.err_message" autosize="{ minRows: 2, maxRows: 10 }"
                                  style="width: 70%" type="textarea"></el-input>
                    </el-form-item>
                </el-form>

                <div>
                    <a target="_blank" :href="MetaData.source_url" style="width: 80px; color: maroon; font-size: 16px">{{"跳转到原文"}}:
                        {{MetaData.title}}</a>
                </div>
                <br>
                <el-button @click="getTenderMeta" type="primary">下一条</el-button>

            </div>

        </div>
        <div class="analysic-result">
            <div v-html="MetaData.content"></div>
        </div>

    </div>
</template>

<script>
    // import {myMixins} from '@/mixins/myMixins';

    import {clearTenderMeta, getTenderMeta} from "../api/format";

    export default {
        name: 'TenderMetaRender',
        // mixins: [myMixins],
        data() {
            return {
                MetaData: {},
            }
        },
        methods: {
            getTenderMeta() {
                getTenderMeta({}).then(
                    // 对返回的数据进行处理
                    res => {
                        if (res.code === 200) {
                            this.MetaData = res.data;
                            // 有错误信息的及时提示,避免错过
                            if (res.data.err_message !== '' && res.data.err_message !== undefined) {
                                alert("请仔细排查错误数据" + res.data.err_message);
                            }
                        } else {
                            alert(res.message);
                        }
                    }
                ).catch(err => {
                    console.log("@@@@", err);
                });
            },
            clearTenderMeta() {
                clearTenderMeta({}).then(
                    // 对返回的数据进行处理
                    res => {
                        if (res.code === 200) {
                            alert(res.message);
                        } else {
                            alert(res.message);
                        }
                    }
                ).catch(err => {
                    console.log("@@@@", err);
                });
            },
        }

    }
</script>

<style scoped lang="less">
    .jsonformat {
        height: 100%;
        display: flex;

        .source-content {
            width: 30%;
            height: 100%;
            border-right: 1px solid grey;
            margin-left: 6px;
        }

        .analysic-result {
            width: 70%;
            height: 100%;
            margin-left: 10px;

            .jv-container {
                //height: 100%;
            }
        }
    }


</style>
