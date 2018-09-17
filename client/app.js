import Token from './utils/token'

const token =new Token() 

App(
 {
    onLaunch:function(){
        
    },
    onShow:function(){
        token.sign()
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
    },
    globalData:{
      user:null,
      serverUrl:'http://127.0.0.1:3001/api/v1/minapp/user'
    }
})
