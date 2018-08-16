import Base from '../utils/base'
export default class Project extends Base {
    constructor() {
        super();
    }

    getDetailInfo(id,callback){
        var param ={
            url:`/api/v1/product/${id}`,
        }
        this.request(param)
    }
} 