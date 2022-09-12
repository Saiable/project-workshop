import './head_box.js';
import './swiper_container_home.js'
import './news_box.js'
//编写一些公共的逻辑

initArrow()

function initArrow() {
    let commMoreArrowList = Array.from(document.querySelectorAll('.comm-more-arrow'))
    commMoreArrowList.forEach(item => {
        let parent = item.parentNode
        if (!parent) return
        parent.addEventListener('mouseenter', function () {
            item.className = 'comm-more-arrow move'
            // item.classList.add('move');
        })
        parent.addEventListener('mouseleave', function () {
            item.className = 'comm-more-arrow'
            // item.classList.remove('move');
        })
    })
}