
let http = require('../../utils/http')
Page({
    data: {
        searched: [],
        hot_search: ['凉菜', '家常拌面', '红烧鱼', '回锅肉', '蒜香排骨', '纸杯蛋糕', '麻婆豆腐', '三杯鸡'],
        delt_keyword_icon: false,
        keyword: '',//搜索词
        list: [],
        page_now: 1,
        loading: false,//加载动画
    },
    onReady() {
        wx.getStorage({
            key: 'search_words',
            success: (result) => {
                this.setData({ searched: result.data })
            }
        });

    },
    onReachBottom() {
        let { page_now, list } = this.data;
        if (page_now * 10 == list.length) {
            this.setData({ page_now: ++this.data.page_now, loading: true }, () => { this.getList() });
        }else{
            
        }
    },
    keywordInput(e) {
        // console.log('e:',e)
        let keyword = e.detail.value.trim();
        this.setData({ delt_keyword_icon: true, keyword: keyword });
    },
    deletKeyword() {
        this.setData({ keyword: '', delt_keyword_icon: false, list: [], page_now: 1 })
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
                wx.setStorage({
                    key: 'search_words',
                    data: old_data
                })
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
                    wx.setStorage({
                        key: 'search_words',
                        data: old_data
                    })
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
            page: this.data.page_now,
            keyword: this.data.keyword
        }
        http.requestPost('/caipu/search', payload)
            .then(data => {
                if (data.data.code === 0) {
                    let dat = data.data.data;
                    dat = dat.map(itm => {
                        let arr = JSON.parse(itm.material).map((it) => { return it.name });
                        itm.material_string = arr.join(',');
                        return itm
                    })
                    let old_list = this.data.list;
                    dat = old_list.concat(dat);
                    this.setData({ list: dat, loading: false })
                }
            }).catch(err => {
                console.log(err)
            })
    },
    goDetail(e) {
        wx.navigateTo({ url: `../caipu.detail/caipu.detail?id=${e.currentTarget.id}` })
    }
})