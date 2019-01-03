import Token from './utils/token'


const token =new Token()

App(
 {
    onLaunch:function(){
        token.fetchToken()
    },
    onShow:function(){
    },
    globalData:{
      user:null,
      serverUrl:'http://127.0.0.1:3001/api/v1/minapp/user'
    }
})
