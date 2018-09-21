import Base from '../utils/base'
export default class Project extends Base {
    constructor() {
        super();
    }

    getDetailInfo(id,callback){
        var param ={
            url:`/api/v1/product/${id}`,
            sCallback:function(data){
                data =data.data
                callback && callback(data)
            }
        }
        this.request(param)
    }

    getProducts(params,callback){
        var param ={
            url:'/api/v1/product',
            data:params,
            sCallback:function(data){
                data =data.data
                callback && callback(data)
            }
        }
        this.request(param) 
    }
} 