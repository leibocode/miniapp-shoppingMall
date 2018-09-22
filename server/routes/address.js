import {
    getAll,getOne,del,add,setState
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
         const { _id } = ctx.params
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

         const { openid } = ctx.user 
         const data =await getAll(openid)
         ctx.body = {
             success:true,
             data:data
         }
     }

     @put('/:_id')
     async setAddressSatte(ctx,next){
         const { openid } =ctx.user
         const { _id  } = ctx.params
         await setState(openid,_id)
     }

    @post('/')
    async createAddress(ctx,next){
        let data =ctx.request.body
        data.openid =ctx.user.openid
        const addressList =await getAll(data.openid)
        if(addressList.length==0){
            data.state =1
        }
        const result =await add(data)

        ctx.body ={
            success:true
        }
    }
     
 }
