

export default class Base {
    constructor () {
      this.baseRestUrl = 'http://127.0.0.1:3001'
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
               'content-type':'application/json' 
            },
            success:function(res){
                var code =res.statusCode.toString()
                var startChar =code.charAt(0)
                if(startChar=='2'){
                    params.success && params.success(res.data)
                }else {
                    params.error && params.error(res)
                }
            },
            fail:function(){
                params.fail && params.fail()
            }
        })
    }
}