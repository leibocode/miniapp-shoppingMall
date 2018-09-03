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
         const { _id } =ctx.params
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
         console.log(ctx.user);

     }

     
 }
