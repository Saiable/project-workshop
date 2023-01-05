// const panels = document.querySelectorAll('.panel')

// panels.forEach(panel => {
//     panel.addEventListener('click', () => {
//         removeClass()
//         panel.classList.add('active')
//     })
// })

const removeClass = function removeClass() {
    panels.forEach(panel => {
        panel.classList.remove('active')
    })
}

// 基于事件委派实现切换

const container = document.querySelector('.container'),
    panels = document.querySelectorAll('.panel')

container.addEventListener('click', function (ev) {
    let target = ev.target
    if (target.className.indexOf('panel') != -1) {
        removeClass()
        target.classList.add('active')
    }
})
