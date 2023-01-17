// https://www.npmjs.com/package/postcss-pxtorem

const autoprefixer = require('autoprefixer');
const px2rem = require('postcss-pxtorem');

module.exports = {
    plugins: [autoprefixer(), px2rem({ 
        rootValue: 37.5,
        unitPrecision: 5, 
        propList: ['*'],
        exclude: /node_modules/
    })],
};