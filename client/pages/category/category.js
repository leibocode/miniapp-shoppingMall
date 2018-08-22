import Category from '../../models/categoryModel'

const category =new Category()

Page({
    data:{
        transClassArr:['tanslate0','tanslate1','tanslate2','tanslate3','tanslate4','tanslate5','tanslate6','tanslate7'],
        currentMenuIndex:0,
        loading:false
    },
    onLoad:function(){
        this._loadData()
    },
    _loadData:function(){
        var that =this
        category.getCategory((data)=>{
            that.setData({
                categoryArr:data,
                loading:true
            })
        })
    },
    //
    changeCategory:function(event){
        var index =category.getDataSet(event,'index')
        this.setData({
            currentMenuIndex:index 
        })
    },

    //商品详情
    onProductItem:function(){

    },

    //下拉刷新
    onPullDownRefresh:function(){

    },
    onShareAppMessage:function(){
        return {
            title:'零食1号',
            path:'page/category/category'
        }
    }
})