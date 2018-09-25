import config from './config.js'
import Token from './token'
const token =new Token() 
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

        let  t = token.fetchToken()
        
        wx.request({
            url:url,
            method:params.method,
            data:params.data,
            header:{
                'content-type': 'application/json',
                'authorization':'Bearer '+t.token
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

    //token
    sign(){
        var that =this
        wx.login({
            success:function(res){
               wx.request({
                   url:`${that.baseRestUrl}/api/v1/minapp/login`,
                   method:'post',
                   data:{
                       "code":res.code
                   }, 
                   success:function(data){
                       console.log(data.data.data.token)
                       wx.setStorageSync('token',data.data.data.token)
                      
                   },
                   fail:function(err){
                       console.log(err)
                   }
               })

            }
        })  
    }

    getDataSet(event,key){
        return event.currentTarget.dataset[key]
    }

    filetrImg(list){
        let res =[]
        list.forEach
    }
}