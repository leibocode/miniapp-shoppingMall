import Http  from '../utils/http.js'

export default class Home extends Http {
    constructor(){
        super();
    }

    getBannerData(callback){
        var that =this
        var params = {
            url:'banner',
            sCallback:function(data){
                data =data.item
                callback && callback(data)
            }
        }
        this.request(param)
    }

    getThemeData(callback){
        var param ={
            url:'',
            sCallback:function(data){
                callback && callback(data)
            }
        }
        this.request(param)
    }

    getProductData(callback){
        
    }
}