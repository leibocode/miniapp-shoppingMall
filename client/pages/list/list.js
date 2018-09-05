
Page({
    data:{
        sort:[]
    },

    onLoad:function(){
        let sortArr =[
            {classname: 'icon_bg_1', name: '智能排序', sortType: '1'},
            {classname: 'icon_bg_2', name: '离我最近', sortType: '2'},
            {classname: 'icon_bg_3', name: '人气最高', sortType: '3'},
            {classname: 'icon_bg_4', name: '老师好评', sortType: '4'},
            {classname: 'icon_bg_5', name: '价格最高', sortType: '5'},
            {classname: 'icon_bg_6', name: '价格最低', sortType: '6'}
        ]

        this.setData({
            sort:sortArr
        })
    }
    
})