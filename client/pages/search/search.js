
let http = require('../../utils/http')
Page({
    data: {
        searched: ['红豆酥', '早餐饼', '干煸豆角', '锅巴饭', '松鼠桂鱼', '鱼香茄子'],
        hot_search: ['凉菜', '家常拌面', '红烧鱼', '回锅肉', '蒜香排骨', '纸杯蛋糕', '麻婆豆腐', '三杯鸡'],
        delt_keyword_icon: false,
        keyword: '',//搜索词
        list: [],
    },
    onReady() {

    },
    keywordInput(e) {
        // console.log('e:',e)
        let keyword = e.detail.value.trim();
        this.setData({ delt_keyword_icon: true, keyword: keyword });
    },
    deletKeyword() {
        this.setData({ keyword: '', delt_keyword_icon: false, list: [] })
    },
    searchHandle(e) {
        console.log('e:', e)
        let keyword;
        let old_data = this.data.searched;
        if (e.target.id) {
            this.setData({ keyword: e.target.id, delt_keyword_icon: true });
            keyword = e.target.id;
            if (!old_data.includes(keyword)) {
                old_data.unshift(keyword);
                this.setData({ searched: old_data })
            }
            this.getList();
        } else {
            if (!this.data.keyword) {
                wx.showToast({
                    title: '请输入搜索关键字',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: false,
                    success: (result) => {

                    },
                    fail: () => { },
                    complete: () => { }
                });
            } else {
                keyword = this.data.keyword;
                if (!old_data.includes(keyword)) {
                    old_data.unshift(keyword);
                    this.setData({ searched: old_data })
                }
                this.getList();
            }
        }
    },

    deltSearched() {
        this.setData({ searched: [] })
    },
    getList() {
        let payload = {
            page: 1
        }
        http.requestPost('/caipu/index', payload)
            .then(data => {
                if (data.data.code === 0) {
                    this.setData({ list: data.data.data })
                }
            }).catch(err => {
                console.log(err)
            })
    }
})