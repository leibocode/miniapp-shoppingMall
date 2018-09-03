import koaBody from 'koa-bodyparser'

const koajwt = require('koa-jwt')
const koalogger =require('koa-logger')
const jsonwebtoken =require('jsonwebtoken')

export const addBody =app=>{
    app.use(koaBody())
}


export const auth = app=>{
    app.use((ctx,next)=>{
        return next().catch((err)=>{
            if(err.status==401){
                ctx.status =401;
                ctx.body ="Protected resource, use Authorization header to get access\n"
            }else {
                throw err
            }
        })
    })
}

export const jwt = app=>{
    // app.use(koajwt({'secret':'wechat_min_token'})).unless({
    //     path: [/^\/api\/v1\/banner/,/^\/api\/v1\/product/,
    //         /^\/\/api\/v1\/special/]
    // })
    app.use(koajwt({
        secret: 'wechat_min_token'
    }).unless({
        path: [
              /^\/api\/v1\/banner/,
              /^\/api\/v1\/product/,
              /^\/api\/v1\/special/,
              /^\/api\/v1\/category/,
              /^\/api\/v1\/minapp\/login/
            ]
    }));

}

export const  verifyToken = app =>{
    app.use(async(ctx,next)=>{
        try {
            const token =ctx.header.authorization
            console.log('我是token1');
            console.log(token);
            if(token){
                jsonwebtoken.verify(token,'wechat_min_token',(err,decoded)=>{
                    console.log(decoded);
                })
                // jsonwebtoken.verify(token,'wechat_min_token',function(err,decoded){
                //     console.log(decoded)
                //     // ctx.user = {
                //     //     openid:decoded.openid,
                //     //     session_key:decoded.session_key
                //     // }
                // })
            }
            await next()
        }catch(err){
            console.log('token verify fail: ', err)
        }

    })
}

export const logger =app=>{
    app.use(koalogger())
}


