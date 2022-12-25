//观察者设计模式
//发布者 -->商家
var shopObj = {};
//商品列表 [key:[]], key为商品名
shopObj.list = [];
//订阅方法
shopObj.listen = function (key, fn) {// key是商品型号, fn这个函数就是订阅的行为
    if (!this.list[key]) {
        this.list[key] = [];
    }
    this.list[key].push(fn);//往商品名为key的商品列表中添加订阅
}
//发布消息方法
shopObj.publish = function (key) {
    //var key = arguments[0];//如果不传参数key，这样也可以
    var fns = this.list[key];
    // for (var i = 0; i < fns.length; i++) {
    for (var i = 0, fn; fn = fns[i++];) {
        //执行订阅的函数fn  arguemnts储存的所有实参
        // var fn = fns[i++];
        fn.apply(this, arguments)
    }
}
//A用户添加订阅
shopObj.listen("华为", function (brand, model) {
    console.log("A用户收到：" + brand + model + "手机降价了");
})
// //B用户添加订阅
// shopObj.listen("华为", function (brand, model) {
//     console.log("B用户收到：" + brand + model + "手机降价了");
// })
// //c用户添加订阅
// shopObj.listen("小米", function (brand, model) {
//     console.log("C用户收到：" + brand + model + "手机降价了");
// })
//双11 商家发布消息华为降价的信息
shopObj.publish("华为", "p30");
// shopObj.publish("小米", "Mix4");
