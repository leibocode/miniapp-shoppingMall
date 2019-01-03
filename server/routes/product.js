import {
    controller,
    get,
    post,
    del
} from '../decorator/router'

import { getProduct, getProducts } from '../service/product'
const commentService = require('../service/comment')
const service = new commentService()

@controller('/api/v1/product')
export class ProductController {
    //http://127.0.0.1:3001/api/v1/product?page=4&size=10
    @get('/')
    async getProducts (ctx, next) {
        let { page, size, order, price } = ctx.query
        page = parseInt(page)
        size = parseInt(size)
        order = parseInt(order)
        let params = {
            page,
            size,
            order,
            price
        }

        const data = await getProducts(params)
        ctx.body = {
            success: true,
            data: data
        }
    }

    @get('/:_id')
    async getProduct (ctx, next) {
        console.log('111')

        const { _id } = ctx.params
        console.log(_id)
        if (!_id) {
            //容错
        }
        const data = await getProduct(_id)
        ctx.body = {
            success: true,
            data: data
        }

    }

    @get('/order')
    async getproducts (ctx, next) {

    }

    @get('/product/comment')
    async getcomments (ctx, next) {
        const {
            _id
        } = ctx.query
        const data = await service.list(_id)
        return data
    }

    @post('/product/comment')
    async createcomment (ctx, next) {
        let body  = ctx.request.body
        let param = {

        }
    }

    @get('/product/comment/:_id')
    async getcomment (ctx, next) {

    }

    @del('/product/comment/:_id')
    async delcomment (ctx, next) {
        const { _id }  = ctx.params

    }
}