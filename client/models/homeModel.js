import HTTP from '../utils/http.js'

export default class Home extends HTTP {
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
            url:`/api/v1/product?page=${getParam.page}&size=${getParam.size}&price=${getParam.price}`
        })
    }

    
}