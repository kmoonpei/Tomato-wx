const request = require('../../utils/http');

Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function () {

    },
    // bindGetUserInfo1(e) {
    //     // this.setData({ showAuth: false })
    //     console.log(e.detail.userInfo)
    // },
    bindGetUserInfo(e) {
        var that = this;
        console.log(e.detail.userInfo)
        wx.login({
            success(res) {
                if (res.code) {
                    request.requestPost('/user/loginWx', { code: res.code }).then(data => {
                        console.log(data.data);
                        wx.setStorage({
                            key: 'skey',
                            data: data.data.data.skey
                        })
                        wx.showToast({
                            title: '登录成功',
                            icon: 'success',
                            duration: 3000,
                            success: function () {
                                wx.navigateBack({
                                    delta: 1
                                })
                            }
                        })
                        // wx.getSetting({
                        //     success(res) {
                        //         if (res.authSetting['scope.userInfo']) {
                        //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                        //             wx.getUserInfo({
                        //                 success(res) {
                        //                     console.log(res.userInfo);
                        //                     // that.setData({ userInfo: res.userInfo })

                        //                 }
                        //             })
                        //         }
                        //     }
                        // })

                    })
                } else {
                    console.log('登录失败', res.errMsg)
                }
            }
        })
    },
})