import {
    Controller,
    Get,
    Post,
 } from '../decorator/router'

 @Controller('/api/v1/banner')
 export class BannerController {
     @Get('/test')
     async test(ctx,next){
         ctx.body= 'text'
     }

     
 }