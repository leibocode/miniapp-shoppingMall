import HomeModel from '../../models/homeModel.js'

var model =new HomeModel()
Page({
    data:{
        bannerArr:null,
        loading:false,
        themeArr:null,
        productsArr:null,
        isLoadMore:false,
        page:1,
        isHideLoadMore:true,
        isShowFooter:true,
        price:'all'
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
        model.getProductData({price:this.data.price,page:this.data.page,size:10},(data)=>{
            that.setData({
                productsArr:data
            })
            callback && callback()
        })
    },

    _loadProduct:function(price,page,size,callback){

        model.getProductData({price:price,page:page,size:size},(data)=>{
            var products =this.data.productsArr
            console.log(products)
            data.forEach((item)=>{
                if(item.img.indexOf('http')==-1){
                  item.img = 'http://www.hehe168.com/'+item.img
                }
                products.push(item)
            })
            this.setData({
                productsArr:products
            })
            callback && callback(data)
        })
    },

    //跳转到商品详情
    onProductItemTap:function(event){
        var id =model.getDataSet(event,'id')
        wx.navigateTo({
            url:'../product/product?id='+id
        })
    },

    //banner详情
    onBannerItemTap:function(event){
        var id = model.getDataSet(event,'id')
        console.log(id)
        wx.navigateTo({
            url:'../list/list?bid='+id
        })
    },

    //主题详情
    onThemeItemTap(event){
        var id =model.getDataSet(event,'id')
        console.log(id);
        wx.navigateTo({
            url:'../theme/theme?id='+id
        })
    },

    //下拉刷新
    onPullDownRefresh:function(){
        //wx.showNavigationBarLoading()
        wx.showLoading({
            title: '加载中'
        })
        setTimeout(()=>{
            this._loadData()
            wx.hideLoading()
            //wx.hideNavigationBarLoading()
            //系统的方式x
            wx.stopPullDownRefresh()
        },1500)
    },

    onReachBottom:function(){
        var that =this
        this.data.isHideLoadMore =false
        setTimeout(()=>{

            var newPage = this.data.page +1
            var price = this.data.price
            this._loadProduct(price,newPage,10,(data)=>{
                if(data.length>0){
                    that.setData({
                        isHideLoadMore:true,
                        page:newPage
                    })
                }else {
                    console.log('没有数据了...')
                    this.setData({
                        isHideLoadMore:true,
                        isShowFooter:false
                    })
                }
            })
        },1000)
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
