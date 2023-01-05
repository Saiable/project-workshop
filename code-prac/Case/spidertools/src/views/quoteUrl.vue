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
        name: 'quoteUrl',
        mixins: [myMixins],
        data() {
            return {
                name: "quote_url",
                inputPlaceholder: `
输入待转义的url，如
https://www.baidu.com/s?wd=你好
`,
                outPlaceholder: `
输出：
安全转义：
https://www.baidu.com/s?wd=%E4%BD%A0%E5%A5%BD

完全转义：
https%3A%2F%2Fwww.baidu.com%2Fs%3Fwd%3D%E4%BD%A0%E5%A5%BD
`,
            }
        },
    }
</script>

<style scoped lang="less">
    @import "@/styles/common.less";
</style>

