export function live2dClick() {
    let handler = function() {
        console.log('clickaa')
    }
    setTimeout(function () {
        let live2d = document.querySelector("#live2d-widget")
        console.log(live2d)
        live2d.addEventListener("click", handler, false)
    },1500)
}