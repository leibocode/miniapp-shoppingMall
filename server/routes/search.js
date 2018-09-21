import{
    controller,
    get,
    post
} from '../decorator/router'

import { getSearchHot } from '../service/search'
import { getSearch } from '../service/product'

@controller('/api/v1/search')
export class SearchController {
    @get('/')
    // async search(ctx,next){
    //     const { keyword,szie,page,priceNumber } = ctx.query

    //     if(!keyword){
    //      //容错
    //     }
    //     let params ={
    //         keyword,
    //         size:10,
    //         page
    //     }
    //     const data =await getSearch(params)

    //     ctx.body ={
    //         success:true,
    //         data:data
    //     }

    // }
    @get('/hot')
    async getSearchs(ctx,next){

        const data  = await getSearchHot() 
        
        ctx.body ={
            success:true,
            data:data
        }
    }

    // @get('/')
    // async getSearchData(ctx,next){
    //     console.log('命中路由')
    //     const {keyword,size,page  } = ctx.query
    //     let params ={
    //         keyword,
    //         size,
    //         page
    //     }
    //     console.log(params)
    //     try{
    //         const data =await getSearch(params)
    //         ctx.body ={
    //             data:data,
    //             success:true
    //         }
    //     }catch(e){
    //         console.log(e)       
    //     }

    // }


}