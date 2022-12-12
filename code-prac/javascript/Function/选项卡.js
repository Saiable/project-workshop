var btnList = document.getElementsByTagName('button')

// 使用自定义属性
// for (var i = 0; i < btnList.length; i++) {
//     btnList[i].myIndex = i
//     btnList[i].onclick = function() {
//         console.log(this.myIndex)
//     }
// }

// 使用闭包
for (var i = 0; i < btnList.length; i++) {
    btnList[i].onclick = (function (i) {
        return function () {
            console.log(i)
        }
    })(i)
}

// 当然了，可以使用let关键字，有自己的块级作用域