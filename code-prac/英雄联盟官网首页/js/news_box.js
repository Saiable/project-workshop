import http from './http.js'
let newsBox = document.querySelector('#news-box'),
    tab = newsBox.querySelector('.news-box-header'),
    tabList = Array.from(tab.querySelectorAll('li')),
    tabSpan = Array.from(tab.querySelectorAll('span')),
    content = newsBox.querySelector('.news-title'),
    contentList = []

// 实现数据绑定
const binding = function binding(data) {
    let str = ``
    data.forEach((item, index) => {
        str += `<ul class="${index === 0 ? 'active' : ''}" name="${item.name}">`
        item.data.forEach((item2, index2) => {
            let {
                title,
                href,
                time,
                type
            } = item2
            if (index2 === 0) {
                str += `<li class="title-header">
                        <a target="_blank" href="${href}">${title}</a>
                    </li>`
                return
            }
            str += `<li class="title">
                    <span class="item-category">
                        <span class=" ${type === '视频' ? 'video' : ''}">${type}</span>
                    </span>
                    <a class="item-tite" href="${href}">${title}</a>
                    <span class="item-time">${time}</span>
                </li>`
        })
        str += `</ul>`
    })

    content.innerHTML = str
    contentList = Array.from(content.querySelectorAll('ul'))
    // console.log('contentList', contentList)
}

// 实现页卡切换
const handle = function handle() {
    // 方案一：基于forEach实现
    // tabList.forEach((item, index) => {
    //     if(index === 0) item.className = 'first'
    //     item.addEventListener('mouseover', function (params) {
    //         // this指向鼠标划过的对象，这里是span
    //         let self = this
    //         // 当前选中的有选中样式，其余的移除选中样式
    //         self.className = 'active'
    //         tabList.forEach((item2, index2) => { // 这里用箭头函数，用到的是上下文的this
    //             if(item2 !== this) {
    //                 item2.className = ''
    //             }
    //         })

    //         contentList[index].className = 'active' // 先给所有的子元素都添加active样式类，然后通过比较循环以下标获取的对象是否相等，对非选中的对象移除样式类
    //         contentList.forEach(item=> {
    //             if(item !== contentList[index]) {
    //                 item.className = ''
    //             }
    //         })
    //     })

    // })

    // 方案二：for循环配合let
    // 方案三：for循环+var+自定义属性
    // 方案四：使用事件委托。为啥我用了事件委派，页面明显更慢了呀（是因为结构里还有一层）
    tab.addEventListener('mouseover', function (ev) {
        let target = ev.target
        if (target.tagName === 'SPAN' && target.className !== 'active') {
            tabSpan.forEach((item, index) => {
                item.className = item === target ? 'active' : ''
            })
            contentList.forEach(item => {
                item.className = item.getAttribute('name') === target.innerText.trim() ? 'active' : ''
            })
        }

    })



}

http.get('/news_item').then(data => {
    // console.log(data);
    content.classList.remove('loading') // 拿到数据后，移出loading样式类
    binding(data) // 数据绑定
    handle()
})