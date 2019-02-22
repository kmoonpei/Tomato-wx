const { request } = require('../../utils/http');
Page({
    data: {
        title: '详情',
    },
    setTitle() {
        this.setData({ title: "new title" });
    },
    fetchdata() {
        request('/user').then(data => {
            console.log('请求成功了：', data)
        }).catch(err => {
            console.log(err)
        })
    },
    fetchdata2() {
        request('/user/data', { type: 1 }).then(data => {
            console.log('请求成功了：', data.data);
        }).catch(err => {
            console.log(err)
        })
    }
})