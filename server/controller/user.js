import config from '../config/config'
import mongoose from 'mongoose'
import {
    openidAndSessionKey,
    WXBizDataCrypt
} from '../wechat/minapp'

const jwt =require('jsonwebtoken')
const User =mongoose.model('User')

const decryptUserAsync =async(code,userInfo)=>{
    let u = JSON.parse(userInfo)
    console.log(u.encryptedData)
    const res = await openidAndSessionKey(code)
    const { openid,session_key } = JSON.parse(res)
    console.log('sessionkey'+session_key)
    let user = await User.findOne({
        openid:openid
    }).exec()
    let pc =new WXBizDataCrypt(session_key)
    let data =pc.decryptData(u.encryptedData,u.iv)
    let _userData = u.userInfo
    if(!user){
       
        console.log(_userData)
        console.log('usering的值')
        user =new User({
            avatarUrl: _userData.avatarUrl,
            name:_userData.nickName,
        })
    }else {
        user.name = _userData.nickName
        user.avatarUrl =_userData.avatarUrl
    }

    await user.save()

    return user
    
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
            nickname:user.name,
            avatarUrl:user.avatarUrl,
            sex:user.sex
        }
    }
}

export async function loginAsync(ctx,next) {
    console.log('命中路由')
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
        console.log('时间')
        var time =new Date().toLocaleString();
        console.log(time)

        var expir =new Date();
        expir.setHours(expir.getHours()+2);
        
        console.log(expir.toLocaleString())
        let expires_in = expir.getTime() 
        
        //jsonwebtoken 
        const token =jwt.sign({
            openid:openid,
            session_key:session_key
        },'wechat_min_token',{expiresIn:'2h'})

        ctx.body ={
            success:true,
            data:{
                token:token,
                expires_in:expires_in
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