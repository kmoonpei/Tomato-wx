const { baseUrl } = require('./variable');
const requestPost = (url = '', data = {}) => {
    return new Promise((resolve, reject) => {
        wx.request({
            header: {
                'content-type': 'application/json' // 默认值
            },
            method: 'POST',
            url: baseUrl + url,
            data: data,
            success(res) {
                resolve(res);
            },
            fail(err) {
                reject(err)
            }
        })
    })
}
const requestGet = (url = '', data = {}) => {
    return new Promise((resolve, reject) => {
        wx.request({
            header: {
                'content-type': 'application/json' // 默认值
            },
            method: 'GET',
            url: baseUrl + url,
            // data: JSON.stringify(data),
            success(res) {
                resolve(res);
            },
            fail(err) {
                reject(err)
            }
        })
    })
}
module.exports = { requestPost, requestGet };