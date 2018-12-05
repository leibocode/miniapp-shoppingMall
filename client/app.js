import Token from './utils/token'

const token =new Token() 

App(
 {
    onLaunch:function(){
        token.fetchToken()
    },
    onShow:function(){
        // let that =this
        // let loginFlag =wx.getStorageSync('token')
        // if(loginFlag){
        //     wx.checkSession({
        //         success:function(){
        //             //session_key 没有过期
        //             console.log('session没有过期');
        //         },
        //         fail:function(){
        //            token.sign()
        //         }
        //     })
        // }else {
            
        // }
        wx.request({
            url:'http://izcwxs.ctysoft.com/token/apptoken/GetToken',
            method:'post',
            data:{
                appid:'cty-gzszxqc-0912',
                key:'b209debe8cb90feff9ed8b7017213780'
            },
            header:{
                'content-type': 'application/json'
            },
            success:function(data){
                console.log(data)
            },
            fail:function(err){
                console.log(err)
            }
        })
    },
    globalData:{
      user:null,
      serverUrl:'http://127.0.0.1:3001/api/v1/minapp/user'
    }
})
