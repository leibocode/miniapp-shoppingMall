import Base from '../utils/base'

export default class Category extends Base {
    constructor(){
        super();
    }
    
    getCategoryType(callback){
        var param ={
            url:'/api/category/getCategories',
            sCallback:function(){
                callback && callback(data)
            }
        }

        this.request(param)
    }

    getProjectsCategory(id,callback){
        var params={
            url:`/api/category/getCategories/${id} `, 
            sCallback:function(){
                callback && callback(data)
            }
        }

        this.request(params)
        
    }
}

