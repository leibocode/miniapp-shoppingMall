import regeneratorRuntime from '../../utils/runtime.js'
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
    async _loadData(){
        let data = await category.getCategory();
        this.setData({
            categoryArr:data,
            loading:true,
            categoryInfo:{
                title:data[0].name,
                cate:data[0].children
            }
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
    //跳转到列表页面
    onProductList:function(event){
        let id  = category.getDataSet(event,'id')
        console.log(id)
        wx.navigateTo({
            url:'../list/list?cid='+id
        })
    },
    //分享
    onShareAppMessage:function(){
        return {
            title:'零食1号',
            path:'page/category/category'
        }
    }
})