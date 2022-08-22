import http from './http.js'

let swiperContainerHome = document.querySelector('#swiper-container-home'),
    wrapper = swiperContainerHome.querySelector('.swiper-wrapper'),
    pagenation = swiperContainerHome.querySelector('.swiper-pagenation'),
    pagenationList = []
console.log(swiperContainerHome)
let step = 0, // 用来记录当前展示的是哪一个图片
    count = 0, //记录slide数量，包含克隆的那一个
    slideWidth = swiperContainerHome.offsetWidth, // 记录slide宽度（每次运动的距离）
    interval = 2000, // 轮播图自动运动的时间
    autoTimer = null // 记录自动轮播的定时器


// 数据绑定，根据服务器中的数据，动态拼接字符串，然后放入容器中
const binding = function binding(data) {
    let str_slide = ``,
        str_pagenation = ``,
        first = data[0]
    data.forEach((item, index) => {
        str_slide += `<a href="${item.href}" targe="_blank">
                    <img src="${item.pic}" alt="" class="banner-img" alt="${item.title}">
                </a>`
        str_pagenation += `<li class="${index === step ? 'active' : ''}">${item.title}</li>`
    })

    // 为了实现无缝衔接，拼好后再放一张图片，克隆的部分，只克隆图片
    if (first) {
        str_slide += `<a href="${first.href}" targe="_blank">
                <img src="${first.pic}" alt="" class="banner-img" alt="${first.title}">
            </a>`
        // str_pagenation += `<li class="${index === step ? 'active' : ''}">${first.title}</li>`
    }
    // 拼好后放入指定容器中
    wrapper.innerHTML = str_slide
    pagenation.innerHTML = str_pagenation
}
// 开启自动轮播
const autoMove = function autoMove() {
    step++
    if(step >= count ) {
        // 当前处于克隆的这一张，让其立即运动到真实的第一张（视觉差），运动完之后，再让其运动到第二张（索引为1）
        wrapper.style.transitionDuration = `0s` // 立即运动，就是没有动画
        wrapper.style.left = `0px` 
        // 注意浏览的渲染队列机制，上面的样式不会立即渲染
        // 刷新浏览器的渲染队列
        wrapper.offsetWidth // 通过获取盒子属性，实现刷新浏览器属性
        step = 1
    }
    wrapper.style.transitionDuration = `.3s`
    wrapper.style.left = `${-step*slideWidth}px` // 控制绝对定位的left值，为负值
    // 浏览器的4个样式是一起渲染的，导致后面的会覆盖掉前面的样式
    
    //每次切换完，实现分页器对齐
    pagenationAlign()
}

// 实现分页器对齐
const pagenationAlign = function pagenationAlign () {
    let temp = step
    temp === count-1 ? temp =0 : null
    pagenationList.forEach((item, index) => {
        item.className = index === temp ? 'active' : ''
    })
}

// 实现分页器切换
const pagenationHandle = function pagenationHandle () {
    pagenationList.forEach((item, index) => {
    })
}

http.get('/home_banner').then(data => {
    binding(data)
    // 一些额外的处理

    swiperContainerHome.classList.remove('loading')
    count = data.length + 1
    wrapper.style.width = `${count*slideWidth}px`
    wrapper.style.left = `${-step*slideWidth}px` // 控制绝对定位的left值，为负值
    pagenationList = Array.from(pagenation.querySelectorAll('span')) // dom操作获取的是类数组，要转为数组
    // 开启轮播
    autoTimer = setInterval(autoMove, interval)
    // 控制自动轮播
    swiperContainerHome.addEventListener('mouseenter', () => {
        clearInterval(autoTimer)
    })
    swiperContainerHome.addEventListener('mouseleave', () => setInterval(autoMove, interval))

})

