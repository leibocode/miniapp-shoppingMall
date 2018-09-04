import {
    getAll,
    getOne,
    del,
    add
 } from '../service/address'
 const {
     controller,
     get,
     post,
     put
 } =require('../decorator/router')

 @controller('/api/v1/address')
 export class AddressController {
     @get('/:_id')
     async getAddress(ctx,next){
         
         //let ipenid = 
         const data =await getOne(_id)
         ctx.body ={
             success:true,
             data:data
         }
     }

     @get('/')
     async getAddressList(ctx,next){
         //kao-jwt
         console.log('111212222')
         const { openid } = ctx.user 
         const data =await getAll(openid)
         ctx.body = {
             success:true,
             data:data
         }
     }

    @post('/')
    async createAddress(ctx,next){
        let data =ctx.request.body
        data.openod =ctx.user.openid
        const result =await add(data)

        ctx.body ={
            success:true
        }
    }
     
 }
