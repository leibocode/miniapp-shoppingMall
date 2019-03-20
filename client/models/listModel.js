import Base from '../utils/base'
export default class List extends Base {
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
