(function () {
  // var Start
  console.log('var -----------------------')

  // 初始化，默认值为undefined
  var message;
  console.log(message); // undefined

  // 声明作用域：使用 var 操作符定义的变量会成为包含它的函数的局部变量。
  // 比如，使用 var在一个函数内部定义一个变量，就意味着该变量将在函数退出时被销毁：
  function test() {
    var hello = "hi"; // 局部变量
  }
  test();
  // console.log(hello); // 出错！ Uncaught ReferenceError: hello is not defined

  // 虽然可以通过省略 var 操作符定义全局变量，但不推荐这么做。在局部作用域中定义的全局变量很难维护，也会造成困惑。
  function test2() {
    hello2 = "hi"; // 全局变量
  }
  test2();
  console.log(hello2); // "hi"

  // var关键字没有块级作用域，只有函数作用域
  if (true) {
    var name = "Matt";
    console.log(name); // Matt
  }
  console.log(name); // Matt，在方括号外面仍可以访问

  // var声明提升
  function foo() {
    console.log(age);
    var age = 26;
  }
  foo(); // undefined
  // 等价于
  function foo1() {
    var age;
    console.log(age);
    age = 26;
  }
  foo1(); // undefined

  // var可以重复声明
  var repeat;
  var repeat;
  return (content_var = arguments.callee);

  // var End
})();
