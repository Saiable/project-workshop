let cart = document.querySelector('.box')
let detail = document.querySelector('.detail')

cart.onclick = function () {
    let show = detail.style.display
    if (show === 'none') {
        detail.style.display = 'block'
    } else {
        detail.style.display = 'none'
    }
}