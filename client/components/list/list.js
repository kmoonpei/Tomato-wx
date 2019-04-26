Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        list:Object
    },
    data: {
        // 这里是一些组件内部数据
        someData: 1
    },
    methods: {
        // 这里是一个自定义方法
        goDetail(e){
            wx.navigateTo({ url: `../../pages/caipu.detail/caipu.detail?id=${e.currentTarget.id}` });
        }
    }
})

