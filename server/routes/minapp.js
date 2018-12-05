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
import request from 'request-promise'


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


    @get('/token')
    async token(ctx,next){
        await request({
            url:''
        })
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

    @post('/token')
    async token(ctx,next){
        console.log('token')
        console.log(ctx.request.body)
    }

    @post('/wechat-hear')
    async wechatHear(ctx,next){
        const middle =wechatMiddle(config.minapp,reply)
        await middle(ctx,next)
    }

    @get('/wechat-hear')
    async wechatHear(ctx,next){
        const middle =wechatMiddle(config.minapp,reply)
        await middle(ctx,next)
    }

    @post('/wechat-pay')
    async wechatPay(ctx,next){
    }
}