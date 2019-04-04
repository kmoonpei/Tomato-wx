const http = require('../../utils/http')

Page({
    data: {
        id: null,
        data: {},
    },
    onLoad(option) {
        console.log('onLoad id:', option.id)
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
    }

})