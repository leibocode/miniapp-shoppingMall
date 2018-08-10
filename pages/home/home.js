import HomeModel from '../../models/homeModel.js'

var model =new HomeModel()
Page({
    data(){
        loading:false
    },
    onLoad(){
        this._loadData()
    },
    _loadData:function(callback){
        var that = this
              
    },
    onShareAppMessage(){
        return {
            title:'零食1号',
            path:'pages/home/home'
        }
    }
})