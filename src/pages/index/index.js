//index.js
//获取应用实例
// import util = require('../../utils/util.js');
// import formatTime from '../../utils/test.ts';
// import * as testTT from '../../utils/testTT';

// console.log(new testTT.Clock(2,1) );
// console.log(util.formatTime(new Date()));
const app = getApp()
// formatTime(new Date())
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        currentPath: '',
        scene: 0,
        params: '',
        openId: '',
        unionId: '',
        sessionKey: ''
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function (options) {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    }, () => {
                        return true;
                    })
                }
            })
        }
        console.log('from onLoad option:', options);
        console.log('globalData', getApp())
        console.log('getLaunchOptionsSync 场景值：', wx.getLaunchOptionsSync())
        let launchOption = wx.getLaunchOptionsSync(); // 当前数据同 app.js launch(options)

        // let formParams = ''
        // let query = launchOption.query
        // Object.keys(query).map( (key, i) => {
        //     formParams += `${i === 0 ? '?' : '&'}${key}=${query[key]}`
        // })
        // TODO: 多次分享传参用 option 更新launchOption 
        this.setData({
            currentPath: launchOption.path || '',
            scene: launchOption.scene || 0,
            query: JSON.stringify(launchOption.query),
            referrerInfo: JSON.stringify(launchOption.referrerInfo),
            shareTicket: launchOption.shareTicket || '',
            params: JSON.stringify(launchOption.query)
        })
    },
    getUserInfo: function (e) {
        // console.log(e)
        // app.globalData.userInfo = e.detail.userInfo
        // this.setData({
        //     userInfo: e.detail.userInfo,
        //     hasUserInfo: true
        // })
        let that = this;
        qq.login({
            success(res) {
                if (res.code) {
                    console.log("code",res.code)
                    return;
                    let code = res.code;
                    that.requestOpenId(code)
                } else {
                    console.log('login fail')
                }
            }
        })

    },
    requestOpenId(code) {
        let that = this;
        qq.request({
            url: 'https://api.q.qq.com/sns/jscode2session', //仅为示例，并非真实的接口地址
            data: {
                appid: '',
                secret: '',
                js_code:code,
                grant_type: 'authorization_code'
            },
            success(res) {
                console.log(res.data)
                that.setData({
                    openId: res.data.openid,
                    unionId: res.data.unionid,
                    sessionKey: res.data.session_key
                })
            }
        })
    },
    getAccessToken() {
        qq.request({
            url: 'https://api.q.qq.com/api/getToken',
            data: {                                                                                                                                                                                                                                                                                                                                                                                    
                grant_type: 'client_credential',
                appid: '',
                secret: ''
            },
            success(res) {
                console.log('token',res.data);
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        })
    },
    getOpenId() {
        this.getUserInfo();
        // return;
        this.getAccessToken();
    },
    launchAppError(e) {
        console.log('launch app error: ', e.detail.errMsg);
    },
    inputEvent(e) {
        let value = e.detail.value;
        console.log(value)
        this.setData({
            params: value
        })
    },
    debugSwitch(e) {
        console.log(e);
        let status = e.currentTarget.dataset.switch;

        if (status === 'on') {
            wx.setEnableDebug({
                enableDebug: true
            });
        } else if (status === 'off') {
            wx.setEnableDebug({
                enableDebug: false
            });
        }
    }
})