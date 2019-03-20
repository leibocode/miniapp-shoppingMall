import Http from '../utils/http.js'

export default class Order extends Http {
    constructor() {
        super();
        this._storegeKeyName ='newOrder'
    }

    //下订单
    doOrder(param){
        return this.request({
            url:'/api/v1/minapp/order',
            method:'POST',
            data:param
        })
    }

    //唤起微信支付
    execPay(ordername){

    }

    getOrder(id){
        return this.request({
            url:`/api/v1/order/${id}`
        })
    }

    getOrders(parmas){
        return this.request({
            url:'/api/v1/order',
            method:'GET',
            data:parmas
        })
    }

    deleteOrder(id){
        return this.request({
            url:`/api/v1/order/${id}`,
            method:'delete'
        })
    }
}