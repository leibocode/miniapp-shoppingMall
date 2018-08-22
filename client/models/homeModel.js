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
                data = data.data
                callback && callback(data)
            }
        }
        this.request(params)
    }

    getThemeData(callback){
        var params ={
            url:'/api/v1/special',
            sCallback:function(data){
                data =data.data
                callback && callback(data)
            }
        }
        this.request(params)
    }
    /*商品部分商品*/
    getProductData(getParam,callback){
      var params ={
        url:'/api/v1/product',
        data:getParam,
        sCallback:function(data){
          data=data.data
          callback && callback(data)
        }
      }
      this.request(params)
      
    }
}