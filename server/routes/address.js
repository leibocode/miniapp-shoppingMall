import {
    getAll,
    getOne,
    deleteAddress,
    add,setState
} from '../service/address'
import * as errors from '../lib/errors'
import Result from '../lib/result'
 const {
     controller,
     get,
     post,
     put,
     del
 } =require('../decorator/router')

 @controller('/api/v1/address')
 export class AddressController {
     @get('/:_id')
     async getAddress(ctx,next){
         const { _id } = ctx.params
         //let ipenid =
         const data =await getOne(_id)
         ctx.body = new Result(errors.ok,data)
     }

     @get('/')
     async getAddressList(ctx,next){
         //kao-jwt

         const { openid } = ctx.user
         const data =await getAll(openid)
         ctx.body = new Result(errors.ok,data)
     }

     @put('/:_id')
     async setAddressSatte(ctx,next){

         const { openid } =ctx.user
         const { _id  } = ctx.params
         await setState(openid,_id)
         ctx.status =204
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
        ctx.status = 201
    }

    @post('/del')
    async deleteAddress(ctx,next){
        let { id } =ctx.request.body
        await del(id)
        ctx.status = 201
    }

    @del('/:_id')
    async deleteAddress(ctx,next){
        const { openid } =ctx.user
        const { _id  } = ctx.params
        try {
            await deleteAddress(_id)
            ctx.status =204
        }catch(err){

        }
    }
 }
