import Base from '../utils/base'
export default class List extends Base {
    constructor(){
        super();
    }

    getProducts(params,callback){
        var param ={
            url:`/api/v1/banner/${params._id}`,
            data:params,
            sCallback:function(data){
                data =data.data
                callback && callback(data)
            }
        }
        this.request(param)
    }
}
