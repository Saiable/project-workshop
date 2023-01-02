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
        name: 'DictFormat',
        mixins: [myMixins],
        data() {
            return {
                name: "dict",
                inputPlaceholder: `
输入待格式化的字典或JSON，如
{"a":None, "b":True, "c":False, "d":true, "e":false, "f":1, "g":"hi"}
`,
                outPlaceholder: `
# 输出python的字典：
{
    "a": None,
    "b": True,
    "c": False,
    "d": True,
    "e": False,
    "f": 1,
    "g": "hi"
}
`
            }
        },
    }
</script>

<style scoped lang="less">
    @import "@/styles/common.less";
</style>
