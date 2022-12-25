(function () {
  // let Start
  console.log("let -----------------------");
  // var关键字没有块级作用域，只有函数作用域
  if (true) {
    var name = "Matt";
    console.log(name); // Matt
  }
  console.log(name); // Matt，在方括号外面仍可以访问

  if (true) {
    let age = 26;
    console.log(age); // 26
  }
  // console.log(age); // Uncaught ReferenceError: age is not defined

  // let不允许重复声明
  let repeat;
  // let repeat; // Uncaught SyntaxError: Identifier 'repeat' has already been declared

  // 暂时性死区
  // age 不会被提升
  // console.log(age); // ReferenceError：age 没有定义
  // let age = 26;

  return (content_let = arguments.callee);
  // let End
})();
