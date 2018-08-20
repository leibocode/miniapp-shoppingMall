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
        properties:[{"name":"111"}],
        tabs:['商品详情','产品参数','售后保障'],
        product:{"detailImgs" : [ "/upload/c4/0.940308001371787108_150x150.jpg" ], "title" : "狗牙儿 天津锅巴 130g", "img" : "http://www.enanji.com//FCKeditorUpload/xiaotuguoba.jpg", "price" : 5, "summary" : "天津市龙康食品有限责任公司，前身是天津市龙康食品厂，始建于1995年6月。2003年4月18日改制为股份制公司，2004年7月迁入新址-- 天津市独流莲花工业园，占地面积6万平方米，标准厂房22000平方米，更新、改造生产设备150台套，总投资8000万元，现有职工450人，是一家经营多年，有现代食品工业经营理念的食品企业，产品形成10大系列，40多种规格，行销全国36多个省市、地区，年销售额1.6亿 余元。地址： 天津市静海县独流镇莲花工业区 ", "rate" : 0, "categoryText" : "锅巴/虾条", "__v" : 0 }
    },
    onLoad:function(options){
        var id =options.id
        this._loadData()
    },
    
    _loadData:function(callback){
        var that = this
    },
    //选择购买数目
    bindPickerChange:function(){
        
    },

    onTabsItemTap:function(event){
       // var index =product.getda
    },
    onShareAppMessage:function(){
        return{
            title:'零食1号',
            path:'page/product/product?id='+this.data.id
        }
    }
})
