import http from './http.js';

let hotEvents = document.querySelector('#hot-events'),
    tab = hotEvents.querySelector('.tab'),
    tabList = Array.from(tab.querySelectorAll('li')),
    content = hotEvents.querySelector('.event-con');
let serverData = [];

// 数据绑定
const binding = function binding(name = '正在进行') {
    let str = ``,
        data;
    data = serverData.find(item => item.name === name);
    if (!data) {
        content.innerHTML = '';
        return;
    };
    data = data.data;
    data.forEach(({
        title,
        href,
        pic,
        desc,
        overTime,
        explain,
        isNew
    }) => {
        str += `<li class="item">
            <a href="${href}" target="_blank">
                <div class="pic-box">
                    <img src="${pic}" alt="${title}">
                    <div class="desc sp-comm">
                        <h4 class="text-clip">${title}</h4>
                        <p class="text-clip">${desc}</p>
                        <p>${explain}</p>
                    </div>
                </div>
                <div class="text">
                    <p class="text-clip">${title}</p>
                    <span>
                        ${overTime}
                        ${isNew?`<i class="icon-new sp-comm center-y"></i>`:``}
                    </span>
                </div>
            </a>
        </li>`;
    });
    content.innerHTML = str;
};

// 页卡切换
const handle = function handle() {
    tab.addEventListener('mouseover', function (ev) {
        let target = ev.target;
        if (target.tagName === 'LI' && target.className !== "active") {
            tabList.forEach(item => item.className = item === target ? 'active' : '');
            binding(target.innerHTML);
        }
    });
};

// 获取数据
http.get('/hot_events').then(data => {
    content.classList.remove('loading');
    serverData = data;
    binding();
    handle();
});