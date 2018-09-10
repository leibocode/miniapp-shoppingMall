import mongoose from 'mongoose'
import config from '../config/config'
import Wechat from '../wechat'
import TemeplateMsg from '../wechat/temeplateMsg'

const Token =mongoose.model('Token')

const WechatConfig ={
    wechat:{
        appID:config.minapp.appid,
        appSecret:config.minapp.secret,
        getAccessToken:async()=>await Token.getAccessToken(),
        saveAccessToken:async()=>await Token.saveAccessToken()
    }
}

export const getWechat = ()=>{
    const wechatClient = Wechat(WechatConfig.wechat)
    return wechatClient
}

export const getTemplateMsg =()=>{
    const templateClient =new TemeplateMsg(WechatConfig.wechat)
    return templateClient
}


