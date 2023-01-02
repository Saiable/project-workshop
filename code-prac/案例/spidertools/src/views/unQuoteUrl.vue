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
        name: 'unQuoteUrl',
        mixins: [myMixins],
        data() {
            return {
                name: "unquote_url",
                inputPlaceholder: `
输入待反转义的url，如
https://www.baidu.com/s?wd=%E4%BD%A0%E5%A5%BD
`,
                outPlaceholder: `
输出：
https://www.baidu.com/s?wd=你好
`,
            }
        },
    }
</script>

<style scoped lang="less">
    @import "@/styles/common.less";
</style>

