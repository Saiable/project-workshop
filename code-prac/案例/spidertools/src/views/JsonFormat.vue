<template>
    <div class="jsonformat">
        <div class="source-content">
            <el-input
                    v-model="textarea"
                    type="textarea"
                    :placeholder="inputPlaceholder"
            />
        </div>
        <div class="analysic-result">
            <json-viewer
                    :value="result"
                    :copyable="jvConfig.copyable"
                    boxed
                    :expand-depth="99"
                    show-double-quotes
                    :show-array-index="false"/>
        </div>
    </div>
</template>

<script>
    import {formatData} from '@/api/format'

    export default {
        name: 'JsonFormat',
        data() {
            return {
                textarea: '',
                result: {},
                jvConfig: {// 完善JSONviewer样式，https://github.com/chenfengjw163/vue-json-viewer
                    copyable: {copyText: '复制', copiedText: '已复制', timeout: 1000}
                },
                inputPlaceholder: `
{
    "tip1": "支持python dict",
    "tip2": "支持编辑 key value",
    "tip3": "我包含双引号，\\"哈哈哈\\"，可一键将我转义与反转义",
    "tip4": "双击值为JSON array 或 JSON object的行可显示节点路径",
    "双击本行试试": {
        "hi": 1
    },
    "双击本行再试试": [
        666,
        {
            "双击我的上一行试试": "got it"
        }
    ]
}
`,
            }
        },
        watch: {
            textarea(newValue, oldValue) {
                console.log(newValue, typeof newValue);
                if (newValue) {
                    let data = {
                        "format_type": "json",
                        "input_str": newValue,
                    };
                    try {
                        formatData(data).then(
                            res => {
                                if (res.code === 200) {
                                    this.result = JSON.parse(res.data);
                                } else {
                                    this.result = res.message;
                                }
                            }
                        ).catch(err => {
                            console.log(err);
                        });
                    } catch {
                        console.error('请输入正确的JSON格式')
                    }
                } else {
                    this.result = {}
                }
            }
        },
        mounted() {
            this.result = JSON.parse(this.inputPlaceholder);
        }
    }
</script>

<style scoped lang="less">
    @import "@/styles/common.less";
</style>
