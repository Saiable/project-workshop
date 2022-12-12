// module.exports = {
//   'plugins': {
//     'postcss-px2rem-exclude': {
//       remUnit: 80,
//       exclude: /node_modules|folder_name/i
//     }
//   }
// }

// https://www.npmjs.com/package/postcss-pxtorem
const autoprefixer = require('autoprefixer');
const px2rem = require('postcss-pxtorem');
 
module.exports = {
  plugins: [autoprefixer(), px2rem({ rootValue: 80, unitPrecision: 5, propList: ['*'] })], 
};