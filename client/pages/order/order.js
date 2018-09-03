import Cart from '../../models/cartModel'
import Order from '../../models/orderModle'
import Address from '../../models/addressModel'

const order =new Order()
const cart =new Cart() 
const address =new Address()

Page({
    data:{
        productsArr: [],
        isNeedLogistics: 0, // 是否需要物流信息
        allGoodsPrice: 0,
        yunPrice: 0,
        allGoodsAndYunPrice: 0,
        goodsJsonStr: "",
        orderType: "", //订单类型，购物车下单或立即支付下单，默认是购物车，

        hasNoCoupons: true,
        coupons: [],
        youhuijine: 0, //优惠券金额
        curCoupon: null // 当前选择使用的优惠券
    },
    onLoad:function(){
        let that = this
        that.setData({
            isNeedLogistics:1 
        })
    },
    onShow:function(){
        this.setData({
            productsArr:cart.getCartDataFromLocal(true)
        })

        this._initShippingAddress()
    },
    createOrder:function(event){
        let that =this
        wx.showLoading()
        let remark =""
        if(event){
            remark = e.detail.value.remark
        }

        if(that.data.isNeedLogistics>0){
            if(!that.data.curAddressData){
                wx.hideLoading()
                wx.showModal({
                    title:'错误',
                    content:'请先设置您的收货地址',
                    showCancel:false
                })

                return ;
            }
        }

    },
    _initShippingAddress:function(){
        let that =this
        address.getaddressList((data)=>{
            that.setData({
                curAddressData:data
            })
        })
        
        this.createOrder()
    }
})