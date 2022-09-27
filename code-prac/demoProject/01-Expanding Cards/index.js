const panels = document.querySelectorAll('.panel')

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        removeClass()
        panel.classList.add('active')
    })
})

const removeClass = function removeClass() {
    panels.forEach(panel => {
        panel.classList.remove('active')
    })
}