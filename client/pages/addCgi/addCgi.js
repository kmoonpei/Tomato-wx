//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
        material: [{ id: 0 }, { id: 1 }, { id: 2 }]
    },
    addnum() {
        let old_data = this.data.material;
        let new_obj = { id: old_data[old_data.length - 1].id + 1 };
        old_data.push(new_obj);
        this.setData({ material: old_data });
    },
    dletMaterialItem() {

    }

})

