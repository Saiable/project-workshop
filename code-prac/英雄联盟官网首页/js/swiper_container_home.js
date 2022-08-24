import http from './http.js'

let swiperContainerHome = document.querySelector('#swiper-container-home'),
    wrapper = swiperContainerHome.querySelector('.swiper-wrapper'),
    pagenation = swiperContainerHome.querySelector('.swiper-pagenation')

    // console.log(pagenation)


let step = 0, // 用来记录当前展示的是哪一个图片
    count = 0, //记录slide数量，包含克隆的那一个
    slideWidth = swiperContainerHome.offsetWidth, // 记录slide宽度（每次运动的距离）
    interval = 2000, // 轮播图自动运动的时间
    autoTimer = null, // 记录自动轮播的定时器
    pagenationList = [] // 记录分页器列表

// 数据绑定，根据服务器中的数据，动态拼接字符串，然后放入容器中
const binding = function binding(data) {
    let str_slide = ``,
        str_pagenation = ``,
        first = data[0]
    data.forEach((item, index) => {
        str_slide += `<a href="${item.href}" targe="_blank">
                        <img src="${item.pic}" class="banner-img" alt="${item.title}">
                    </a>`
        str_pagenation += `<li index="${index}" class="${index === step ? 'active' : ''}">${item.title}</li>`
    })

    // 为了实现无缝衔接，拼好后再放一张图片，克隆的部分，只克隆图片
    if (first) {
        str_slide += `<a href="${first.href}" targe="_blank">
                <img src="${first.pic}" class="banner-img" alt="${first.title}">
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
    temp === count-1 ? temp = 0 : null
    pagenationList.forEach((item, index) => {
        item.className = index === temp ? 'active' : ''
    })
}

// 实现分页器切换
const pagenationHandle = function pagenationHandle () {
    // 有多少分页器，就循环了多少次
    // pagenationList.forEach((item, index) => {
    //     item.addEventListener('mouseenter', () => {
    //         step = index // 产生了闭包
    //         wrapper.style.transitionDuration = `.3s`
    //         wrapper.style.left = `${-step*slideWidth}px`
    //         pagenationAlign()
    //     })
    // })

    // 使用事件委派，委托给父元素swiper-pagenation
    // 事件代理的性能，比直接循环列表绑定事件，高了40%~60%
    pagenation.addEventListener('mouseover', function (ev) {
        let target = ev.target,
            index = +target.getAttribute('index') // 拿到的是字符串，在一个值前面加加号，就会将其转为数字
            
        if(target.tagName === 'LI') {
            // 现在要获取对应分页器的索引
            // 当我们动态创建分页器的时候，一定是可以知道索引的，
            // 基于自定义属性处理，在一开始拼接的时候，加上自定义属性
            // 初始化的时候把索引存储起来，后期需要用到索引的时候，基于自定义属性再获取到
            step = index
            wrapper.style.transitionDuration = `.3s`
            wrapper.style.left = `${-step*slideWidth}px`
            pagenationAlign()
        }
    })
}

http.get('/home_banner').then(data => {
    binding(data)
    // 一些额外的处理

    swiperContainerHome.classList.remove('loading') // 移除样式类
    count = data.length + 1
    wrapper.style.width = `${count*slideWidth}px`
    wrapper.style.left = `${-step*slideWidth}px` // 控制绝对定位的left值，为负值
    pagenationList = Array.from(pagenation.querySelectorAll('li')) // dom操作获取的是类数组，要转为数组
    console.log(pagenationList)
    // 开启轮播
    autoTimer = setInterval(autoMove, interval)
    // 控制自动轮播
    swiperContainerHome.addEventListener('mouseenter', () => clearInterval(autoTimer))
    swiperContainerHome.addEventListener('mouseleave', () => autoTimer = setInterval(autoMove, interval))

    // 分页器切换
    pagenationHandle()

})

