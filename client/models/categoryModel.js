import Http from '../utils/http.js'

export default class Category extends Http {
    constructor(){
        super();
    }
    
    getCategory(callback){
        return this.request({
            url:'/api/v1/category'
        })
    }

    getProjectsCategory(param,callback){
        return this.request({
            url:`/api/v1/category/${param.cid}`,
            data:param
        })
    }
}

