import Base from '../utils/base'

export default class Theme extends Base {
    constructor(){
        super();
    }
    
    getThemeDataById(id,callback){
        var param ={
            url:`/api/v1/special/${id}`,
            sCallback:function(data){
                data =data.data
                callback && callback(data)
            }
        }

        this.request(param)
    }
}