import request from 'request-promise'
import { getWechat } from './wechat'
import Wechat from '../wechat/index'
import mongoose from 'mongoose'
import config from '../config/config'

const Token = mongoose.model('Token')





const wechatConfig ={
    wechat:{
        appID:config.minapp.appid,
        appSecret:config.minapp.secret,
        getAccessToken:async()=> await Token.getAccessToken(),
        saveAccessToken:async(data)=> await Token.saveAccessToken()
    }
}

const client =new Wechat(wechatConfig.wechat)
 
const base ='https://api.weixin.qq.com/cgi-bin'
const api ={
    getTmp:base +'wxopen/template/list?',
    sendTmp:base +'message/wxopen/template/send?'
}

export default class SendTemplateMsg{
    constructor(opts){

    }

    async request(options){
        options =Object.assign({},options,{json:true})

        try{
            const response =await request(options)
        }catch(error){
            console.log(error)
        }
    }

    async getTemplate(){
        const data = await client.fetchAccessToken() 
        console.log('tokne')
        console.log(data)
        const url =`${api.getTmp}access_token=${data.access_token}`

        const res =await this.request({
            url:url,
            method:'POST',
            body:{
                "offset":0,
                "count":20
            }
        })
        return res
    }




    async sendTemplateMessage(options){
        const data =await client.fetchAccessToken()

        const url =`${api.sendTmp}access_token=${data.access_token}`



        let res =await this.request({
            url:url,
            method:'POST',
            body:options
        })

        return res
    }
}