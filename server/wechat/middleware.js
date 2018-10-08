import sha1 from 'sha1'
import getRawBody from 'raw-body'
import * as util from '../lib/util'
import Wechat from '../wechat'
import config from '../config/config'
import mongoose from 'mongoose'

const Token = mongoose.model('Token')


const wechatConfig = {
    appID:config.minapp.appid,
    appSecret:config.minapp.secret,
    getAccessToken:async()=> await Token.getAccessToken(),
    saveAccessToken:async(data)=>{
        let token =await Token.findOne({
            name:'access_token'
        }).exec()
        if(token){
            token.token = data.access_token
            token.expiress_in =data.expiress_in
        }else {
            token =new Token({
                name:'access_token',
                token: data.access_token,
                expires_in: data.expires_in
            })
        }
        await token.save()

        return data
    }
}


export default function (opts,reply){
    return async function wechatMiddle(ctx,next){
        const token = opts.token
        const wechat =new Wechat(wechatConfig)
        let { signature,nonce,timestamp,echostr } = ctx.query

        let str =[token,timestamp,nonce].sort().join('')
        let sha = sha1(str)

        if(ctx.method==='GET'){
            if(sha===signature){
                ctx.body =echostr +''
            }else {
                ctx.body ='wang:'+'不是微信的请求'
            }
        }else if(ctx.method==='POST'){
            if (sha !== signature) {
                ctx.body = 'Failed'
                return false
            }
            console.log(ctx.request.body) 
            const data = ctx.request.body

            ctx.weixin =data
            
            await reply.apply(ctx,[ctx,next])

            const replyBody = ctx.body
            const msg =ctx.weixin

            //const json =util.tpl(replyBody,msg)
            //console.log(json)

            //发送到接口
            wechat.sendMessage(replyBody,msg)
            //wechat.sendMessageText(json)
        }
    }
}