import{
    controller,
    get,
    post
}from '../decorator/router'

import { getCategorys,getChildrens  } from '../service/category'

@controller('/api/v1/category')
export class ProductController{
    @get('/')
    async getCategorys(ctx,next){
        const data =await getCategorys()
        ctx.body ={
            success:true,
            data:data
        }
    }

    @get('/:_id') 
    async getChildrens(ctx,next){
        const { _id } =ctx.params
        const { size,page,price } =ctx.query
        let param = {
            _id,
            size,
            page,
            price
        }
        if(!_id){
            //容错     
        }
        const data =await getChildrens(param)
        ctx.body ={
            success:true,
            data:data
        }
        
    }
}