import {
    controller,
    get,
    post,
    required
} from '../decorator/router'
import {
    openidAndSessionKey,
    WXBizDataCrypt
} from '../wechat/minapp'
import {
    createOrder
} from '../controller/wechat'
import { loginAsync, getUserAsync } from '../controller/user'
import wechatMiddle from '../wechat/middleware'
import reply from '../wechat/reply'
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

@controller('/api/v1/minapp')
export class MinappController {
    @get('/codeAndSessionKey')
    @required({query:['code']})
    async getCodeAndSessionKey(ctx,next){
        const { code } =ctx.query
        let res =await openidAndSessionKey(code)
        //sk
        ctx.body={
            success:true,
            data:res
        }
    }

    @get('/user')
    async getUser(ctx,next){
        await getUserAsync(ctx,next)
    }

    @get('/address')
    async getaddressList(){
        console.log('1111115555')
    }

    @post('/login')
    async login(ctx,next){
        console.log('login')
        await loginAsync(ctx,next)
    }

    @post('/order')
    async Order(ctx,next){
        console.log(ctx.request.body);
        await createOrder(ctx,next)
    }

    @post('/wechat-hear')
    async wechatHear(ctx,next){
        console.log('微信客服消息')
        const middle =wechatMiddle(wechatConfig,reply)
        await middle(ctx,next)
    }

    @get('/wechat-hear')
    async wechatHear(ctx,next){
        const middle =wechatMiddle(wechat,reply)
        await middle(ctx,next)
    }

    @post('/wechat-pay')
    async wechatPay(ctx,next){
    }


}