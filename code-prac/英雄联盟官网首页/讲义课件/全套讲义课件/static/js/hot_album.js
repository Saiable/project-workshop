import http from './http.js';

let hotAlbum = document.querySelector('#hot-album'),
    tab = hotAlbum.querySelector('.tab'),
    tabList = tab.querySelectorAll('li'),
    content = hotAlbum.querySelector('.album-con'),
    wrapper = content.querySelector('.wrapper'),
    arrowLeft = hotAlbum.querySelector('.arrow-left'),
    arrowRight = hotAlbum.querySelector('.arrow-right');
let serverData;

// 数据绑定
const binding = function binding(name) {
    let str = ``,
        data;
    data = serverData.find(item => item.name === name);
    if (!data) {
        wrapper.innerHTML = '';
        return;
    };
    data = data.data;
    data.forEach(item => {
        let {
            id,
            pic,
            title,
            description,
            updateTime,
            authorPic,
            author
        } = item;
        str += `<li class="item">
            <a href="https://lol.qq.com/v/v2/detail.shtml?docid=${id}" target="_blank">
                <div class="pic-box">
                    <img src="${pic}" alt="${title}">
                    <div class="text">
                        <h4 class="title text-clip">${title}</h4>
                        <p class="update text-clip">${updateTime}</p>
                    </div>
                </div>
                <p class="desc">${description}</p>
                <p class="author">
                    ${authorPic?`<img src="${authorPic}" alt="${author}">`:``}
                    <span class="text-clip">${author}</span>
                </p>
            </a>
        </li>`;
    });
    wrapper.innerHTML = str;
    wrapper.style.width = `${data.length*155}px`
    wrapper.style.transitionDuration = '0s';
    wrapper.style.left = 0;
    setDisable();
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

// 左右切换
const setDisable = function checkDisable() {
    let curLeft = parseFloat(wrapper.style.left),
        maxLeft = -(parseFloat(wrapper.style.width) - 465);
    curLeft >= 0 ? arrowLeft.classList.add('disable') : arrowLeft.classList.remove('disable');
    curLeft <= maxLeft ? arrowRight.classList.add('disable') : arrowRight.classList.remove('disable');
};
const change = function change() {
    arrowLeft.style.display = 'block';
    arrowRight.style.display = 'block';

    const click = function click(dir) {
        if (this.classList.contains('disable')) return;
        let curLeft = parseFloat(wrapper.style.left),
            maxLeft = -(parseFloat(wrapper.style.width) - 465);
        dir === 'right' ? curLeft -= 465 : curLeft += 465;
        curLeft = curLeft >= 0 ? 0 : (curLeft <= maxLeft ? maxLeft : curLeft);
        wrapper.style.transitionDuration = '.3s';
        wrapper.style.left = `${curLeft}px`;
        setDisable();
    };
    arrowLeft.addEventListener('click', click.bind(arrowLeft, 'left'));
    arrowRight.addEventListener('click', click.bind(arrowRight, 'right'));
};

// 获取数据
http.get('/hit_album').then(data => {
    serverData = data;
    content.classList.remove('loading');
    binding('周一');
    handle();
    change();
});