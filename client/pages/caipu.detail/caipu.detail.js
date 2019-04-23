const http = require('../../utils/http')

Page({
    data: {
        id: null,
        data: {},
        collect_count: null,
        collected: true,
        clr_collec_btn: '#6cb63b',
        collect_str: '收藏'
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
        let { uid, id } = this.data;
        let payload = {
            cpid: id,
            uid: uid
        }
        http.requestPost('/caipu/detail', payload)
            .then(data => {
                if (data.data.code === 0) {
                    console.log('detail:', data)
                    let dat = data.data.data;
                    dat.material = JSON.parse(dat.material);
                    dat.steps = JSON.parse(dat.steps);
                    this.setData({
                        data: dat,
                        collect_count: dat.collect_count,
                        collected: dat.is_collected,
                        clr_collec_btn: !dat.is_collected ? '#6cb63b' : '#aaa',
                        collect_str: !dat.is_collected ? '收藏' : '取消收藏',
                    });
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
                    this.setData({
                        collected: !this.data.collected,
                        collect_count: data.data.msg == "收藏成功" ? ++this.data.collect_count : --this.data.collect_count,
                        collect_str: data.data.msg == "收藏成功" ? '取消收藏' : '收藏',
                        clr_collec_btn: this.data.clr_collec_btn == '#6cb63b' ? '#aaa' : '#6cb63b'
                    })
                }
            })
    }

})