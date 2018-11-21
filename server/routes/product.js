import{
    controller,
    get,
    post
}from '../decorator/router'

import { getProduct,getProducts  } from '../service/product'

@controller('/api/v1/product')
export class ProductController{
    //http://127.0.0.1:3001/api/v1/product?page=4&size=10
    @get('/')
    async getProducts(ctx,next){
        let { page,size,order,price } =ctx.query
        page=parseInt(page)
        size =parseInt(size)
        order =parseInt(order)
        let params ={
            page,
            size,
            order,
            price
        }
		
        const data =await getProducts(params)
        ctx.body ={
            success:true,
            data:data
        }
    }

    @get('/:_id') 
    async getProduct(ctx,next){
        console.log('111')
       
        const { _id } =ctx.params
        console.log(_id)
        if(!_id){
            //容错     
        }
        const data =await getProduct(_id)
        ctx.body ={
            success:true,
            data:data
        }
        
    }

    @get('/order')
    async getproducts(ctx,next){

    }
}