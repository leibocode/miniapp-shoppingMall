import Base from '../utils/base'
export default class Project extends Base {
    constructor() {
        super();
    }

    getDetailInfo(id,callback){
        var param ={
            url:`/api/v1/product/${id}`, 
            sCallback:function(data){
                callback && callback(data);
            }
        }
        
        this.request(param)
    } 
}