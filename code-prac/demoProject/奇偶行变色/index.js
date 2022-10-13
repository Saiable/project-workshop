let ulEle = document.querySelector('.container'),
    liEle = document.querySelectorAll('.item')

for(let i = 0; i < liEle.length; i++) {
    let liItem = liEle[i]
    liItem.style.backgroundColor = i % 2 === 0 ? '#ddd' : '#fff' // 初始化背景颜色
    // let currentBgc = liItem.style.backgroundColor // 记录初始背景颜色
    // 使用自定义属性，存储背景颜色
    // 自定义属性编程思想：前期把一些值存储到元素的自定义属性上，后期需要用到的时候，直接从属性上获取到这些值即可
    liItem.myOriginBg = liItem.style.backgroundColor

    liItem.onmouseover = function() { // 鼠标滑过改变背景颜色
        this.style.backgroundColor = 'lightblue'
    }

    liItem.onmouseout = function() { // 鼠标移出恢复背景颜色
        this.style.backgroundColor = this.myOriginBg
    }
}