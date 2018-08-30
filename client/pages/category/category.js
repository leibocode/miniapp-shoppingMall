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
                loading:true,
                categoryInfo0:{
                    cate:data[0].children
                }
            })
        })
    },
    //
    changeCategory:function(event){
        var index =category.getDataSet(event,'index')
        this.data.categoryInfo0 =[]
        this.setData({
            currentMenuIndex:index,
            categoryInfo0:{
                cate:this.data.categoryArr[index].children
            }
           
        })
        
    },

    //列表页面
    onProductItem:function(){

    },

    isLoadedData:function(){
        if(this.data['categoryInfo'+index]){
            return true
        }else {
            return false
        }
    },

    //下拉刷新
    onPullDownRefresh:function(){
        this._loadData(()=>{
            wx.stopPullDownRefresh()
        })

    },
    onShareAppMessage:function(){
        return {
            title:'零食1号',
            path:'page/category/category'
        }
    }
})