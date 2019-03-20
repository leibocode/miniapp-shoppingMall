import Http  from '../utils/http.js'

export default class Home extends Http {
    constructor(){
        super();
    }

    getBannerData(){
        return this.request({
            url:'/api/v1/banner'
        })
    }

    getThemeData(){
        return this.request({
            url:'/api/v1/special'
        })
    }
    /*商品部分商品*/
    getProductData(getParam){
        return this.request({
            url:'/api/v1/product'
        })
    }

    
}