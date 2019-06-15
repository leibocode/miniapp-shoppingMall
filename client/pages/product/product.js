import regeneratorRuntime from '../../utils/runtime.js'
import Product from '../../models/productModel.js'
import Cart from '../../models/cartModel.js'

let product =new Product()
let cart =new Cart()

Page({
    data:{
        loading:false,
        hiddenSamllImg:true,
        countArray:[1,2,3,4,5,6,7,8,9,10],
        productCounts:1,
        currentTabsIndex:0,
        cartTotalCounts:0,
        properties:[
            {"name":"产地","detail":"天山"},
            {"name":"保质期","detail":"12个月"},
            {"name":"口味","detail":"你懂的,那是相当的好哇"},
            {"name":"描述","detail":"取材于天山之巅,味道好极了,亲,赶快下单吧"}
        ],
        tabs:['商品详情','产品参数','售后保障','商品评论'],
        product:null,
        id:0,
        images:null
    },
    onLoad:function(options){
        var id =options.id
        this.data.id =id;
        this._loadData()
    },

    async _loadData(callback){
        var that = this
        product.getDetailInfo(this.data.id).then((data)=>{
            var detail =[]
            data.detailImgs.forEach((item)=>{
               if(item.indexOf('http')==-1){
                   var  url = 'http://www.enanji.com' +item
                   detail.push(url)
               }
           })
           that.setData({
               product:data,
               loading:true,
               images:detail
           })
        })
    },
    //选择购买数目
    bindPickerChange:function(e){
        console.log(e)
        this.setData({
            productCounts:this.data.countArray[e.detail.value]
        })
    },

    //切换面板
    onTabsItemTap:function(event){
       var index =product.getDataSet(event,'index')
       this.setData({
           currentTabsIndex:index
       })
    },

    //添加到购物车
    onAddingToCartTap:function(event){
        if(this.data.isFly){
            return;
        }
        this._flyToCartEffect(event)
        this.addCart()
    },

    //购物车
    addCart:function(){
        let tempObj ={}
        let keys =['_id','title','img','price']
        for(let key in this.data.product){
            tempObj[key] =this.data.product[key]
        }

        cart.add(tempObj,this.data.productCounts)
    },

    //动画
    _flyToCartEffect:function(event){
        let touches =event.touches[0]
        let diff ={
            x:'25px',
            y:25-touches.clientY +'px'
        }
        let style='display: block;-webkit-transform:translate('+diff.x+','+diff.y+') rotate(350deg) scale(0)';  //移动距离
        this.setData({
            isFly:true,
            translateStyle:style
        })
        let that =this
        setTimeout(() => {
            that.setData({
                isFly:false,
                translateStyle:'-webkit-transform: none;',  //恢复到最初状态
                isShake:true
            })
            setTimeout(()=>{
                let counts =that.data.cartTotalCounts +that.data.productCounts
                that.setData({
                    isShake:false,
                    cartTotalCounts:counts
                })
            },200)
        },1000);
    },

    preview:function(){
        let imgs =[]
        imgs.push(this.data.product.img)
        wx.previewImage({
            urls:imgs
        })
    },

    onPullDownRefresh:function(){
        this._loadData(()=>{
            wx.stopPullDownRefresh()
        });
    },

    //跳转到购物车
    onCartTap:function(){
        wx.switchTab({
            url:'/pages/cart/cart'
        })
    },

    onShareAppMessage:function(){
        return{
            title:'零食1号',
            path:'page/product/product?id='+this.data.id
        }
    }
})
