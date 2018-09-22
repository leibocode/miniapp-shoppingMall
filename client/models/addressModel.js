import Base from '../utils/base'

export default class address extends Base {
    constructor(){
        super();
    }

    getaddressList(callback){
        var that =this
        var params ={
            url: '/api/v1/address',
            sCallback:function(data){
                data =data.data
                callback && callback(data)
            }
        }
        this.request(params)
    }

    postaddress(data,callback){
        var that =this
        var params ={
            url:'/api/v1/address',
            method:'post', 
            data:data,
            sCallback:function(res){
                callback && callback(res) 
            }
        }
        this.request(params)
    }

    setState(id,callback){
        var that =this
        var params ={
            url:`/api/v1/address/${id}`,
            method:'put',
            sCallback:function(res){
                callback && callback(res)
            }
        }
    }

    editAddress(data,callback){
        var that = this
        var param ={
            url:`/api/v1/address/${data.id}`,
            data:data,
            sCallback:function(data){
                callback(data)
            }
        }
        this.request(param)
    }

    getAddressById(id,callback){
        var that = this
        var param = {
            url:`/api/v1/address/${id}`,
            method:'get',
            sCallback:function(data){
                data = data.data
            }
        }
        this.request(param)
    }
}