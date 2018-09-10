import Base from '../utils/base'

export default class Order extends Base {
    constructor() {
        super();
        this._storegeKeyName ='newOrder'
    }

    //下订单
    doOrder(param,callback){
        var that =this
        var allParam ={
            url:'/api/v1/minapp/order',
            method:'POST',
            data:param,
            sCallback:function(data){
                data =data.data
                callback && callback(data)
            }
        }

        this.request(allParam)
    }

    //唤起微信支付
    execPay(ordername){
        let allParam ={

        }

    }

    getOrders(page,callback){

    }

    
}