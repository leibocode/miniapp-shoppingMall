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

} from '../controller/wechat'
import { loginAsync, getUserAsync } from '../controller/user'

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

    @get('user')
    async getUser(ctx,next){
        await getUserAsync(ctx.next)
    }

    @get('/address')
    async getaddressList(){
        console.log('1111115555')
    }

    @post('/login')
    async login(ctx,next){
        await loginAsync(ctx,next)
    }
}