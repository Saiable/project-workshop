import './head_box.js';
import './swiper_container_home.js';
import './news_box.js';
import './hot_events.js';
import './news_video.js';
import './hot_album.js';
import './match_core.js';
import './best_team.js';
import './league_table.js';
import './hero_info.js';

// 控制更多按钮的动画效果
let commMoreArrowList = Array.from(document.querySelectorAll('.comm-more-arrow'));
commMoreArrowList.forEach(item => {
    let parent = item.parentNode;
    if (!parent) return;
    parent.addEventListener('mouseenter', function () {
        item.className = 'comm-more-arrow move';
    });
    parent.addEventListener('mouseleave', function () {
        item.className = 'comm-more-arrow';
    });
});