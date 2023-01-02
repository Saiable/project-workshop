import {formatData} from '@/api/format'
import {Codemirror} from "vue-codemirror";
import {python} from "@codemirror/lang-python";
import {oneDark} from "@codemirror/theme-one-dark";
import {githubLight, githubDark} from '@uiw/codemirror-theme-github';
// import {darcula} from '@uiw/codemirror-theme-darcula';


export const myMixins = {
    components: {
        Codemirror
    },
    data() {
        return {
            textarea: '',
            result: '',
            selectEncoding: "utf-8",
            encodingOptions: [{
                id: 0,
                value: 'utf-8',
                label: '选择 utf-8 编码'
            }, {
                id: 1,
                value: 'gbk',
                label: '选择 gbk 编码'
            },
            ], // 编码格式的选择
            cusOptions: {
                style: {
                    height: "100%",
                    width: "100%",
                    fontSize: "16px",
                    whiteSpace: "pre-wrap"
                },
                spellcheck: true,
                autofocus: true,
                indentWithTab: false,
                tabSize: 4,
                extensions: [python(), oneDark], //传递给CodeMirror EditorState。创建({扩展})
                lineWrapping: true,
                lineNumber: true,
                fixedGutter: true,
            },

        }
    },
    watch: {
        textarea(newValue, oldValue) {
            if (newValue) {
                let data = {
                    "format_type": this.name,
                    "input_str": this.textarea,
                    "encoding": this.selectEncoding,
                };
                formatData(data).then(
                    // 对返回的数据进行处理
                    res => {
                        if (res.code === 200) {
                            this.result = res.data;
                        } else {
                            this.result = res.message;
                        }
                    }
                ).catch(err => {
                    console.log("@@@@", err);
                });
            }
        },
        selectEncoding(newValue, oldValue) {
            if (newValue) {
                let data = {
                    "format_type": this.name,
                    "input_str": this.textarea,
                    "encoding": this.selectEncoding,
                };
                formatData(data).then(
                    // 对返回的数据进行处理
                    res => {
                        if (res.code === 200) {
                            this.result = res.data;
                        } else {
                            this.result = res.message;
                        }
                    }
                ).catch(err => {
                    console.log("@@@@", err);
                });
            }
        }
    },
    mounted() {
        this.result = this.outPlaceholder;
    }
};
