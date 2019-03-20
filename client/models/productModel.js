import Http from '../utils/http.js'
export default class Project extends Http {
    constructor() {
        super();
    }

    getDetailInfo(id){
        return this.request({
            url:`/api/v1/product/${id}`
        })
    }

    getProducts(params){
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