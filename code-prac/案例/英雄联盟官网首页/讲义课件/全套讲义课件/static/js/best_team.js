import http from './http.js';

let bestTeam = document.querySelector('#best-team'),
    content = bestTeam.querySelector('.con');

// 绑定数据
const binding = function binding(data) {
    let str = ``;
    data.forEach(item => {
        let {
            player,
            pic,
            rankRole,
            teamLogo
        } = item;
        str += `<li class="item">
            <div class="icon">
                <i class="${rankRole}"></i>
                <img src="${teamLogo}" alt="" class="team-logo">
            </div>
            <div class="pic-box">
                <img src="${pic}" alt="">
            </div>
            <p class="name">${player}</p>
        </li>`;
    });
    content.innerHTML = str;
};

// 获取数据
http.get('/best_team').then(data => {
    content.classList.remove('loading');
    binding(data);
});