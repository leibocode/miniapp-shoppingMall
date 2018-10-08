
import {
    controller,
    get,
    post,
    required,
    del
} from '../decorator/router'

import { getOrders,getOrder,delOrder } from '../service/order'

@controller('/api/v1/order')
export class OrderController {
    
    @get('/')
    async getOrders(ctx,next){
        console.log(ctx.query)
        const { page,size  } = ctx.query
        const { openid } = ctx.user
        const newPage = parseInt(page)
        const newSize = parseInt(size)
        const params ={
            openid,
            newPage,
            newSize
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

    @del('/:_id')
    async delOrder(ctx,next){
        const { _id } = ctx.params
        const { openid } = ctx.user
        console.log('参数')
        console.log(_id)
        await delOrder(openid,_id)

        ctx.body ={
            success:true
        }
    }
}