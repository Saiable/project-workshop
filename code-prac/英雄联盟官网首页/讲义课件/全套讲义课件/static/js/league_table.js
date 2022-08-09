import http from './http.js';

let leagueTable = document.querySelector('#league-table'),
    body = leagueTable.querySelector('.body'),
    wrapper = body.querySelector('.wrapper');

// 绑定数据
const binding = function binding(data) {
    let str = ``;
    data.forEach(item => {
        let {
            ranking,
            club,
            clubLogo,
            win,
            score
        } = item;
        str += `<li>
            <span>${ranking}</span>
            <span><img src="${clubLogo}" alt="${club}">${club}</span>
            <span>${win}</span>
            <span>${score}</span>
        </li>`;
    });
    wrapper.innerHTML = str;
};

// 获取数据
http.get('/league_table').then(data => {
    body.classList.remove('loading');
    binding(data);

    // 实现局部滚动
    new IScroll(body, {
        mouseWheel: true,
        scrollbars: true
    });
});