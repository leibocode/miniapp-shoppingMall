const {controller, get, post, put } = require('../decorator/router')


@controller('api/v1/banner')
export class BannerController {
  @get('/')
  async getMovies (ctx, next) {
    ctx.body  ='111'
  }

  @get('/:id')
  async getMovieDetail (ctx, next) {
   
  }
}