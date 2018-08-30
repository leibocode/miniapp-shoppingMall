import{
    controller,
    get,
    post
} from '../decorator/router'

import {  } from '../service/product'

@controller('/api/v1/search')
export class SearchController {
    @get('/:keyword')
    async search(ctx,next){
        const { keyword } = ctx.params

        if(!keyword){
            
        }
        
    }
}