import request from 'request-promise'
import fs from 'fs'
import * as _ from 'lodash'
import path from 'path'

const base ='https://api.weixin.qq.com/cgi-bin/'
const api ={
    accessToken: base + 'token?grant_type=client_credential',
    send:base +'message/custom/send'
}

//https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
export default class Wechat{
    constructor(opts){
        console.log(opts)
        this.opts =Object.assign({},opts)
        this.appID = opts.appID,
        this.appSecret =opts.appSecret
        this.getAssessToken =opts.getAccessToken
        this.saveAccessToken =opts.saveAccessToken

        this.fetchAccessToken()
    }

    async request(options){
        options =Object.assign({},options,{json:true})

        try{
            const respone =await request(options)
            return respone
        }catch(error){

        }
    }

    async fetchAccessToken(){
        let data =await this.getAssessToken()
        console.log(data)
        if(!this.isValidToken(data,'access_token')){
            data =await this.updateAccessToken()
        }

        await this.saveAccessToken(data)

        return data
    }

    async updateAccessToken(){
        const url = api.accessToken + '&appid=' + this.appID + '&secret=' + this.appSecret
        
        console.log(url)
        const data = await this.request({url:url})
        console.log('token值')
        console.log(data)
         if(!data){
             return false;
         }

        const now =(new Date().getTime())
        const expiresIn = now +(data.expires_in-20) *1000

        data.expires_in =expiresIn 
        return data
    }

    isValidToken (data, name) {
        if (!data || !data[name]) {
          return false
        }
    
        const expiresIn = data.expires_in
        const now = (new Date().getTime())
    
        if (now < expiresIn) {
          return true
        } else {
          return false
        }
    }
    
    async sendMessage(data){
        const data_ls = await this.fetchAccessToken()
        console.log('发送send'+data)
        const url = `${api.send}?access_token=${data_ls.access_token}`
        console.log(url)
        const result =await this.request({
            url:url,
            body:data
        })
        console.log('发送消息结果')
        console.log(result)
    }
}
