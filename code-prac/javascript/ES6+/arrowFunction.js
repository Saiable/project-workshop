(function () {
    // 普通函数
    function sum(n, m) {
        return n + m
    }
    // 改写成箭头函数
    let sumA = (n, m) => {
        return n + m
    }

    // 如果函数体中只有一行return，可以省略return和大括号，一行搞定
    let sumB = (n, m) => n + m

    // 函数中返回函数（柯里化函数）
    function fn(n) {
        return function (m) {
            return n + m
        }
    }

    // 柯里化函数改写成箭头函数
    let fn1 = (n) => (m) => n + m

    // ------------------------------------------------------------------------------------------------------

    // ES5获取实参的方式
    function date() {
        console.log(arguments);
    }
    date('a', 'b', 'c'); // Arguments(3) ['a', 'b', 'c', callee: ƒ, Symbol(Symbol.iterator): ƒ]

    // 箭头函数没有arguments（箭头函数的arguments始终是一个空类数组对象）
    let argFunc = () => {
        console.log(arguments) // 可以打印，但并没有值
    }
    argFunc(1, 2, 3, 4)

    // rest参数
    function date02(...args) {
        console.log(args); // 结果是数组，可以使用数组的一些api，filer some every map等
    }
    date02('d', 'e', 'f'); // [ 'd', 'e', 'f' ]

    // `rest`参数必须要放到参数的最后
    function fn(a, b, ...args) {
        console.log(a, b, args)
    }
    fn(1, 2, 3, 4, 5); //1 2 [ 3, 4, 5 ]

    // rest参数实现任意数求和
    let sumArgs = (...args) => eval(args.join('+'))
    console.log(`sumArgs: ${sumArgs(1, 2, 3, 4, 5)}`)
})()