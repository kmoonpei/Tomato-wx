const http = require('../../utils/http')

Page({
    data: {
        id: null,
        data: {},
        collected:true,
    },
    onLoad(option) {
        console.log('onLoad id:', option.id)
        wx.getStorage({
            key: 'uid',
            success: (result) => {
                this.setData({ uid: result.data })
            },
            fail: () => { },
            complete: () => { }
        });
        this.setData({ id: option.id }, () => {
            this.getData();
        })
    },
    getData() {
        let payload = {
            id: this.data.id
        }
        http.requestPost('/caipu/detail', payload)
            .then(data => {
                if (data.data.code === 0) {
                    console.log('detail:', data)
                    let dat = data.data.data;
                    dat.material = JSON.parse(dat.material);
                    dat.steps = JSON.parse(dat.steps);
                    this.setData({ data: dat });
                }
            })
    },
    collect() {
        let { uid, id } = this.data;
        let payload = {
            uid: uid,
            cpid: id
        }
        http.requestPost('/caipu/collect', payload)
            .then(data => {
                if (data.data.code === 0) {
                    this.setData({collected:!this.data.collected})
                }
            })
    }

})