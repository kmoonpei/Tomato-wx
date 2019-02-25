const request = require('../../utils/http');
Page({
    data: {
        title: '详情',
    },
    setTitle() {
        this.setData({ title: "new title" });
    },
    fetchdata() {
        request.requestGet('/user').then(data => {
            console.log('请求成功了：', data)
        }).catch(err => {
            console.log(err)
        })
    },
    fetchdata2() {
        request.requestPost('/user/data1', { type: 1 }).then(data => {
            console.log('请求成功了：', data.data);
        }).catch(err => {
            console.log(err)
        })
    },
    login() {
        request.requestPost('/user/login', { name: 'Lili', pwd: '123' }).then(data => {
            console.log('请求成功了：', data.data);
        }).catch(err => {
            console.log(err)
        })
    },
    logout() {
        request.requestGet('/user/logout').then(data => {
            console.log('请求成功了：', data.data);
        }).catch(err => {
            console.log(err)
        })
    },
})