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
        name: 'EncodeBase64',
        mixins: [myMixins],
        data() {
            return {
                name: "encode_base64",
                inputPlaceholder: `
输入待编码的的字符串如：
123456
`,
                outPlaceholder: `
# 输出：
MTIzNDU2
`
            }
        },

    }
</script>

<style scoped lang="less">
    @import "@/styles/common.less";
</style>
