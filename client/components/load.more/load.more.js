//Component Object
Component({
    properties: {
        loading: Boolean,
    },
    data: {
        str:''
    },
    methods: {

    },
    created: function () {

    },
    attached: function () {

    },
    ready: function () {
        this.setData({ str: this.data.loading ? '正在加载……' : '没有更多数据了' })
    },
    moved: function () {

    },
    detached: function () {

    },
});