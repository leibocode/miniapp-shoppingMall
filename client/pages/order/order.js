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
        let products =cart.getCartDataFromLocal(true)
        this.setData({
            productsArr:products,
            account:this._calcTotalAccountAndCounts(products).account,
        })

        this._initShippingAddress()
    },
    _calcTotalAccountAndCounts:function(data){
        let len = data.length,
            account =0,
            selectedCounts=0,
            selectedTypeCounts =0;
        let multiple =100;
        for(let i=0;i<len;i++){
            if(data[i].selectStatus){
                account += data[i].counts * multiple *Number(data[i].price) * multiple;
                selectedCounts += data[i].counts
                selectedTypeCounts++
            }

        }
        return {
            selectCounts:selectedCounts,
            selectedTypeCounts:selectedCounts,
            account:account/(multiple* multiple)
        }
    },
    createOrder:function(event){
        console.log('订单')
        let that =this
        wx.showLoading()
        let remark =""
        if(event){
            remark = event.detail.value.remark
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

        let formId = event.detail.formId
        console.log(formId);
        order.doOrder({
            formId:formId,
            total:that.data.account,
            product:that.filterProduct(),
            address_id:that.data.curAddressData[0]._id
        },(data)=>{
            //跳转到
            wx.hideLoading();
            
            wx.navigateTo({
                page:'../order-list/order-list'
            })
        })
        

    },
    filterProduct:function(){
        let res =[]
        let products = this.data.productsArr
        products.forEach((item)=>{
            res.push({
                _id:item._id,
                name:item.name,
                count:item.count,
                img:item.img
            })
        }) 

        return res 
    },
    _initShippingAddress:function(){
        let that =this
        address.getaddressList((data)=>{
            console.log('111'+data);
            console.log(data)
            if(data.length>0){
                var isNeedLogistics =1
                that.setData({
                    curAddressData:data,
                    isNeedLogistics:1
                })
            }else {
                wx.showCancel({
                    title:'错误',
                    content:'请先设置您的收货地址',
                    showCancel:false 
                })
            }
        })
    },

    toAddress:function(){
        wx.navigateTo({
            url: '../select-address/select-address'
        })
    },

    selectAddress:function(){
        wx.navigateTo({
            url: '../select-address/select-address'
        })
    }
})