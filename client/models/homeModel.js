import Http  from '../utils/http.js'

export default class Home extends Http {
    constructor(){
        super();
    }

    getBannerData(callback){
        return this.request({
            url:'/api/v1/banner'
        })
    }

    getThemeData(callback){
        return this.request({
            url:'/api/v1/special'
        })
    }
    /*商品部分商品*/
    getProductData(getParam,callback){
        return this.request({
            url:'/api/v1/product'
        })
    }

    
}