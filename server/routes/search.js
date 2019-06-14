import{
    controller,
    get,
    post
} from '../decorator/router'

import { getSearchHot } from '../service/search'
import { getSearch } from '../service/product'
import Result from '../lib/result';
import * as errors from '../lib/errors'
@controller('/api/v1/search')
export class SearchController {
    @get('/hot')
    async getSearchs(ctx,next){
        const data  = await getSearchHot() 
        ctx.body = new Result(errors.ok,data)
    }

    @post('/')
    async getSearchData(ctx,next){
        let body = ctx.request.body
        try{
            const data =await getSearch(body)
            ctx.body = new Result(errors.ok,data)
        }catch(e){
            console.log(e)       
        }

    }


}