import Base from '../utils/base'
export default class List extends Base {
    constructor(){
        super();
    }

    getProducts(id,callback){
        var param ={
            url:`/api/v1/banner/${id}`,
            sCallback:function(data){
                data =data.data
                callback && callback(data)
            }
        }
        this.request(param)
    }
}
