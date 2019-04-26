let http = require('../../utils/http')

Component({
    properties: {
        type: String,
    },

    methods: {
        onLoad() {
            this.data.type // 页面参数 paramA 的值;
            wx.getStorage({
                key: 'uid',
                success: (result) => {
                    this.setData({ uid: result.data }, () => {
                        switch (this.data.type) {
                            case '我的发布': this.getMyPublish(); break;
                            case '我的收藏': this.getCollects(); break;
                            default: break;
                        }
                    });
                },
            });

        },
        getMyPublish() {
            let payload = { uid: this.data.uid };
            http.requestPost('/user/works', payload).then(data => {
                console.log('info1:', data)
                if (data.data.code === 0) {
                    this.setData({ list: data.data.data });
                }
            })
        },
        getCollects() {
            let payload = { uid: this.data.uid };
            http.requestPost('/user/my_collects', payload).then(data => {
                console.log('info:', data)
                if (data.data.code === 0) {
                    this.setData({ list: data.data.data });
                }
            })
        }
    }
})