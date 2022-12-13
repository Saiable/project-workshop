module.exports = {
  // 绝对值方法
  abs() {
    console.log(Math.abs(-12.5)); // 12.5
    console.log(Math.abs(12)); // 12
    console.log(Math.abs(0)); // 0

    // 传递的不是数字类型的值，先基于Number()转换为数字类型再处理
    console.log(Math.abs("-1")); // 1
    console.log(Math.abs("-1px")); // NaN
    console.log(Math.abs(true)); // 1
  },
};
