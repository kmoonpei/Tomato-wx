const request = require('../../utils/http');
Page({
    data: {
        userInfo: {},
        items: [
            { icon: '../../imgs/myworks.png', tit: '我的发布' },
            { icon: '../../imgs/love.png', tit: '我的收藏' }]
    },
    onReady() {
        let payload = {};
        let _this = this;
        wx.getStorage({
            key: 'uid',
            success: (result) => {
                payload.uid = result.data;
                request.requestPost('/user/info', payload).then(data => {
                    console.log('info:', data)
                    if (data.data.code === 0) {
                        _this.setData({ userInfo: data.data.data });
                    }
                })
            },
        });

    }
})