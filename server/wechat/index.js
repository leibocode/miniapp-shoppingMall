import request from 'request-promise'
import fs from 'fs'
import * as _ from 'lodash'
import path from 'path'
import { throws } from 'assert';

const base ='https://api.weixin.qq.com/cgi-bin/'
const api ={
    accessToken: base + 'token?grant_type=client_credential',
}


export default class Wechat{
    constructor(opts){
        this.opts =Object.assign({},opts)
        this.appID = opts.appID,
        this.appSecret =opts.appSecret
        this.getAssessToken =opts.getAssessToken
        this.saveAssessToken =opts.saveAssessToken

        this.fetchAccessToken()
    }

    async request(options){
        options =Object.assign({},options,{json:true})

        try{
            const respone =await request()
        }catch(error){

        }
    }

    async fetchAccessToken(){
        let data =await this.getAssessToken()

        if(!this.isValidToken(data,'access_token')){
            data =await this.updateAccessToken()
        }

        await this.saveAssessToken(data)

        return data
    }

    async updateAccessToken(){
        const url = api.accessToken + '&appid=' + this.appID + '&secret=' + this.appSecret

         const data = await this.request({url:url})
         const now =(new Date().getTime())
         const expiresIn = now +(data.expires_in-20) *1000

         data.expires_in =expiresIn 
         return data
    }

    isValidToken (data, name) {
        if (!data || !data[name] || !data.expires_in) {
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
}
