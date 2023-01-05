import http from './http.js';

let newVideos = document.querySelector('#new-videos'),
    tab = newVideos.querySelector('.tab'),
    tabList = Array.from(tab.querySelectorAll('li')),
    content = newVideos.querySelector('.videos-con');
let storage = [],
    _data = [];

// 数据绑定
const binding = async function binding(name) {
    content.innerHTML = '';
    content.classList.add('loading');

    // 请求指定项数据（数据缓存）
    let str = ``,
        data;
    data = storage.find(item => item.name === name);
    if (data) {
        data = data.data;
    } else {
        data = await http.get('/latest_video', {
            params: {
                name
            }
        });
        storage.push({
            name,
            data
        });
    }
    _data = data;

    data.forEach((item, index) => {
        let {
            id,
            title,
            playTimes,
            updateTime,
            videoLength,
            pic,
            background
        } = item;
        str += `<li class="item" index="${index}">
            <a href="https://lol.qq.com/v/v2/detail.shtml?docid=${id}" target="_blank">
                <div class="pic-box">
                    <img src="${pic}" alt="">
                    <span class="video-length">${videoLength}</span>
                    ${background && background.length>0?`<div class="img-box"
                        style="background-image: url('${background[0]}');">
                        <div class="progress"><span></span></div>
                    </div>`:`<div class="btn-play center">
                        <i class="sp-index"></i>
                        <span class='center'></span>
                    </div>`}
                </div>
                <p class="name-video">${title}</p>
                <div class="desc">
                    <span class="play-times">${playTimes}</span>
                    <span class="update-time">${updateTime}</span>
                </div>
            </a>
        </li>`;
    });
    content.innerHTML = str;
    content.classList.remove('loading');
};

// 页卡切换
const handle = function handle() {
    tab.addEventListener('mouseover', function (ev) {
        let target = ev.target;
        if (target.tagName === "I") target = target.parentNode;
        if (target.tagName === 'LI' && target.className !== "active") {
            tabList.forEach(item => item.className = item === target ? 'active' : '');
            binding(target.innerText.trim());
        }
    });
};

// 图片幻灯片
const queryItem = function queryItem(target) {
    while (target) {
        if (target.tagName === "LI" && target.className === "item") return target;
        target = target.parentNode;
    }
    return target;
};
const queryX = function queryX(target) {
    let parent = target.offsetParent,
        x = target.offsetLeft;
    while (parent.tagName !== "BODY") {
        x += parent.offsetLeft;
        x += parent.clientLeft;
        parent = parent.offsetParent;
    }
    return x;
};
const imagePlay = function imagePlay() {
    content.addEventListener('mousemove', function (ev) {
        let target = queryItem(ev.target),
            index,
            imgBox,
            progress,
            progressValue,
            mouseX = ev.pageX,
            targetX,
            spanX,
            width,
            ratio,
            background;
        if (!target) return;
        index = +target.getAttribute('index');
        imgBox = target.querySelector('.img-box');
        if (!imgBox) return;
        progress = imgBox.querySelector('.progress');
        progressValue = progress.querySelector('span');

        width = target.offsetWidth;
        targetX = queryX(target);
        spanX = mouseX - targetX;
        background = _data[index].background || [];

        ratio = spanX / width;
        index = Math.round(background.length * ratio);
        index = index < 0 ? 0 : (index > background.length - 1 ? background.length - 1 : index);
        imgBox.style.backgroundImage = `url('${background[index]}')`;
        progressValue.style.width = `${Math.round((index+1)/background.length*100)}%`;
    });
};

// 第一次数据绑定结束后，才可进行以下操作
binding('推荐').then(() => {
    handle();
    imagePlay();
});