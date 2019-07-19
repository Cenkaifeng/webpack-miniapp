/**
 * type
 * Created by undefined 
 * 2019-07-18
 * @options ...
 */
import util = require('../../utils/util.js');
// import formatTime from '../../utils/test.ts';
import * as testTT from '../../utils/testTT';

console.log(new testTT.Clock(2,1) );
console.log(util.formatTime(new Date()));
Page({
    data: {
        oneTest: '',
        twoTest: ''
    },
    /**
     * 与页面渲染无关的本页公用变量
     */
    customData: {},
    onLoad: function () {
        console.log('hey lalalalalalallalal');
    }
})