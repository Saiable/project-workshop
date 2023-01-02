<template>
    <div class="jsonformat">
        <div class="source-content">

            <el-select v-model="selectEncoding" placeholder="请选择">
                <el-option v-for="(item, _) in encodingOptions" :key="item.id"
                           :label="item.label"
                           :value="item.value">
                </el-option>
            </el-select>

            <el-input
                    v-model="textarea"
                    type="textarea"
                    :placeholder="inputPlaceholder"
            />
        </div>
        <div class="analysic-result">
            <codemirror
                    v-model="result"
                    :placeholder="outPlaceholder"
                    :style="cusOptions.style"
                    :spellcheck="cusOptions.spellcheck"
                    :autofocus="cusOptions.autofocus"
                    :indent-with-tab="cusOptions.indentWithTab"
                    :tabSize="cusOptions.tabSize"
                    :extensions="cusOptions.extensions"
            />
        </div>
    </div>
</template>

<script>
    import {myMixins} from '@/mixins/myMixins';

    export default {
        name: 'UrlParamsParse',
        mixins: [myMixins],
        data() {
            return {
                name: "url_params_parse",
                inputPlaceholder: `
输入待解析参数的url，如
https://www.baidu.com/s?wd=feapder&pn=10
`,
                outPlaceholder: `
# 输出：
url = "https://www.baidu.com/s"
params = {
    "wd": "feapder",
    "pn": "10"
}
`,
            }
        },
    }
</script>

<style scoped lang="less">
    @import "@/styles/common.less";
</style>

