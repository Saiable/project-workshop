// 基于事件委托实现导航详情的控制
let headBox = document.querySelector('#head-box'), // 通过id获取head-box容器
    navDetail = headBox.querySelector('.nav-detail'),
    headNav = headBox.querySelector('.head-nav')
// 用dom2级事件绑定（addEventListener），允许给同一个元素同一个事件行为绑定多个不同的方法
// dom0级事件绑定（onclick），只允许给同一个元素同一个事件行为绑定一个方法，绑定第二个方法会覆盖掉第一个

// 给外层元素添加事件，不能用mouseenter，因为其不存在事件冒泡机制，也就不能做事件委托
// 鼠标只要划过document里任何一个元素上，通过事件传播机制，都会触发document的mouseover行为
// 触发mouseover行为时，浏览器会帮我们把function执行，并且可以接受到事件对象
// 注意，这样实时触发事件，并不会对性能有影响；因为即使不写这些，划过每个元素，仍然都会触发每个元素的mouseover事件，仍然会触发document的事件，事件行为是天生就存在的，不管写不写代码，事件行为天生就会触发，只不过啥事不干而已；现在我们只是监听事件行为之后，让它干了点事情；并不会对性能有太大的影响；而且不需要做防抖和节流，只有频繁触发才需要做

// 获得所有的祖先元素
const getAncestors = function getAncestors(element) {
    // 一直找父元素，直到找不到父元素 document.parent = null
    let arr = [element]
    parent = element.parentNode
    while (parent) {
        arr.push(parent) // 不用unshift，每次都要调索引
        parent = parent.parentNode
    }
    return arr
}

document.addEventListener('mouseover', function (ev) {
    let target = ev.target, // 获取到事件源
        ancestors = getAncestors(target)
    // 对事件源判断，进行逻辑处理
    // console.log(target) // 拿到的事件源，可能是head-nav里的任意子元素，所以要获取当前事件源所有的祖先元素
    // 两次通过js获取到的dom元素对象，虽然也是堆内存，但两次获取的结果是相等的
    
    // 事件源是头部导航
    if(ancestors.indexOf(headNav) > -1) {
        navDetail.style.display = 'block'
        // navDetail.offsetWidth // 刷新浏览器的渲染队列机制，不用定时器
        // navDetail.style.transform = 'translateY(0px)';
        navDetail.style.animation = 'headMove .3s both'
        return
    }
    // 事件源是详情
    if(ancestors.indexOf(navDetail) > -1) return

    // 其他事件源
    navDetail.style.display = 'none'
    // navDetail.offsetWidth // 刷新浏览器的渲染队列机制，不用定时器
    // navDetail.style.transform = 'translateY(-10px)';
    navDetail.style.animation = 'none'
})