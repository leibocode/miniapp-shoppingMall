import koaBody from 'koa-bodyparser'
import config from '../config/config'

const koajwt = require('koa-jwt')
const koalogger =require('koa-logger')
const jsonwebtoken =require('jsonwebtoken')

const { verify } =require('../lib/verify')

export const addBody =app=>{
    app.use(koaBody())
}


// export const auth = app=>{
//     app.use((ctx,next)=>{
//         return next().catch((err)=>{
//             if(err.status==401){
//                 ctx.status =401;
//                 ctx.body ="Protected resource, use Authorization header to get access\n"
//             }else {
//                 throw err
//             }
//         })
//     })
// }

export const jwt = app=>{
    app.use(koajwt({
        secret:'wechat_min_token'
    }).unless({
        path: [
              /^\/api\/v1\/banner/,
              /^\/api\/v1\/product/,
              /^\/api\/v1\/special/,
              /^\/api\/v1\/category/,
              /^\/api\/v1\/minapp\/login/,
              /^\/api\/v1\/search/
            ]
    }));
}

export const  verifyToken = app =>{
    app.use(async(ctx,next)=>{
        try {
            const token =ctx.header.authorization
            console.log("token"+token)
            console.log(config.secret)
            if(token){
                console.log('1111')
                const minjwt = token.split(' ')[1]
                console.log('jwt'+minjwt);
                let decoded = await verify(minjwt,'wechat_min_token');
                console.log(decoded.openid)
                ctx.user = {
                    openid:decoded.openid,
                    session_key:decoded.session_key
                }
            }
            await next()
        }catch(err){
            console.log('token verify fail: ', err)
            ctx.body ={
                success:false,
                err:err
            }
        }

    })
}

export const logger =app=>{
    app.use(koalogger())
}


