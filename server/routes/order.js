
import {
    controller,
    get,
    post,
    required
} from '../decorator/router'

import { getOrders  } from '../service/order'

@controller('/api/v1/order')
export class OrderController {
    
    @get('/')
    async getOrder(ctx,next){
        const { openid } = ctx.user

        const params ={
            openid
        }
        const data =await getOrders(params)
        
        ctx.body ={
            success:true,
            data:data
        }
    }
}