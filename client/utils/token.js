//维护token 
import config from './config'
export default class token {
    constructor(){
        
        this.url = config.dev
    }
    
    fetchToken(){
        let data = wx.getStorageSync('token')

        if(!data){
            //token 不存在
          data = this.sign()
        }
        // 存在验证token
        if(!this.isValidToken(data,'token')){
           data = this.sign()
        }

        return data
    }

    isValidToken(data,name){
        console.log('验证token')
        if(!data || !data.token || !data.expires_in){
            return false
        }

        const expiresIn =data.expires_in
        const now = (new Date()).getTime()
        if(now< expiresIn){
            console.log('tokne有')
            return true
        }else {
            console.log('tokeng过期')
            return false 
        }
    }
    
    sign(){
        //删除token
        let that =this
        console.log(this.url)
        wx.login({
            success:function(res){
                wx.request({
                    url: config.dev+'/api/v1/minapp/login',
                    method:'POST',
                    data:{
                        "code":res.code
                    },
                    success:function(data){
                        console.log('token') 
                        console.log(data)
                        wx.setStorageSync('token',data.data.data)
                        let token = data.data.data
                        return token
                    },
                    fail:function(err){
                        console.log(err)
                    }
                })
            }
        })
    }

    getUserInfo(){
        let that =this
        wx.login({
            success:function(res){
                let code = res.code
                wx.getUserInfo({
                    success:function(data){
                        let iv = data.iv
                        wx.request({
                            url:config.dev + '/api/v1/minapp/user',
                            data:{
                                code:code
                            },
                            success:function(){
                                
                            }
                        })
                    }
                })
            }
        })
    }
}