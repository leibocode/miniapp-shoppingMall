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
        return this.request({
            url:'/api/v1/product',
            data:params,
            method:'POST'
        })
    }
    

} 