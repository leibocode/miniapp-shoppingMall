import {
    controller,
    get,
    post,
    required
} from '../decorator/router'
import config from '../config'
import { loginAsync } from '../controller/user'

@controller('/minapp')
export class MinAppController{
    @get('/codeAndSessionKey')
    async getCodeAndSessionKey(ctx,next){
        const { code } =ctx.query 
        let res =await openidAndSessionKey(code)
        
        ctx.body ={
            success:true,
            data:res
        }
    }

    @post('/login')
    @require({body:['code','avatarUrl','nickName']})
    async login(ctx,next){
        await loginAsync(ctx,next)
         
    }

    async createOrder(ctx,next){
       
    }
}