import http from './http.js';

let newsBox = document.querySelector('#news-box'),
    newsTab = newsBox.querySelector('.tab'),
    newsTabList = Array.from(newsTab.querySelectorAll('li')),
    newsContent = newsBox.querySelector('.news-content'),
    newsContentList = [];

// 数据绑定
const binding = function binding(data) {
    let str = ``;
    data.forEach((item, i) => {
        str += `<ul class="${item.name==='综合'?'active':''}" name="${item.name}">`;
        item.data.forEach((cur, index) => {
            if (index === 0) {
                str += `<li class="item sp-index">
                    <a class="text-clip" href="${cur.href}" target="_blank">${cur.title}</a>
                </li>`;
                return;
            }
            str += `<li class="item">
                <span class="item-type ${cur.type==='视频'?'video':''}">${cur.type}</span>
                <a class="text-clip" href="${cur.href}" target="_blank">${cur.title}</a>
                <span class="item-time">${cur.time}</span>
            </li>`;
        });
        str += `</ul>`;
    });
    newsContent.innerHTML = str;
    newsContentList = Array.from(newsContent.querySelectorAll('ul'));
};

// 页卡切换
const handle = function handle() {
    /* 
    // 问题一：闭包
    // 问题二：不一定可以保证TAB和UL的顺序是对应的
    newsTabList.forEach((item, i) => {
        item.addEventListener('mouseover', function () {
            newsTabList.forEach((cur, j) => cur.className = j === i ? 'active' : '');
            newsContentList.forEach((cur, j) => cur.className = j === i ? 'active' : '');
        });
    }); 
    for (let i = 0; i < newsTabList.length; i++) {
        newsTabList[i].addEventListener('mouseover', function () {
            newsTabList.forEach((cur, j) => cur.className = j === i ? 'active' : '');
            newsContentList.forEach((cur, j) => cur.className = j === i ? 'active' : '');
        });
    }
    */

    /* 
    // 基于自定义属性解决闭包问题
    let i = 0;
    for (; i < newsTabList.length; i++) {
        newsTabList[i].index = i;
        newsTabList[i].addEventListener('mouseover', function () {
            newsTabList.forEach((cur, j) => cur.className = j === this.index ? 'active' : '');
            newsContentList.forEach((cur, j) => cur.className = j === this.index ? 'active' : '');
        });
    } 
    */

    newsTab.addEventListener('mouseover', function (ev) {
        let target = ev.target;
        if (target.tagName === 'LI' && target.className !== "active") {
            newsTabList.forEach(item => item.className = item === target ? 'active' : '');
            newsContentList.forEach(item => item.className = item.getAttribute('name') === target.innerHTML ? 'active' : '');
        }
    });
};

// 从服务器获取数据
http.get('/news_item').then(data => {
    newsContent.classList.remove('loading');
    binding(data);
    handle();
});