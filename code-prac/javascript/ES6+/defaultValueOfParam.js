(function () {
    // 函数形参默认值
    function add(a, b, c = 10) {
        return a + b + c;
    }
    let result = add(1, 2)
    console.log(result) //13

    let sum = (n = 0, m = 0) => n + m

    // 与解构赋值相结合
    function connect({ host = "127.0.0.1", username, password, port }) {
        console.log(host, username, password, port);
    }
    connect({
        username: 'root',
        password: 'root',
        port: 3306
    })
})()