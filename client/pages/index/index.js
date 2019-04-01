//index.js
// var qcloud = require('../../vendor/wafer2-client-sdk/index')
// var config = require('../../config')
var util = require('../../utils/util.js')
var http = require('../../utils/http')

Page({

    data: {
        list: [{ id: 1 }, { id: 2 }],

    },
    onReady: function () {
        //检查本地是否存在skey
        let that = this;
        this.getList();
        wx.getStorage({
            key: 'skey',
            success(res) {
                console.log("获取本地skey", res);
                if (!res.data) {
                    wx.navigateTo({
                        url: '../authorization/authorization',
                        success: function () {

                        }
                    })
                }
                wx.checkSession({//检查session_key是否有效
                    success() {
                        console.log('此时检查session_key有效')
                        // that.getList();
                    },
                    fail() {
                        wx.navigateTo({
                            url: '../authorization/authorization',
                            success: function () {

                            }
                        })
                    }
                })
            },
            fail(err) {
                console.log("err:", err);
                wx.navigateTo({
                    url: '../authorization/authorization',
                    success: function () {

                    }
                })
            }
        })
    },
    getList() {
        let payload = {
            page: 1
        }
        let that = this;
        http.requestPost('/caipu/index', payload)
            .then(data => {
                if (data.data.code == 0) {
                    that.setData({ list: data.data.data })
                    console.log('list:', this.data.list)
                }
            }).catch(err => {
                console.log(err)
            })
    },
    goSearch() {
        wx.navigateTo({ url: '../search/search' })
    }

})
