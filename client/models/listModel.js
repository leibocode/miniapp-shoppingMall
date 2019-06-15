import Http from '../utils/http'
export default class List extends Http {
    constructor(){
        super();
    }

    getProducts(params){
        return this.request({
            url:`/api/v1/banner/${params._id}`,
            data:params
        })
    }
}
