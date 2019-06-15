import regeneratorRuntime from '../../utils/runtime.js'
import Order from '../../models/orderModle'

const order =new Order()

Page({
    data:{
        orderId:0,
        orderDetail:null
    },
    onLoad:function(options){
        let orderid =options.id
        this.setData({
            orderId:orderid
        })
    },
    onShow:function(){
        let that = this
        
        order.getOrder(that.data.orderId).then((data)=>{
            that.setData({
                orderDetail:data
            })
        })
    },

    confirmBtnTap:function(event){
        let that =this
        let orderId =  order.getDataSet(event,'id')
        wx.showModal({
            title:'确认您已经收到商品',
            content:'',
            success:function(res){
                if(res.confirm){
                    
                }
            }
        })
    }
})