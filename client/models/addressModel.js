import Base from '../utils/base'

export default class address extends Base {
    constructor(){
        super();
    }

    getaddressList(callback){
        var that =this
        var params ={
            url:'/api/v1/address',
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
    
}