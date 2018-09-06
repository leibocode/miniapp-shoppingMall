import{
    controller,
    get,
    post
} from '../decorator/router'

import { getSearch } from '../service/product'

@controller('/api/v1/search')
export class SearchController {
    @get('/')
    async search(ctx,next){
        const { keyword,szie,page,priceNumber } = ctx.query

        if(!keyword){
         //容错
        }
        let params ={
            keyword,
            size:10,
            page
        }
        const data =await getSearch(params)

        ctx.body ={
            success:true,
            data:data
        }

    }
}