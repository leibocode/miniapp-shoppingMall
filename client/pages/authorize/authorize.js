import config from '../../utils/config'
Page({
    //bindGetUserInfo
    bindGetUserInfo:function(event){
        console.log('11111')
        // if(event.detail.userInfo){
        //     return;
        // }
        // wx.setStorageSync('userInfo',event.detail.userInfo)
        this.login();
    },
    login:function(){
        let that =this
        wx.login({
            success:function(res){
                let code =res.code
                wx.getUserInfo({
                    success:function(data){
                        console.log(data)
                        let iv = data.iv
                        let encryptedData =data.encryptedData
                        let userInfo ={
                            iv:iv,
                            encryptedData:encryptedData, 
                            userInfo:data.userInfo
                        }
                        wx.request({
                            url:config.dev +'/api/v1/minapp/user',
                            method:'GET',
                            data:{
                                code:code,
                                userInfo:userInfo
                            },
                            success:function(user){
                                wx.setStorageSync('user',user.data.data)
                                // console.log(user)
                                wx.navigateBack({})
                            }
                        })
                    }
                })
            }
        })
    }
})