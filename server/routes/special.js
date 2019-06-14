import{
    controller,
    get,
    post
}from '../decorator/router'

import { getSpecial,getSpecials  } from '../service/special'
import Result from '../lib/result';
import * as errors from '../lib/errors'

@controller('/api/v1/special')
export class ProductController{
    @get('/')
    async getSpecials(ctx,next){
        
        const data =await getSpecials()
        ctx.body = new Result(errors.ok,data)
    }

    @get('/:_id') 
    async getSpecial(ctx,next){
        const { _id } =ctx.params
        if(!_id){
            //容错     
        }
        const data =await getSpecial(_id)
        ctx.body = new Result(errors.ok,data)
        
    }
}