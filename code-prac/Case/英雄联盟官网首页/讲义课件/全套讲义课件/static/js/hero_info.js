import http from './http.js';

let heroInfo = document.querySelector('#hero-info'),
    tab = heroInfo.querySelector('.tab'),
    tabList = Array.from(tab.querySelectorAll('li')),
    content = heroInfo.querySelector('.hero-info-con'),
    wrapper = content.querySelector('.wrapper');
let serverData,
    myIScroll;

// 数据绑定
const binding = function binding(name) {
    let str = ``,
        data = serverData;
    if (name && name !== "所有英雄") {
        switch (name) {
            case '战士':
                name = 'fighter';
                break;
            case '法师':
                name = 'mage';
                break;
            case '坦克':
                name = 'tank';
                break;
            case '刺客':
                name = 'assassin';
                break;
            case '辅助':
                name = 'support';
                break;
            case '射手':
                name = 'marksman';
                break;
        }
        data = data.filter(item => item.type.includes(name));
    }
    if (!data) data = [];
    data.forEach(item => {
        let {
            hero,
            heroLogo,
            href
        } = item;
        str += `<li>
            <a href="https://lol.qq.com${href}" target="_blank">
                <div class="pic-box">
                    <img src="${heroLogo}" alt="${hero}">
                    <i class="icon"></i>
                </div>
                <p class="text-clip">${hero}</p>
            </a>
        </li>`;
    });
    wrapper.innerHTML = str;

    // 重新刷新滚动区域
    if (myIScroll) {
        myIScroll.refresh();
        myIScroll.scrollTo(0, 0);
    } else {
        // 开启局部滚动
        myIScroll = new IScroll(content, {
            mouseWheel: true,
            scrollbars: true
        });
    }
};

// 页卡切换
const handle = function handle() {
    tab.addEventListener('click', function (ev) {
        let target = ev.target;
        if (target.tagName === 'LI' && target.className !== "active") {
            tabList.forEach(item => item.className = item === target ? 'active' : '');
            binding(target.innerHTML);
        }
    });
};

// 获取数据
http.get('/hero_info').then(data => {
    serverData = data;
    content.classList.remove('loading');
    binding();
    handle();
});