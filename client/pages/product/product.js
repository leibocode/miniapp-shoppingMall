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
        properties:[
            {"name":"产地","detail":"广西"}, 
            {"name":"保质期","detail":"12个月"},
            {"name":"口味","detail":"你懂的,那是相当的好哇"},
            {"name":"描述","detail":"取材于天山之巅,味道好极了,亲,赶快下单吧"}
        ],
        tabs:['商品详情','产品参数','售后保障'],
        product:null,
        id:0,
        images:null
    },
    onLoad:function(options){
        var id =options.id
        this.data.id =id;
        this._loadData()
    },
    
    _loadData:function(callback){
        var that = this
        product.getDetailInfo(this.data.id,(data)=>{
             var detail =[]
             data.detailImgs.forEach((item)=>{
                console.log('11')
                if(item.indexOf('http')==-1){
                    console.log('优质')
                    var  url = 'http://www.enanji.com' +item
                    console.log(url)
                    detail.push(url)
                }
            })
            console.log(data)
            that.setData({
                product:data,
                loading:true, 
                images:detail
            })
        })
    },
    //选择购买数目
    bindPickerChange:function(e){
        this.setData({
            productCounts:this.data.countArray[e.detail.value]
        })
    },

    onTabsItemTap:function(event){
       var index =product.getDataSet(event,'index')
       this.setData({
           currentTabsIndex:index
       })
    },
    //添加购物车 
    onAddingToCartTap:function(){

    },

    preview:function(){
        wx.previewImage({
            urls:this.data.images
        })
    }, 

    onPullDownRefresh:function(){

    }, 
    
    onShareAppMessage:function(){
        return{
            title:'零食1号',
            path:'page/product/product?id='+this.data.id
        }
    }
})
