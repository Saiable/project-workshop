import http from './http.js'

let swiperContainerHome = document.querySelector('#swiper-container-home'),
    wrapper = swiperContainerHome.querySelector('.swiper-wrapper'),
    pagenation = swiperContainerHome.querySelector('.swiper-pagenation')
console.log(swiperContainerHome)
let step = 0 // 用来记录当前展示的是哪一个图片

// 数据绑定，根据服务器中的数据，动态拼接字符串，然后放入容器中
const binding = function binding(data) {
    let str_slide = ``,
        str_pagenation = ``

    data.forEach((item, index) => {
        str_slide += `<a href="${item.href}" targe="_blank">
                <img src="${item.pic}" alt="" class="banner-img" alt="${item.title}">
            </a>`
        str_pagenation += `<li class="${index === step ? 'active' : ''}">${item.title}</li>`
    })

    // 拼好后放入指定容器中
    wrapper.innerHTML = str_slide
    pagenation.innerHTML = str_pagenation
}

http.get('/home_banner').then(data => {
    binding(data)
    // 一些额外的处理

    swiperContainerHome.classList.remove('loading')
})

