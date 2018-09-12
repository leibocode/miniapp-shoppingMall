import mongoose from 'mongoose'
import config from '../config/config'
import Wechat from '../wechat/index'
import TemeplateMsg from '../wechat/temeplateMsg'

const Token =mongoose.model('Token')

export const wechatConfig ={
    wechat:{
        appID:config.minapp.appid,
        appSecret:config.minapp.secret,
        getAccessToken:async()=>await Token.getAccessToken(),
        saveAccessToken:async()=>await Token.saveAccessToken()
    }
}

export const getWechat = ()=>{
    const wechatClient = new Wechat(wechatConfig.wechat)
    
    return wechatClient
}




