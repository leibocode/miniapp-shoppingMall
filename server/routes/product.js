import{
    controller,
    get,
    post
}from '../decorator/router'

import { getProduct,getProducts  } from '../service/product'

@controller('/api/v1/product')
export class ProductController{
    @get('/')
    async getProduct(ctx,next){
        const { page,size,order } =ctx.query
        let params ={
            page,
            size,
            order
        }
        const data =await getProducts(params)
        ctx.body ={
            success:true,
            data:data
        }
    }

    @get('/:_id') 
    async getProduct(ctx,next){
        const { _id } =ctx.params
        if(!_id){
            //容错     
        }
        const data =await getProduct(_id)
        ctx.body ={
            success:true,
            data:data
        }
        
    }
}