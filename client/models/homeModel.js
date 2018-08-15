import Base  from '../utils/base.js'

export default class Home extends Base {
    constructor(){
        super();
    }

    getBannerData(callback){
        var that =this
        var params = {
            url:'/api/v1/banner',
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
    /*商品部分商品*/
    getProductData(callback){
      var param ={
        url:'/api/v1/product',
        sCallback:function(data){
          callback && callback(data)
        }
      }
      this.request(param)
      
    }
}