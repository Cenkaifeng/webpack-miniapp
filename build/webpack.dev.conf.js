const merge = require('webpack-merge');
const baseWebpack = require('./webpack.base.conf');


const webpackConfig = merge(baseWebpack, {
    mode: 'dev',
})


module.exports = webpackConfig