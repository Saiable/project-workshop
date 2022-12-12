let cart = document.querySelector('.box')
let detail = document.querySelector('.detail')

cart.onclick = function () {
    let show = detail.style.display
    if (show === 'none') {
        detail.style.display = 'block'
        // show = 'block' // 不会生效
    } else {
        detail.style.display = 'none'
        // show = 'none'
    }
}