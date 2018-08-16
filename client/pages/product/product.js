import Product from '../../models/productModel.js'

let product =new Product()

Page({
    data:{
        loading:false,
        hiddenSamllImg:true,
        countArray:[1,2,3,4,5,6,7,8,9,10],
        productCounts:1,
        currentTabsIndex:0,
        cartTotalCounts:0,
        id:"5b72dcc564328b182444a30c"
    },
    onLoad:function(options){
        var id =options.id
        this._loadData()
    },
    
    _loadData:function(callback){
        var that = this
        
        //获取
        product.getDetailInfo(this.data.id,(data)=>{
            console.log('回掉函数')
            that.setData({
                product:data,
                loading:true
            })
        })

        callback && callback()
    },
    //选择购买数目
    bindPickerChange:function(){
        
    }
})
