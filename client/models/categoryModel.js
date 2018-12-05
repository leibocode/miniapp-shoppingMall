import Base from '../utils/base'

export default class Category extends Base {
    constructor(){
        super();
    }
    
    getCategory(callback){
        var param ={
            url:'/api/v1/category',
            sCallback:function(data){
                data =data.data
                callback && callback(data)
            }
        }

        this.request(param)
    }

    getProjectsCategory(param,callback){
        var params={
            url:`/api/v1/category/${param.cid}`,
            data:param, 
            sCallback:function(data){
                data =data.data
                console.log('毁掉')
                callback && callback(data)
            }
        }

        this.request(params)
        
    }
}

