
import {
    controller,
    get,
    post,
    required
} from '../decorator/router'

import { getOrders,getOrder  } from '../service/order'

@controller('/api/v1/order')
export class OrderController {
    
    @get('/')
    async getOrders(ctx,next){
        const { page,szie  } = ctx.query
        const { openid } = ctx.user

        const params ={
            openid,
            szie,
            page
        }
        const data =await getOrders(params)
        
        ctx.body ={
            success:true,
            data:data
        }
    }

    @get('/:_id')
    async getOrder(ctx,next){
        const { _id } = ctx.params
        const { openid } = ctx.user
        console.log(_id)
        const data =await getOrder(openid,_id)
        ctx.body ={
            success:true,
            data:data
        }
    }
}