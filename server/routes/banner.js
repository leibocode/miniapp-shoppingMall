import {
    Controller,
    Get,
    Post,
 } from '../decorator/router'

 import BannerService from '../service/banner'

 @Controller('/api/v1/banner')
 export class BannerController {
     @Get()
     async test(ctx,next){
         console.log("test");
         ctx.body= 'text'
     }

     @Get('/:_id')
     async getBanner (ctx,next){
         const { params } =ctx
         const { _id } =params
         
         if(_id){
             //错误
         }
         let service =new BannerService()
         const data =await service.getBanner(_id)
         
         ctx.body ={
             data:data,
             success:true,
             code:0
         }
     }
     
 }