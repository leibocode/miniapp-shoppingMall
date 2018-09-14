import config from '../config/config'
import mongoose from 'mongoose'
import {
    openidAndSessionKey,
    WXBizDataCrypt
} from '../wechat/minapp'

const jwt =require('jsonwebtoken')
const User =mongoose.model('User')

export const decryptUserAsync =async(code,userInfo)=>{
    const res = await openidAndSessionKey(code)
    const { openid,session_key } = JSON.parse(res)
    let user = await User.findOne({
        openid:openid
    }).exec()
    
    if(!user){
        let pc =new WXBizDataCrypt(res.session_key)
        let data =pc.decryptData(userInfo.encryptedData,userInfo.iv)
        console.log(data)
        // user =new User({
        //     avatarUrl:data
        // })

    }else {
        
    }

    
}

export async function getUserAsync(ctx,next){
    const { code,userInfo } =ctx.query

    let user 

    try{
        user = await decryptUserAsync(code, userInfo)
    }catch(err){
        return (ctx.body = {
            success: false,
            err: err
        })
    }
     
    ctx.body ={
        success:true,
        data:{
            nickname:user.nickname,
            avatarUrl:user.avatarUrl,
            sex:user.sex
        }
    }
}

export async function loginAsync(ctx,next) {
    console.log('命中')
    const { code } =ctx.request.body
    console.log('code为+'+code) 
    try{
        const res = await openidAndSessionKey(code)
        console.log('22')
        console.log(res)
        const { openid,session_key } = JSON.parse(res)

        console.log('openod为'+openid)
        console.log('session_key为'+session_key)
        let user = await User.findOne({
            openid:openid
        }).exec()

        if(!user){
            user =new User({
                openid:openid
            })
            user = await user.save()
        }

        //jsonwebtoken 
        const token =jwt.sign({
            openid:openid,
            session_key:session_key
        },'wechat_min_token',{expiresIn:'2h'})
        console.log('生成的token')
        console.log(token)

        ctx.body ={
            success:true,
            data:{
                token:token,
                nickname:user.nickname,
                avatarUrl:user.avatarUrl
            }
        }

    }catch(err){
        console.log('不服就是干');
        ctx.body ={
            success:true,
            err:err
        }
    }
}