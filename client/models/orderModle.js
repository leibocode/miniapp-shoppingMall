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
            url:'',
            type:'',
            data:{},
            sCallback:function(data){

            }
        }
    }

    //唤起微信支付
    execPay(ordername){
        let allParam ={

        }

    }

    getOrders(page,callback){

    }

    
}