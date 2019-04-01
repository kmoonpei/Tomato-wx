//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var http = require('../../utils/http')
var baseUrl = require('../../utils/variable').baseUrl

Page({
    data: {
        foodName: "",
        tempFilePaths: "", //封面图
        foodDescribe: "", //菜品描述
        material: [
            {
                id: 0,
                name: "",
                dosage: ""
            }, {
                id: 1,
                name: "",
                dosage: ""
            }, {
                id: 2,
                name: "",
                dosage: ""
            }
        ],
        steps: [
            {
                tag: 1,
                img: '',
                describe: ''
            }
        ]
    },
    //填写菜品名称
    nameInput(e) {
        this.setData({ foodName: e.detail.value });
    },
    //添加封面图
    addCoverImg() {
        let that = this;
        wx.chooseImage({
            count: 1,
            sizeType: [
                'original', 'compressed'
            ],
            sourceType: [
                'album', 'camera'
            ],
            success(res) {
                // console.log('上传图片的信息：', res) tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths[0];
                http.uploadImageFile('/upload', tempFilePaths, (res) => {
                    let data = JSON.parse(res.data)
                    console.log(data);
                    that.setData({ tempFilePaths: data.data });
                })
            }
        })
    },
    //填写菜品描述
    foodDescribeInput(e) {
        this.setData({ foodDescribe: e.detail.value });
    },
    //填写食材名称
    itemNameInput(e) {
        let old_arr = this.data.material;
        old_arr.forEach((ele) => {
            if (ele.id == e.target.id) {
                ele.name = e.detail.value;
            }
        });
        this.setData({ material: old_arr });
    },
    //填写食材用量
    itemDosageInput(e) {
        let old_arr = this.data.material;
        old_arr.forEach((ele) => {
            if (ele.id == e.target.id) {
                ele.dosage = e.detail.value;
            }
        });
        this.setData({ material: old_arr });
    },
    //新添食材
    addnum() {
        let old_data = this.data.material;
        let old_id = old_data.length > 0
            ? old_data.length - 1
            : 0
        let new_obj = {
            id: old_id + 1,
            name: "",
            dosage: ""
        };
        old_data.push(new_obj);
        this.setData({ material: old_data });
    },
    //删除食材
    dletMaterialItem(e) {
        let old_data = this.data.material;
        let delt_id = e.target.dataset.item.id;
        old_data.forEach((ele, index) => {
            if (ele.id === delt_id) {
                old_data.splice(index, 1);
            }
        });
        this.setData({ material: old_data });
    },
    //添加步骤图片
    addstepImg(e) {
        let that = this;
        let old_arr = this.data.steps;
        let update_tag = e.target.dataset.item.tag;
        wx.chooseImage({
            count: 1,
            sizeType: [
                'original', 'compressed'
            ],
            sourceType: [
                'album', 'camera'
            ],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths[0];
                http.uploadImageFile('/upload', tempFilePaths, (res) => {
                    let data = JSON.parse(res.data)
                    old_arr.forEach((element) => {
                        if (element.tag === update_tag) {
                            element.img = data.data;
                        }
                    });
                    that.setData({ steps: old_arr });
                })
            }
        });
    },
    //添加步骤描述
    itemDescribeInput(e) {
        let old_arr = this.data.steps;
        old_arr.forEach((ele) => {
            if (ele.tag == e.target.id) {
                ele.describe = e.detail.value;
            }
        });
        this.setData({ steps: old_arr });
    },
    //新添步骤描述
    addstep() {
        let old_data = this.data.steps;
        let old_tag = old_data.length > 0
            ? old_data.length
            : 0
        let new_obj = {
            tag: old_tag + 1,
            img: "",
            describe: ""
        };
        old_data.push(new_obj);
        this.setData({ steps: old_data });
    },
    //发布
    publish() {
        console.log('编辑的信息：', this.data)
        let { foodName, tempFilePaths, foodDescribe, material, steps } = this.data;
        let payload = {
            foodName: foodName,
            tempFilePaths: tempFilePaths,
            foodDescribe: foodDescribe,
            material: material,
            steps: steps
        }
        http.requestPost('/user/createcook', payload)
            .then(data => {
                if (data.code === 0) {
                    console.log(data.msg)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

})
