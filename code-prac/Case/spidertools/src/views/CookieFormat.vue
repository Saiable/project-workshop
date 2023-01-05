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
        name: 'CookieFormat',
        mixins: [myMixins],
        data() {
            return {
                name: "cookie",
                inputPlaceholder: `
输入待格式化的Cookie如：
Hm_lvt_f45b875b62fd14ec127215dd2057b3cd=1631504515,1632622540; _ga_KS7S55K3YN=GS1.1.1632626830.8.0.1632626830.0
`,
                outPlaceholder: `
# 输出：
{
    "Hm_lvt_f45b875b62fd14ec127215dd2057b3cd": "1631504515,1632622540",
    "_ga_KS7S55K3YN": "GS1.1.1632626830.8.0.1632626830.0"
}
`
            }
        },

    }
</script>

<style scoped lang="less">
    @import "@/styles/common.less";
</style>
