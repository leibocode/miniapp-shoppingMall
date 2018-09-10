const {controller, get, post, put } = require('../decorator/router')

import Service from '../service/banner'
import { getBanner,getBanners } from '../service/banner'


//http://127.0.0.1:3001/api/v1/banner
@controller('api/v1/banner')
export class BannerController {
  constructor(){
    this.service = new Service()
  }
  @get('/test')
  async getMovies (ctx, next) {
    console.log("命中路由")
    ctx.body  ='111'
  }

  @get('/')
  async getBanner(ctx,next){
    const data =await getBanners()
    ctx.body ={
      success:true,
      data:data
    }
  }

  @get('/:_id')
  async getbanner (ctx, next) {
    const { _id,size,page } =ctx.params
    //let _id ="5b711706499c4c3e04f3392a"
    let params ={
      _id,
      size,
      page
    }
    const data = await getBanner(params)

    ctx.body ={
      success:true,
      data:data
    }
  }
}