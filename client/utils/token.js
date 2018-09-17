//维护token 
import config from './config'
export default class token {
    constructor(){
        
        this.url = config.dev

        this.fetchToken()
    }
    
    fetchToken(){
        let data = wx.getStorageSync('token')

        if(!data){
            //token

        }

        if(!this.isValidToken(data,'token')){
            this.sign()
            
        }

        
        
    }

    isValidToken(data,name){
        if(!data || !data[name] || !data.expires_in){
            return false
        }

        const expiresIn =data.expires_in
        const now = (new Date()).getTime()
        if(now< expiresIn){
            return true
        }else {
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