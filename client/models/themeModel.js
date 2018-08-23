import Base from '../utils/base'

export default class Theme extends Base {
    constructor(){
        super();
    }
    
    getThemeDataById(id,callback){
        var param ={
            url:`/api/v1/special/${id}`,
            sCallback:function(){
                callback && callback(data)
            }
        }

        this.request(param)
    }
}