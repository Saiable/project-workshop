const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*` // 匹配标签名
const qnameCapture = `((?:${ncname}\\:)?${ncname})`

const startTagOpen = new RegExp(`^<${qnameCapture}`) // 匹配到的分组，是一个标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`) // 匹配到的分组，是结束标签名

const attribute =  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const startTagClose = /^\s*(\/?)>/
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

// console.log(endTag)
function parsetHTML(html) {// 每解析一个标签，就把它从字符串中删除掉
    function advance(n) { // 截取
        html = html.substring(n)
    }

    function parseStartTag() {
        const start = html.match(startTagOpen) // 结果是一个数组
        console.log(start)
        if(start) {
            // 匹配到了，把结果（数组）组成一个对象
            const match = {
                tagName: start[1], // 标签名
                attrs: []
            }
            advance(start[0].length) // 根据匹配到的字符的长度，进行删除
            // console.log(match)
            // console.log(html)
            let attr, end
            while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) { // 如果不是开始标签的结束，就一直匹配，并且每次匹配都把匹配到的结果存起来
                advance(attr[0].length) // 每次匹配完，再把匹配过的字符去掉
                match.attrs.push(
                    {
                        name:attr[1], 
                        value: attr[3] || attr[4] || attr[5] || true
                    }
                )
            }
            // console.log(match)

            if(end) {
                // 如果匹配到了end，也应该删除
                advance(end[0].length)
            }
            return match
        }
        
        return false // 不是开始标签，返回false
    }

    while(html) {
        // vue2中，html最开始一定是一个< 
        // 如果textEnd为0，说明是一个开始标签或者结束标签
        // 如果textEnd>0，说明就是文本的结束位置
        let textEnd = html.indexOf('<') // 如果索引为0，则说明是个标签，开始标签取完了，再去取尖角号，取到的是文本结束的位置
        if(textEnd == 0) {
            const startTagMatch = parseStartTag() // 开始标签的匹配结果
            if(startTagMatch) {
                // continue
                console.log(html) // 截取完之后，可能还是开始标签
            }
            break
        }
        if(textEnd >= 0) {
            let text = html.substring(0, textEnd) // 文本内容
            break
        }
    }
}
// 对模板进行编译处理
export function compileToFunction(template) {
    // 1.将template转化成ast抽象语法树
    let ast = parsetHTML(template)
    // 2.生成render方法（返回的结果，就是虚拟dom）
    console.log(template)
}