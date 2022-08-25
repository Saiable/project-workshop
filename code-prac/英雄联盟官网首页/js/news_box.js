import http from './http.js'
let newsBox = document.querySelector('#news-box'),
    tab = newsBox.querySelector('.news-box-header'),
    tabList = Array.from(tab.querySelectorAll('li')),
    content = newsBox.querySelector('.news-title'),
    contentList = []

// 实现数据绑定
const binding = function binding(data) {
    let str = ``
    data.forEach((item, index) => {
        str += `<ul class="${index === 0 ? 'active' : ''}">`
        item.data.forEach((item2, index2) => {
            let { title, href, time, type } = item2
            if (index2 === 0) {
                str += `<li class="title-header">
                        <a target="_blank" href="${href}">${title}</a>
                    </li>`
                return
            }
            str += `<li class="title">
                    <span class="item-category">
                        <span>${type}</span>
                    </span>
                    <a class="item-tite" href="${href}">${title}</a>
                    <span class="item-time">${time}</span>
                </li>`
        })
        str += `</ul>`
    })

    content.innerHTML = str
    contentList = Array.from(content.querySelectorAll('li'))
}

// 实现页卡切换
const handle = function handle() {

}

http.get('/news_item').then(data => {
    console.log(data);
    content.classList.remove('loading') // 拿到数据后，移出loading样式类
    binding(data) // 数据绑定
    handle()
})