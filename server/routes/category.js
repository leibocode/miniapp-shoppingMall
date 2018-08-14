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
        if(!_id){
            //容错     
        }
        const data =await getChildrens(_id)
        ctx.body ={
            success:true,
            data:data
        }
        
    }
}