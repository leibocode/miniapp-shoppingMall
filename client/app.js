App(
 {
    onLaunch:function(){
        
    },
    onShow:function(){
        let that =this
        let loginFlag =wx.getStorageSync('token')
        console.log('缓存中取值')
        console.log(loginFlag)
        this.sign()
        // if(loginFlag){
        //     // wx.checkSession({
        //     //     success:function(){
        //     //         //session_key 没有过期
        //     //     },
        //     //     fail:function(){
        //     //         this.sign()
        //     //     }
        //     // })
        // }else {
        //     this.sign()
        // }
    },
    sign:function(){
        wx.login({
            success:function(res){
               wx.request({
                   url:'http://127.0.0.1:3001/api/v1/minapp/login',
                   method:'post',
                   data:{
                       "code":res.code
                   }, 
                   success:function(data){
                       console.log(data.data.data.token)
                       wx.setStorageSync('token',data.data.data.token)
                      
                   }
               })

            }
        })
    },
    globalData:{
      user:null,
      serverUrl:'http://127.0.0.1:3001/api/v1/minapp/user'
    }
})
