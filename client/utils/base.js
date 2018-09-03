import config from './config.js'

export default class Base {
    constructor () {
      this.baseRestUrl = 'http://127.0.0.1:3001'
      //this.baseRestUrl ='https://minshopping.imtudou.cn'
    }
    request(params){
        var that =this
        var url = this.baseRestUrl +params.url

        if(!params.method){
            params.method ='GET'
        }
        
        wx.request({
            url:url,
            method:params.method,
            data:params.data,
            header:{
               'content-type':'application/json',
               'Authorization':wx.getStorageSync('token')
            },
            success:function(res){
                var code =res.statusCode.toString()
                var startChar =code.charAt(0)
                if(startChar=='2'){
                    params.sCallback && params.sCallback(res.data)
                }else {
                    params.eCallback && params.eCallback(res)
                }
            },
            fail:function(err){
                params.fail && params.fail()
            }
        })
    }

    getDataSet(event,key){
        return event.currentTarget.dataset[key]
    }
}