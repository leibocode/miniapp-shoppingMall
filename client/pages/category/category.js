import Category from '../../models/categoryModel'

const category =new Category()

Page({
    data:{
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
                categoryInfo:{
                    title:data[0].name,
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
            categoryInfo:{
                title:this.data.categoryArr[index].name,
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