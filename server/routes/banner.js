const {controller, get, post, put } = require('../decorator/router')

import Service from '../service/banner'
import { getBanner,getBanners } from '../service/banner'
import * as errors from '../lib/errors'
import Result from '../lib/result'

//http://127.0.0.1:3001/api/v1/banner
@controller('api/v1/banner')
export class BannerController {
  constructor(){
    this.service = new Service()
  }
  @get('/')
  async getBanner(ctx,next){
    const data =await getBanners()
    ctx.body = new Result(errors.ok,data)
  }

  @get('/:_id')
  async getbanner (ctx, next) {
    const { _id,size,page,price } =ctx.query
    //let _id ="5b711706499c4c3e04f3392a"
    let params ={
      _id,
      size,
      page,price
    }
    const data = await getBanner(params)
    ctx.body = new Result(errors.ok,data)
  }
}