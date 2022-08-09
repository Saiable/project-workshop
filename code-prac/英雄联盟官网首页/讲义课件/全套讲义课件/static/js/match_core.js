import http from './http.js';

let matchCore = document.querySelector('#match-core'),
    arrowFold = matchCore.querySelector('.arrow-fold'),
    tab = matchCore.querySelector('.tab'),
    tabList = Array.from(tab.querySelectorAll('li')),
    content = matchCore.querySelector('.content');

let foldFlag = false,
    serverData;
matchCore.style.display = 'none';

// 数据绑定
const binding = function binding(name) {
    let str = ``,
        data;
    data = serverData.find(item => item.name === name);
    if (!data) {
        content.innerHTML = '';
        arrowFold.style.display = 'none';
        return;
    }
    arrowFold.style.display = 'block';
    data = data.data;

    data.forEach(item => {
        str += `<div class="tr">`;
        item.forEach((item, index) => {
            let className = "td";
            if (item.flag) {
                if (item.type === 'score' && item.flag !== "draw") {
                    className += " " + item.flag;
                }
                if (item.type === 'title') {
                    className += " " + item.flag;
                }
            }
            str += `<div class="${className}" index="${index}">
                ${item.type==='logo'?
                    `<img src="${item.value}" alt="">`:
                    (item.link?`<a href="${item.link}" target="_blank">${item.value}</a>`:item.value)
                }
            </div>`;
        });
        str += `</div>`;
    });
    content.innerHTML = str;
};

// 页卡切换
const handle = function handle() {
    tab.addEventListener('mouseover', function (ev) {
        let target = ev.target;
        if (target.tagName === 'LI' && target.className !== "active") {
            tabList.forEach(item => item.className = item === target ? 'active' : '');
            binding(target.innerText.trim());
        }
    });
};

// 鼠标滑过TD的处理
const mouseHandle = function mouseHandle() {
    const change = function change(flag, ev) {
        let target = ev.target,
            index = 0,
            others = [];
        if (target.tagName === "IMG" || target.tagName === "A") target = target.parentNode;
        if (target.tagName === "DIV" && target.className.includes('td')) {
            index = +target.getAttribute('index');
            if (index === 0 || index === 19 || index === 18) return;
            target.style.backgroundColor = flag ? 'rgba(249, 62, 80, 0.2)' : '';
            others = Array.from(content.querySelectorAll(`div[index="${index}"]`));
            others.forEach(item => {
                if (item === target) return;
                item.style.backgroundColor = flag ? 'rgba(249, 62, 80, 0.12)' : '';
            });
        }
    };
    content.addEventListener('mouseover', change.bind(content, true));
    content.addEventListener('mouseout', change.bind(content, false));
};

// 获取数据
http.get('/match').then(data => {
    serverData = data;
    matchCore.style.display = 'block';
    binding('大场');
    handle();
    mouseHandle();

    // 展开更多处理
    arrowFold.addEventListener('click', function () {
        if (foldFlag) {
            foldFlag = false;
            content.style.height = '70px';
            arrowFold.innerHTML = `展开全部<i></i>`;
            return;
        }
        foldFlag = true;
        content.style.height = 'auto';
        arrowFold.innerHTML = `收起全部<i class='up'></i>`;
    });
});