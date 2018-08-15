import HomeModel from '../../models/homeModel.js'

var model =new HomeModel()
Page({
    data:{

    },
    onLoad:function(){
        this._loadData()
    },
    
    _loadData:function(callback){
        var that = this
        //
    },
    onShareAppMessage(){
        return {
            title:'零食1号',
            path:'pages/home/home'
        }
    }
})
