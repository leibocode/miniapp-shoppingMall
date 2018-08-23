import HomeModel from '../../models/homeModel.js'

var model =new HomeModel()
Page({
    data:{
        bannerArr:null,
        loading:false,
        themeArr:null,
        productsArr:null,
        isLoadMore:false,
        page:1
    },
    onLoad:function(){
        console.log('加载数据');
        this._loadData();
    },
    
    _loadData:function(callback){
        var that = this
        //
        console.log('加载数据---');
        model.getBannerData(function(data){
            that.setData({
                bannerArr:data
            })   
        })

        //获取主题
        model.getThemeData((data)=>{
            that.setData({
                themeArr:data,
                 loading:true
            })
        })

        //
        model.getProductData({page:this.data.page,size:10},(data)=>{
            that.setData({
                productsArr:data
            })
            callback && callback()
        })
    },

    _loadProduct:function(page,){

    },

    //跳转到商品详情
    onProductItemTap:function(event){
        var id =model.getDataSet(event,'id')
        wx.navigateTo({
            url:'../product/product?id='+id
        })
    },

    //banner详情
    onBannerItemTap:function(){

    },

    //下拉刷新
    onPullDownRefresh:function(){
        wx.showNavigationBarLoading()
        setTimeout(()=>{
            this._loadData()
            
            wx.hideNavigationBarLoading()
            //系统的方式x
            wx.stopPullDownRefresh()
        },1500)
    },

    onReachBottom:function(){
        console.log('加载数据')
    },

    //分享效果
    onShareAppMessage:function(){
        return {
            title:'零食1号',
            path:'pages/home/home'
        }
    }
    //下拉刷新页面
})
