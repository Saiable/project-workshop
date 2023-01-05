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
        name: 'CurlFormat',
        mixins: [myMixins],
        data() {
            return {
                name: "curl",
                inputPlaceholder: `
输入curl，如
curl 'https://www.baidu.com/s?wd=feapder' \\
  -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8' \\
  -H 'Cookie: PSTM=1629808491; ' \\
  --compressed
`,
                outPlaceholder: `
import requests


headers = {
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
}
cookies = {
    "PSTM": "1629808491"
}
params = {
    "wd": "feapder"
}
response = requests.get('https://www.baidu.com/s', headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)
`
            }
        },
    }
</script>

<style scoped lang="less">
    @import "@/styles/common.less";
</style>