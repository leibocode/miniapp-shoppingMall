import ThemeModel from '../../models/themeModel.js'
let theme =new ThemeModel()


Page({
    data:{
        id:0,
        theme:null
    },
    onLoad:function(options){
        var id =options.id
        console.log(id)
        this.setData({
            id:id
        })
        this._loadData()
    },
    _loadData:function(){
        let that =this
        theme.getThemeDataById(this.data.id,(data)=>{
            let filterData =[]
            data[0].products.forEach((item)=>{
                let url ='http://www.hehe168.com'+item.img
                item.img = url
            })
            that.setData({
                theme:data
            })
        })
    },

    onProductItemTap:function(event){
        let id =theme.getDataSet(event,'id')
        wx.navigateTo({
            url:'../product/product?id='+id
        })
    }
})